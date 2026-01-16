
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ArrowUp, X, Sparkles, Plus, Menu, Mic, User, ExternalLink, CheckCircle2, Paperclip, Loader2, Database, Globe, Key, ShieldCheck, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { InteractiveAvatar } from './InteractiveAvatar';
import { useDeepgram } from '../hooks/useDeepgram';
import { COMPONENT_ITEMS } from '../constants';
import { ComponentItem, User as UserType } from '../types';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

interface AskKindlyPanelProps {
  activeItem?: ComponentItem;
  onUpdateItem: (updates: Partial<ComponentItem>) => void;
  onClose: () => void;
  onGenerateCanvas?: (title: string, prompt: string, preGeneratedCode?: string) => void;
  isStudioMode?: boolean; 
  user?: UserType | null;
  requireAuth?: (action: () => void, message?: string) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  type?: 'text' | 'search_result' | 'export_options' | 'design_modification' | 'integration_added';
  payload?: any;
  image?: string; 
}

// Helper for dynamic API key
const getAI = () => {
  const apiKey = localStorage.getItem('kindly_api_key') || process.env.API_KEY;
  return new GoogleGenAI({ apiKey });
};

const PEXELS_API_KEY = "8Mh8jDK5VAgGnnmNYO2k0LqdaLL8lbIR4ou5Vnd8Zod0cETWahEx1MKf";

// --- Helper Functions ---

// 1. Standard Code Generation (Editor Mode)
const generateCanvasCode = async (userPrompt: string, activeIntegrations: string[], config: any) => {
    
    let integrationContext = "";
    
    if (activeIntegrations.includes('supabase')) {
        integrationContext += `
        - INCLUDE SUPABASE: Add <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
        - Initialize Client: 
          const supabase = supabase.createClient('${config.supabase?.url || 'YOUR_SUPABASE_URL'}', '${config.supabase?.key || 'YOUR_SUPABASE_KEY'}');
        - Context: Assume a table exists relevant to the user's request (e.g., 'todos', 'users').
        - Implement basic CRUD if implied by prompt.
        `;
    }
    
    if (activeIntegrations.includes('firebase')) {
        integrationContext += `
        - INCLUDE FIREBASE: Add standard Firebase SDK scripts (v9 modular syntax via CDN).
        - Configuration:
          const firebaseConfig = { 
            apiKey: "${config.firebase?.apiKey || 'YOUR_API_KEY'}",
            projectId: "${config.firebase?.projectId || 'YOUR_PROJECT_ID'}"
          };
        - Initialize App and Auth/Firestore as needed.
        `;
    }

    if (activeIntegrations.includes('api')) {
        integrationContext += `
        - API FETCHING: The user wants to fetch data from '${config.api?.endpoint || 'https://api.example.com/data'}'.
        - Use standard fetch() with async/await.
        - Handle loading states (show spinner) and error states (show message).
        - Mock the response structure based on the prompt context if the endpoint is generic.
        `;
    }

    const systemPrompt = `ACT AS: Senior Frontend Developer & Solutions Architect.
    TASK: Write code for a functional UI prototype with PRO INTEGRATIONS.
    CONTEXT: The user wants a single-file HTML output using Tailwind CSS.
    USER PROMPT: ${userPrompt}
    
    INTEGRATION REQUIREMENTS:
    ${integrationContext}
    
    INSTRUCTIONS:
    1. Generate a COMPLETE, WORKING HTML file.
    2. Use Tailwind CSS via CDN.
    3. Use Vanilla JavaScript for interactivity.
    4. The code must be self-contained in a single file.
    5. If integrations are requested, implement REAL connection logic using the provided placeholders.
    
    OUTPUT FORMAT:
    Return ONLY raw JSON (no markdown) with this structure:
    {
      "code": "<!DOCTYPE html><html>...</html>"
    }
    `;
    
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: systemPrompt,
      });
      const cleanText = response.text?.replace(/```json/g, "").replace(/```/g, "").trim() || "{}";
      const json = JSON.parse(cleanText);
      return json.code || null;
    } catch (e) {
        console.error("Canvas generation error", e);
        return null;
    }
};

// 2. Dynamic Content Generation (Studio Mode)
const generateStudioContent = async (userPrompt: string) => {
    // ... existing implementation with external APIs ...
    const images: string[] = [];

    try {
        const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(userPrompt)}&per_page=6&orientation=landscape`, {
            headers: { Authorization: PEXELS_API_KEY }
        });
        
        if (pexelsRes.ok) {
            const pexelsData = await pexelsRes.json();
            if (pexelsData.photos) {
                pexelsData.photos.forEach((p: any) => images.push(p.src.large2x));
            }
        }
    } catch (e) { console.error("Pexels failed", e); }

    while (images.length < 6) images.push(`https://placehold.co/1920x1080/222/fff?text=Image+${images.length + 1}`);

    // Detect Intent
    let contentType = 'doc';
    if (userPrompt.toLowerCase().includes('slide') || userPrompt.toLowerCase().includes('presentation')) {
        contentType = 'slide';
    }

    // AI Content Gen
    let contentData = {
        mainTitle: userPrompt,
        subtitle: "A curated creation generated for your idea.",
        slides: [
            { title: "Introduction", body: "Overview of the concept." },
            { title: "Key Features", body: "Detailed breakdown." },
            { title: "Conclusion", body: "Final thoughts." }
        ],
        section1Title: "The Beginning",
        section1Body: "Start your story here.",
        quote: "Design is intelligence made visible.",
        quoteAuthor: "Alina Wheeler",
        section2Title: "The Process",
        section2Body: "Dive deeper into the details.",
        featureList: ["Feature 1", "Feature 2", "Feature 3"],
        callToAction: "Get Started",
        videoTitle: "Featured Content",
        videoDescription: "Watch to learn more."
    };

    try {
        const systemPrompt = `You are an expert content creator.
        The user wants a ${contentType === 'slide' ? 'PRESENTATION DECK (Slides)' : 'EDITORIAL DOCUMENT'}.
        Topic: "${userPrompt}".
        Return valid JSON.`;

        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: systemPrompt,
        });
        const cleanText = response.text?.replace(/```json/g, "").replace(/```/g, "").trim() || "{}";
        const json = JSON.parse(cleanText);
        contentData = { ...contentData, ...json };
    } catch (e) { console.error("AI Content Gen failed", e); }

    // HTML Generation
    if (contentType === 'slide') {
        return `<!DOCTYPE html><html lang="en"><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-black text-white"><div class="flex items-center justify-center h-screen"><h1 class="text-6xl font-bold">${contentData.mainTitle}</h1></div></body></html>`; 
    } else {
        return `<!DOCTYPE html><html lang="en"><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-white text-black"><div class="max-w-4xl mx-auto py-20 px-8"><h1 class="text-6xl font-bold mb-4">${contentData.mainTitle}</h1><p class="text-2xl text-gray-500">${contentData.subtitle}</p></div></body></html>`;
    }
};

const getInitialSuggestions = (item?: ComponentItem) => {
    if (!item) return ["Connect Supabase", "Add custom API", "Build admin dashboard"];
    if (item.category === 'Design System') {
        return ["Change primary color", "Dark mode", "Thicker borders"];
    }
    return ["Make responsive", "Add animation", "Connect to API"];
};

// --- Helper Components ---

const SearchResult: React.FC<{ item: ComponentItem, onReplace: (updates: Partial<ComponentItem>) => void }> = ({ item, onReplace }) => (
    <div className="flex items-start gap-3 py-2 group">
        <div className={`w-8 h-8 rounded-lg flex-shrink-0 ${item.thumbnailClass} border border-black/5`}></div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{item.description}</p>
            <button 
                onClick={() => onReplace({ systemPrompt: item.systemPrompt })}
                className="text-[10px] font-bold bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1 w-max"
            >
                <Sparkles size={10} /> Use Prompt
            </button>
        </div>
    </div>
);

const ExportOptions: React.FC<{ prompt: string }> = ({ prompt }) => {
    const openUrl = (url: string) => window.open(url, '_blank');
    const encoded = encodeURIComponent(prompt);

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={() => openUrl(`https://chatgpt.com/?q=${encoded}`)} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-1.5 transition-colors">
                ChatGPT <ExternalLink size={10} />
            </button>
            <button onClick={() => openUrl(`https://bolt.new/?prompt=${encoded}`)} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-1.5 transition-colors">
                Bolt <ExternalLink size={10} />
            </button>
            <button onClick={() => openUrl(`https://v0.dev/?q=${encoded}`)} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-1.5 transition-colors">
                v0 <ExternalLink size={10} />
            </button>
        </div>
    );
};

export const AskKindlyPanel: React.FC<AskKindlyPanelProps> = ({ activeItem, onUpdateItem, onClose, onGenerateCanvas, isStudioMode = false, user, requireAuth }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Base64
  
  // Integration State
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>([]);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(null);
  
  // Configs
  const [integrationConfig, setIntegrationConfig] = useState({
      supabase: { url: '', key: '' },
      firebase: { apiKey: '', projectId: '' },
      api: { endpoint: '' }
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, toggleListening } = useDeepgram({
      onTranscript: (text) => setInputValue(prev => {
          const newText = prev ? prev.trim() + ' ' + text : text;
          return newText;
      })
  });

  // Initialize suggestions
  useEffect(() => {
      setSuggestions(getInitialSuggestions(activeItem));
  }, [activeItem]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setSelectedImage(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const toggleIntegration = (id: string) => {
      setActiveIntegrations(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
      if (!activeIntegrations.includes(id)) {
          setExpandedIntegration(id);
      }
  };

  const performSearch = async (queryStr: string) => {
      const terms = queryStr.toLowerCase().split(/\s+/).filter(Boolean);
      if (terms.length === 0) return [];

      const localResults = COMPONENT_ITEMS.filter(item => {
          const text = (item.title + item.description).toLowerCase();
          return terms.some(term => text.includes(term));
      });

      let communityResults: ComponentItem[] = [];
      try {
          const q = query(collection(db, "community_prompts"), orderBy("publishedAt", "desc"), limit(50));
          const querySnapshot = await getDocs(q);
          const fetchedItems: ComponentItem[] = [];
          
          querySnapshot.forEach((doc) => {
             const data = doc.data();
             fetchedItems.push({ 
                 id: doc.id, 
                 ...data,
                 title: data.title || "Untitled",
                 description: data.description || "",
                 category: data.category || 'UI Component',
                 thumbnailClass: data.thumbnailClass || 'bg-gray-100',
                 systemPrompt: data.systemPrompt || '',
             } as ComponentItem);
          });
          
          communityResults = fetchedItems.filter(item => {
              const text = (item.title + (item.description || "")).toLowerCase();
              return terms.some(term => text.includes(term));
          });
      } catch (error) { console.error("Error searching community:", error); }

      const combined = [...localResults, ...communityResults];
      const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
      return unique.slice(0, 4);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim() && !selectedImage) return;
    if (isGenerating) return;

    // Check Auth
    if (requireAuth && !user) {
        requireAuth(() => {}, "Oh no! You must log in to chat with Ask Kindly.");
        return;
    }

    setInputValue('');
    const userMsg: Message = { role: 'user', text: textToSend };
    if (selectedImage) {
        userMsg.image = selectedImage;
        setSelectedImage(null); // Clear after sending
    }
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const isDesignSystem = activeItem?.category === 'Design System';
      
      // Load Preferences (Memory)
      const preferences = localStorage.getItem('kindly_custom_instructions') || "No specific preferences.";

      // Build Context
      const promptContext = `
      USER PREFERENCES (Memory): ${preferences}
      CURRENT ITEM: ${activeItem?.title || "None"} (${activeItem?.category || "General"})
      CURRENT PROMPT: "${activeItem?.systemPrompt || ""}"
      ACTIVE INTEGRATIONS: ${activeIntegrations.join(', ')}
      ${isDesignSystem ? `CURRENT HTML CODE: \`\`\`html\n${activeItem?.code}\n\`\`\`` : ''}
      
      USER REQUEST: "${textToSend}"
      ${userMsg.image ? "[User uploaded an image for visual context]" : ""}
      `;

      const systemInstruction = `You are Kindly Pro 3.0, an advanced AI architect with Vision and Full Stack capabilities.
      
      Identify the user's intent and return a JSON object with the "type".
      
      INTENTS:
      1. SEARCH: User wants to find components.
         Return: { "type": "search", "query": "terms", "text": "Found these:" }
      
      2. BUILD/CANVAS: User wants to generate a prototype/UI/slide/doc.
         Return: { "type": "canvas", "title": "Title", "prompt": "Detailed system prompt", "text": "Building..." }
         
      3. EXPORT: User wants to export prompt.
         Return: { "type": "export", "prompt": "Prompt text", "text": "Links:" }
      
      4. MODIFY_DESIGN: (Design System Mode) User wants to visually change the current design system HTML.
         Return: { "type": "modify", "code": "FULL HTML code", "explanation": "Changes made" }
      
      5. ADD_INTEGRATION: User wants to add an API or DB (Supabase, Firebase, Custom API).
         Return: { "type": "add_integration", "tool": "supabase" | "api" | "firebase", "text": "Added integration." }
         
      6. CHAT: General chat/questions.
         Return: { "type": "text", "text": "Response..." }

      MANDATORY: Include "suggestions": ["Action 1", "Action 2", "Action 3"] (Max 2 words).
      Return ONLY valid raw JSON.`;

      // Handle Image Input
      const contentParts: any[] = [{ text: promptContext }];
      if (userMsg.image) {
          const base64Data = userMsg.image.split(',')[1];
          contentParts.push({
              inlineData: {
                  mimeType: 'image/jpeg', // Assuming jpeg/png
                  data: base64Data
              }
          });
      }

      const ai = getAI();
      const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: contentParts,
          config: { systemInstruction }
      });

      const text = response.text;
      let cleanText = text ? text.replace(/```json/g, "").replace(/```/g, "").trim() : "{}";
      const data = JSON.parse(cleanText || '{}');
      
      const newMsg: Message = { role: 'model', text: data.text || data.explanation || "I processed your request." };

      if (data.type === 'search') {
          newMsg.type = 'search_result';
          const results = await performSearch(data.query); 
          newMsg.payload = results;
          if (newMsg.payload.length === 0) newMsg.text = `No matches for "${data.query}".`;
          else newMsg.text = `Found ${newMsg.payload.length} results:`;
          setMessages(prev => [...prev, newMsg]);
      } else if (data.type === 'canvas') {
          setMessages(prev => [...prev, { role: 'model', text: `Generating ${isStudioMode ? 'visual' : 'canvas'} for "${data.title}"...` }]);
          
          // Pass the config to generator
          const generator = isStudioMode ? generateStudioContent : (prompt: string) => generateCanvasCode(prompt, activeIntegrations, integrationConfig);
          const generatedCode = await generator(data.prompt);
          
          if (generatedCode && onGenerateCanvas) {
              onGenerateCanvas(data.title, data.prompt, generatedCode);
              setMessages(prev => [...prev, { role: 'model', text: `Generated: ${data.title}.` }]);
          } else {
              setMessages(prev => [...prev, { role: 'model', text: "Generation failed." }]);
          }

      } else if (data.type === 'export') {
          newMsg.type = 'export_options';
          newMsg.payload = { prompt: data.prompt || activeItem?.systemPrompt };
          setMessages(prev => [...prev, newMsg]);
      } else if (data.type === 'modify') {
          newMsg.type = 'design_modification';
          newMsg.text = data.explanation || "Updated design system.";
          onUpdateItem({ code: data.code });
          setMessages(prev => [...prev, newMsg]);
      } else if (data.type === 'add_integration') {
          const tool = data.tool || 'api';
          toggleIntegration(tool);
          newMsg.type = 'integration_added';
          newMsg.text = `Added ${tool} integration to context.`;
          setMessages(prev => [...prev, newMsg]);
          setIsIntegrationsOpen(true); // Auto open panel to let them config
      } else {
          setMessages(prev => [...prev, newMsg]);
      }
      
      if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions.slice(0, 3));
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error processing request." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full md:w-[420px] h-full flex flex-col bg-white border-r border-gray-100 relative font-sans">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-white z-10">
          <div className="flex items-center gap-3">
              <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <Menu size={20} />
              </button>
              <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-700 tracking-tight">Ask Kindly</span>
                  <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">PRO</span>
                  {activeItem?.category === 'Design System' && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md font-bold">Design Mode</span>
                  )}
              </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
              <X size={20} />
          </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-500 rounded-3xl flex items-center justify-center mb-6">
                      <InteractiveAvatar className="w-12 h-12" />
                  </div>
                  <h3 className="text-gray-900 font-medium mb-1">Ask Kindly Pro</h3>
                  <p className="text-sm text-gray-500 max-w-[240px]">
                      {isStudioMode ? "I can create presentations, slides, and docs for you." : "I can build full-stack prototypes, connect APIs, and manage integrations."}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-500 flex items-center gap-1"><Database size={10}/> Supabase</span>
                      <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-500 flex items-center gap-1"><Flame size={10}/> Firebase</span>
                      <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-500 flex items-center gap-1"><Globe size={10}/> Custom API</span>
                  </div>
              </div>
          )}

          {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center`}>
                      {msg.role === 'user' ? (
                          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                              <User size={14} />
                          </div>
                      ) : (
                          <InteractiveAvatar className="w-8 h-8" />
                      )}
                  </div>
                  <div className={`max-w-[85%] flex flex-col gap-2`}>
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user' 
                          ? 'bg-gray-100 text-gray-800 rounded-tr-sm' 
                          : 'bg-white text-gray-700'
                      }`}>
                          {msg.image && (
                              <div className="mb-2 rounded-lg overflow-hidden border border-gray-200">
                                  <img src={msg.image} alt="Upload" className="w-full h-auto object-contain max-h-40" />
                              </div>
                          )}
                          {msg.text}
                      </div>
                      
                      {msg.type === 'search_result' && msg.payload && (
                          <div className="space-y-1 pl-1">
                              {msg.payload.map((item: ComponentItem) => (
                                  <SearchResult key={item.id} item={item} onReplace={onUpdateItem} />
                              ))}
                          </div>
                      )}

                      {msg.type === 'export_options' && msg.payload && (
                          <ExportOptions prompt={msg.payload.prompt} />
                      )}

                      {msg.type === 'integration_added' && (
                          <div className="flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                              <Database size={14} />
                              <span className="font-medium">Integration Active</span>
                          </div>
                      )}

                      {msg.type === 'design_modification' && (
                          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                              <CheckCircle2 size={14} />
                              <span className="font-medium">Design Updated</span>
                          </div>
                      )}
                  </div>
              </div>
          ))}
          
          {isGenerating && (
              <div className="flex gap-3">
                   <div className="flex-shrink-0">
                      <InteractiveAvatar className="w-8 h-8" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl flex items-center gap-2">
                       <Loader2 size={16} className="text-gray-400 animate-spin" />
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white relative">
          
          {/* Integrations Panel */}
          {isIntegrationsOpen && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-30 animate-fade-in-up max-h-[400px] overflow-y-auto">
                  <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Integrations</h4>
                      <button onClick={() => setIsIntegrationsOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
                  </div>
                  <div className="space-y-2">
                      
                      {/* SUPABASE */}
                      <div className={`border rounded-xl overflow-hidden transition-all ${activeIntegrations.includes('supabase') ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                          <button 
                            onClick={() => toggleIntegration('supabase')}
                            className="w-full flex items-center gap-3 p-3 text-sm"
                          >
                              <Database size={16} className={activeIntegrations.includes('supabase') ? "text-green-600" : "text-gray-400"} />
                              <div className="flex-1 text-left">
                                  <div className="font-bold text-gray-800">Supabase</div>
                                  <div className="text-xs opacity-60">Database & Auth</div>
                              </div>
                              {activeIntegrations.includes('supabase') ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                          </button>
                          
                          {activeIntegrations.includes('supabase') && expandedIntegration === 'supabase' && (
                              <div className="px-3 pb-3 space-y-2 animate-fade-in">
                                  <input 
                                    type="text" 
                                    placeholder="Project URL"
                                    value={integrationConfig.supabase.url}
                                    onChange={(e) => setIntegrationConfig(prev => ({...prev, supabase: {...prev.supabase, url: e.target.value}}))}
                                    className="w-full bg-white border border-green-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-green-400 placeholder-green-800/30"
                                  />
                                  <input 
                                    type="password" 
                                    placeholder="Anon Key"
                                    value={integrationConfig.supabase.key}
                                    onChange={(e) => setIntegrationConfig(prev => ({...prev, supabase: {...prev.supabase, key: e.target.value}}))}
                                    className="w-full bg-white border border-green-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-green-400 placeholder-green-800/30"
                                  />
                              </div>
                          )}
                      </div>

                      {/* FIREBASE */}
                      <div className={`border rounded-xl overflow-hidden transition-all ${activeIntegrations.includes('firebase') ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}>
                          <button 
                            onClick={() => toggleIntegration('firebase')}
                            className="w-full flex items-center gap-3 p-3 text-sm"
                          >
                              <Flame size={16} className={activeIntegrations.includes('firebase') ? "text-orange-600" : "text-gray-400"} />
                              <div className="flex-1 text-left">
                                  <div className="font-bold text-gray-800">Firebase</div>
                                  <div className="text-xs opacity-60">NoSQL & Auth</div>
                              </div>
                              {activeIntegrations.includes('firebase') ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                          </button>
                          
                          {activeIntegrations.includes('firebase') && expandedIntegration === 'firebase' && (
                              <div className="px-3 pb-3 space-y-2 animate-fade-in">
                                  <input 
                                    type="text" 
                                    placeholder="API Key"
                                    value={integrationConfig.firebase.apiKey}
                                    onChange={(e) => setIntegrationConfig(prev => ({...prev, firebase: {...prev.firebase, apiKey: e.target.value}}))}
                                    className="w-full bg-white border border-orange-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-400 placeholder-orange-800/30"
                                  />
                                  <input 
                                    type="text" 
                                    placeholder="Project ID"
                                    value={integrationConfig.firebase.projectId}
                                    onChange={(e) => setIntegrationConfig(prev => ({...prev, firebase: {...prev.firebase, projectId: e.target.value}}))}
                                    className="w-full bg-white border border-orange-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-orange-400 placeholder-orange-800/30"
                                  />
                              </div>
                          )}
                      </div>

                      {/* CUSTOM API */}
                      <div className={`border rounded-xl overflow-hidden transition-all ${activeIntegrations.includes('api') ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                          <button 
                            onClick={() => toggleIntegration('api')}
                            className="w-full flex items-center gap-3 p-3 text-sm"
                          >
                              <Globe size={16} className={activeIntegrations.includes('api') ? "text-blue-600" : "text-gray-400"} />
                              <div className="flex-1 text-left">
                                  <div className="font-bold text-gray-800">REST API</div>
                                  <div className="text-xs opacity-60">Custom Endpoints</div>
                              </div>
                              {activeIntegrations.includes('api') ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                          </button>
                          
                          {activeIntegrations.includes('api') && expandedIntegration === 'api' && (
                              <div className="px-3 pb-3 space-y-2 animate-fade-in">
                                  <input 
                                    type="text" 
                                    placeholder="API Endpoint (https://...)"
                                    value={integrationConfig.api.endpoint}
                                    onChange={(e) => setIntegrationConfig(prev => ({...prev, api: {...prev.api, endpoint: e.target.value}}))}
                                    className="w-full bg-white border border-blue-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-400 placeholder-blue-800/30"
                                  />
                              </div>
                          )}
                      </div>

                  </div>
              </div>
          )}

          {/* AI Suggestions */}
          {suggestions.length > 0 && !isGenerating && !isIntegrationsOpen && (
              <div className="absolute bottom-full left-0 w-full px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar z-10 pointer-events-none">
                  <div className="flex gap-2 pointer-events-auto">
                      {suggestions.map((suggestion, idx) => (
                          <button
                              key={idx}
                              onClick={() => handleSend(suggestion)}
                              className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-[11px] px-3 py-2 rounded-xl transition-all font-medium whitespace-nowrap"
                          >
                              {suggestion}
                          </button>
                      ))}
                  </div>
              </div>
          )}

          {/* Image Preview */}
          {selectedImage && (
              <div className="absolute bottom-full left-4 mb-2 p-1 bg-white border border-gray-200 rounded-lg shadow-sm z-20">
                  <img src={selectedImage} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                  <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={12} /></button>
              </div>
          )}

          <div className="w-full bg-white border border-gray-200 rounded-[24px] p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/30 transition-all">
              <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activeItem?.category === 'Design System' ? "Modify style or add components..." : (isStudioMode ? "Describe your slide deck, doc, or layout..." : "Ask to build, integrate, or refine...")}
                  className="flex-1 w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400 font-light resize-none p-1 min-h-[60px]"
                  rows={2}
              />

              <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                      <button 
                        onClick={() => setIsIntegrationsOpen(!isIntegrationsOpen)}
                        className={`p-2 transition-colors rounded-lg ${activeIntegrations.length > 0 ? 'bg-black text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        title="Integrations"
                      >
                          <Database size={18} strokeWidth={2} />
                      </button>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors" 
                        title="Upload Image"
                      >
                          <Paperclip size={18} strokeWidth={2} />
                      </button>
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>

                  <div className="flex items-center gap-2">
                      <button 
                          onClick={toggleListening}
                          className={`p-2 rounded-full transition-all duration-200 ${
                              isListening 
                              ? 'bg-red-50 text-red-500 animate-pulse' 
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                          <Mic size={20} strokeWidth={2} className={isListening ? "animate-bounce" : ""} />
                      </button>
                      <button 
                          onClick={() => handleSend()}
                          disabled={(!inputValue.trim() && !selectedImage) || isGenerating}
                          className={`p-2 rounded-full transition-all flex items-center justify-center ${
                              (inputValue.trim() || selectedImage) && !isGenerating
                              ? 'bg-black text-white hover:bg-gray-800 shadow-md active:scale-95' 
                              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                          }`}
                      >
                          <ArrowUp size={18} strokeWidth={2.5} />
                      </button>
                  </div>
              </div>
          </div>
          <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Powered by Gemini 3.0 Flash</span>
          </div>
      </div>

    </div>
  );
};
