
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ArrowUp, X, Sparkles, Plus, Menu, Mic, User, ExternalLink, CheckCircle2 } from 'lucide-react';
import { InteractiveAvatar } from './InteractiveAvatar';
import { useDeepgram } from '../hooks/useDeepgram';
import { COMPONENT_ITEMS } from '../constants';
import { ComponentItem } from '../types';

interface AskKindlyPanelProps {
  activeItem?: ComponentItem;
  onUpdateItem: (updates: Partial<ComponentItem>) => void;
  onClose: () => void;
  onGenerateCanvas?: (title: string, prompt: string, preGeneratedCode?: string) => void;
  isStudioMode?: boolean; 
}

interface Message {
  role: 'user' | 'model';
  text: string;
  type?: 'text' | 'search_result' | 'export_options' | 'design_modification';
  payload?: any;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const PEXELS_API_KEY = "8Mh8jDK5VAgGnnmNYO2k0LqdaLL8lbIR4ou5Vnd8Zod0cETWahEx1MKf";
const YOUTUBE_API_KEY = "AIzaSyA8BjLi4xJdYNTjBhT4BA0p5HSTcLdultw";

// --- Helper Functions ---

// 1. Standard Code Generation (Editor Mode)
const generateCanvasCode = async (userPrompt: string) => {
    const systemPrompt = `ACT AS: Senior Frontend Developer.
    TASK: Write code for a functional UI prototype.
    CONTEXT: The user wants a single-file HTML output using Tailwind CSS.
    USER PROMPT: ${userPrompt}
    
    INSTRUCTIONS:
    1. Generate a COMPLETE, WORKING HTML file.
    2. Use Tailwind CSS via CDN.
    3. Use Vanilla JavaScript for interactivity.
    4. The code must be self-contained in a single file.
    
    OUTPUT FORMAT:
    Return ONLY raw JSON (no markdown) with this structure:
    {
      "code": "<!DOCTYPE html><html>...</html>"
    }
    `;
    
    try {
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

// 2. Dynamic Content Generation (Studio Mode - Slides vs Docs)
const generateStudioContent = async (userPrompt: string) => {
    // A. Fetch Images from Pexels & Video from YouTube
    const images: string[] = [];
    let videoId: string | null = null;

    try {
        const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(userPrompt)}&per_page=6&orientation=landscape`, {
            headers: { Authorization: PEXELS_API_KEY }
        });
        
        if (pexelsRes.ok) {
            const pexelsData = await pexelsRes.json();
            if (pexelsData.photos) {
                pexelsData.photos.forEach((p: any) => images.push(p.src.large2x));
            }
        } else {
            console.warn("Pexels API Error Status:", pexelsRes.status);
        }
    } catch (e) {
        console.error("Pexels fetch failed", e);
    }

    try {
        const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(userPrompt)}&type=video&key=${YOUTUBE_API_KEY}`);
        if (ytRes.ok) {
            const ytData = await ytRes.json();
            if (ytData.items && ytData.items.length > 0) {
                videoId = ytData.items[0].id.videoId;
            }
        }
    } catch (e) {
        console.error("YouTube error", e);
    }

    // Fallbacks
    while (images.length < 6) images.push(`https://placehold.co/1920x1080/222/fff?text=Image+${images.length + 1}`);

    // B. Detect Intent (Slide vs Doc)
    let contentType = 'doc';
    if (userPrompt.toLowerCase().includes('slide') || userPrompt.toLowerCase().includes('presentation') || userPrompt.toLowerCase().includes('deck')) {
        contentType = 'slide';
    }

    // C. Generate Content JSON via AI
    let contentData = {
        mainTitle: userPrompt,
        subtitle: "A curated creation generated for your idea.",
        slides: [
            { title: "Introduction", body: "Overview of the concept." },
            { title: "Key Features", body: "Detailed breakdown." },
            { title: "Conclusion", body: "Final thoughts." }
        ],
        // Doc specific
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
        
        Return a JSON object with the following keys.
        
        ${contentType === 'slide' ? `
        FOR SLIDES:
        - mainTitle: Catchy presentation title
        - subtitle: Subtitle
        - slides: Array of 5 objects, each with { "title": "Slide Headline", "body": "Bullet points or short text for the slide." }
        ` : `
        FOR DOCS:
        - mainTitle: Catchy headline
        - subtitle: Subheadline
        - section1Title: Heading 1
        - section1Body: Paragraph text
        - quote: Relevant quote
        - quoteAuthor: Author
        - section2Title: Heading 2
        - section2Body: Paragraph text
        - featureList: Array of 3 features
        - callToAction: Button text
        - videoTitle: Video section title
        - videoDescription: Video description
        `}

        Output ONLY valid JSON. No markdown.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: systemPrompt,
        });

        const cleanText = response.text?.replace(/```json/g, "").replace(/```/g, "").trim() || "{}";
        const json = JSON.parse(cleanText);
        contentData = { ...contentData, ...json };
    } catch (e) {
        console.error("AI Content Generation failed", e);
    }

    // D. Generate HTML based on type
    if (contentType === 'slide') {
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; overflow: hidden; background: #000; }
    h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
    .slides-container { scroll-snap-type: x mandatory; overflow-x: scroll; display: flex; height: 100vh; width: 100vw; }
    .slide { scroll-snap-align: start; flex: 0 0 100vw; height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    ::-webkit-scrollbar { display: none; }
  </style>
</head>
<body>
  <div class="slides-container">
      
      <!-- Title Slide -->
      <section class="slide bg-black text-white">
          <img src="${images[0]}" class="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
          <div class="relative z-10 text-center px-10 max-w-5xl">
              <h1 contenteditable="true" class="text-7xl md:text-9xl font-bold mb-6 tracking-tighter outline-none">${contentData.mainTitle}</h1>
              <p contenteditable="true" class="text-2xl md:text-3xl font-light text-gray-300 outline-none">${contentData.subtitle}</p>
          </div>
      </section>

      <!-- Content Slides -->
      ${contentData.slides ? contentData.slides.map((slide: any, idx: number) => `
      <section class="slide bg-white text-black">
          <div class="grid grid-cols-1 md:grid-cols-2 w-full h-full">
              <div class="relative h-full">
                  <img src="${images[(idx + 1) % images.length]}" class="absolute inset-0 w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/10"></div>
              </div>
              <div class="flex flex-col justify-center p-16 md:p-24 bg-white">
                  <span class="text-sm font-bold tracking-widest text-blue-600 uppercase mb-6">0${idx + 1}</span>
                  <h2 contenteditable="true" class="text-5xl md:text-6xl font-bold mb-8 leading-tight outline-none">${slide.title}</h2>
                  <p contenteditable="true" class="text-xl md:text-2xl text-gray-600 leading-relaxed outline-none">${slide.body}</p>
              </div>
          </div>
      </section>
      `).join('') : ''}

      <!-- Video/End Slide -->
      <section class="slide bg-[#111] text-white">
          <div class="flex flex-col items-center justify-center w-full h-full p-10">
              <h2 contenteditable="true" class="text-5xl font-bold mb-12 text-center outline-none">Thank You</h2>
              ${videoId ? `
              <div class="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <iframe src="https://www.youtube.com/embed/${videoId}" class="w-full h-full" frameborder="0" allowfullscreen></iframe>
              </div>
              ` : `<div class="text-2xl text-gray-500">End of Presentation</div>`}
          </div>
      </section>

  </div>
</body>
</html>`;
    } else {
        // Doc Template (Editorial)
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, .serif { font-family: 'Playfair Display', serif; }
    [contenteditable]:empty:before { content: attr(placeholder); color: #9ca3af; cursor: text; }
    [contenteditable]:focus { outline: none; }
  </style>
</head>
<body class="bg-white min-h-screen text-slate-900 pb-24">
  <div class="h-64 w-full bg-gradient-to-b from-blue-50 via-purple-50 to-white"></div>
  <div class="max-w-4xl mx-auto px-8 relative z-10 -mt-32">
      <div class="mb-20">
          <div class="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-50 rounded-full border border-purple-100">Editorial</div>
          <h1 contenteditable="true" class="text-6xl md:text-7xl font-bold leading-tight mb-8 text-gray-900 outline-none">${contentData.mainTitle}</h1>
          <p contenteditable="true" class="text-2xl text-gray-500 font-light leading-relaxed outline-none max-w-2xl">${contentData.subtitle}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${contentData.section1Title}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 leading-relaxed outline-none">${contentData.section1Body}</p>
          </div>
          <div class="relative group">
              <div class="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity blur-lg"></div>
              <img src="${images[0]}" class="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-sm" alt="Visual 1" />
          </div>
      </div>
      <div class="my-32 text-center max-w-2xl mx-auto">
          <p contenteditable="true" class="serif text-4xl italic text-gray-800 leading-normal mb-6 outline-none">"${contentData.quote}"</p>
          <p contenteditable="true" class="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase outline-none">— ${contentData.quoteAuthor}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div class="relative group order-2 md:order-1">
              <div class="absolute -inset-2 bg-gradient-to-tr from-orange-100 to-pink-100 rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity blur-lg"></div>
              <img src="${images[1]}" class="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-sm" alt="Visual 2" />
          </div>
          <div class="order-1 md:order-2">
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${contentData.section2Title}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 leading-relaxed outline-none">${contentData.section2Body}</p>
              <ul class="mt-6 space-y-3">
                  <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></span><span contenteditable="true" class="text-gray-600 outline-none">${contentData.featureList ? contentData.featureList[0] : 'Feature 1'}</span></li>
                  <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5"></span><span contenteditable="true" class="text-gray-600 outline-none">${contentData.featureList ? contentData.featureList[1] : 'Feature 2'}</span></li>
                  <li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2.5"></span><span contenteditable="true" class="text-gray-600 outline-none">${contentData.featureList ? contentData.featureList[2] : 'Feature 3'}</span></li>
              </ul>
          </div>
      </div>
      <div class="mb-32 relative rounded-3xl overflow-hidden shadow-xl">
          <img src="${images[2]}" class="w-full h-96 object-cover" alt="Banner" />
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h3 contenteditable="true" class="text-white text-4xl font-bold text-center drop-shadow-lg outline-none">Visual Impact</h3>
          </div>
      </div>
      ${videoId ? `
      <div class="mb-32">
          <div class="text-center mb-12">
              <h2 contenteditable="true" class="text-3xl font-bold mb-4 outline-none">${contentData.videoTitle}</h2>
              <p contenteditable="true" class="text-lg text-gray-600 outline-none max-w-xl mx-auto">${contentData.videoDescription}</p>
          </div>
          <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe 
                  src="https://www.youtube.com/embed/${videoId}" 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen 
                  class="absolute inset-0 w-full h-full"
              ></iframe>
          </div>
      </div>
      ` : ''}
      <div class="max-w-2xl mx-auto text-center">
          <h2 contenteditable="true" class="text-3xl font-bold mb-6 outline-none">Ready to Launch?</h2>
          <p contenteditable="true" class="text-lg text-gray-500 mb-8 outline-none">Summarize the article or provide a call to action here.</p>
          <button class="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg">${contentData.callToAction}</button>
      </div>
  </div>
</body>
</html>`;
    }
};

const getInitialSuggestions = (item?: ComponentItem) => {
    if (!item) return ["Search library", "Build dashboard", "Create presentation slides"];
    if (item.category === 'Design System') {
        return ["Change primary color", "Dark mode", "Thicker borders"];
    }
    return ["Make responsive", "Add animation", "Change colors"];
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

export const AskKindlyPanel: React.FC<AskKindlyPanelProps> = ({ activeItem, onUpdateItem, onClose, onGenerateCanvas, isStudioMode = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, toggleListening } = useDeepgram({
      onTranscript: (text) => setInputValue(prev => {
          const newText = prev ? prev.trim() + ' ' + text : text;
          return newText;
      })
  });

  // Initialize suggestions when activeItem changes
  useEffect(() => {
      setSuggestions(getInitialSuggestions(activeItem));
  }, [activeItem]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const performSearch = (query: string) => {
      const terms = query.toLowerCase().split(/\s+/);
      return COMPONENT_ITEMS.filter(item => {
          const text = (item.title + item.description).toLowerCase();
          return terms.some(term => text.includes(term));
      }).slice(0, 3); // Top 3 results
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim() || isGenerating) return;

    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsGenerating(true);

    try {
      const isDesignSystem = activeItem?.category === 'Design System';
      const promptContext = `CURRENT ITEM: ${activeItem?.title || "None"} (${activeItem?.category || "General"})
      CURRENT PROMPT: "${activeItem?.systemPrompt || ""}"
      ${isDesignSystem ? `CURRENT HTML CODE: \`\`\`html\n${activeItem?.code}\n\`\`\`` : ''}
      
      USER REQUEST: "${textToSend}"`;

      const systemInstruction = `You are Kindly 3.0, an advanced AI architect.
      You have access to a UI library, an export tool, a canvas builder, and Design System editing capabilities.
      
      Identify the user's intent and return a JSON object with the "type".
      
      INTENTS:
      1. SEARCH: User wants to find/search/look for existing prompts or components in the library.
         Return: { "type": "search", "query": "search terms", "text": "Here are some components I found:" }
      
      2. BUILD/CANVAS: User wants to generate/create/build a prototype, canvas, or code for a NEW app idea. 
         This also applies to requests for "Slides", "Documents", "Reports", "Layouts", or "Dashboards".
         Return: { "type": "canvas", "title": "Short Descriptive Title", "prompt": "Full detailed system prompt for the creation", "text": "I'm setting up the canvas for you." }
         
      3. EXPORT: User wants to export/send the current prompt to external tools (ChatGPT, Bolt, v0).
         Return: { "type": "export", "prompt": "The prompt to export", "text": "Here are direct links to export your prompt:" }
      
      4. MODIFY_DESIGN: (Only if active item is a Design System) User wants to modify the style, add components, or change the current design system visually.
         Return: { "type": "modify", "code": "FULL updated HTML code", "explanation": "Briefly what you changed" }
         
      5. CHAT/REFINE: User wants to chat, ask questions, or refine the current prompt text.
         Return: { "type": "text", "text": "Your helpful response..." }

      MANDATORY: Include a "suggestions" array with exactly 3 VERY SHORT (max 2-3 words) follow-up actions. They must be punchy and fit in small floating buttons.

      Return ONLY valid raw JSON. No markdown.`;

      const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: promptContext,
          config: { systemInstruction }
      });

      const text = response.text;
      let cleanText = text ? text.replace(/```json/g, "").replace(/```/g, "").trim() : "{}";
      const data = JSON.parse(cleanText || '{}');
      
      const newMsg: Message = { role: 'model', text: data.text || data.explanation || "I processed your request." };

      if (data.type === 'search') {
          newMsg.type = 'search_result';
          newMsg.payload = performSearch(data.query);
          if (newMsg.payload.length === 0) newMsg.text = `I couldn't find anything matching "${data.query}" in the library.`;
          setMessages(prev => [...prev, newMsg]);
      } else if (data.type === 'canvas') {
          // Automatic Generation Logic
          setMessages(prev => [...prev, { role: 'model', text: `Generating ${isStudioMode ? 'visual' : 'canvas'} for "${data.title}"...` }]);
          
          const generator = isStudioMode ? generateStudioContent : generateCanvasCode;
          const generatedCode = await generator(data.prompt);
          
          if (generatedCode && onGenerateCanvas) {
              onGenerateCanvas(data.title, data.prompt, generatedCode);
              setMessages(prev => [...prev, { role: 'model', text: `Successfully generated: ${data.title}. ${isStudioMode ? 'Preview updated.' : 'Opening editor.'}` }]);
          } else {
              setMessages(prev => [...prev, { role: 'model', text: "Failed to generate content. Please try again." }]);
          }

      } else if (data.type === 'export') {
          newMsg.type = 'export_options';
          newMsg.payload = { prompt: data.prompt || activeItem?.systemPrompt };
          setMessages(prev => [...prev, newMsg]);
      } else if (data.type === 'modify') {
          newMsg.type = 'design_modification';
          newMsg.text = data.explanation || "I've updated the design system.";
          onUpdateItem({ code: data.code });
          setMessages(prev => [...prev, newMsg]);
      } else {
          // Default text chat
          setMessages(prev => [...prev, newMsg]);
      }
      
      if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions.slice(0, 3));
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Something went wrong. Please try again." }]);
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
                  <h3 className="text-gray-900 font-medium mb-1">Ask Kindly</h3>
                  <p className="text-sm text-gray-500">
                      {isStudioMode ? "I can create presentations, slides, and docs for you." : "I can search the library, build canvases, or modify designs."}
                  </p>
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
                          {msg.text}
                      </div>
                      
                      {/* Search Results Display */}
                      {msg.type === 'search_result' && msg.payload && (
                          <div className="space-y-1 pl-1">
                              {msg.payload.map((item: ComponentItem) => (
                                  <SearchResult key={item.id} item={item} onReplace={onUpdateItem} />
                              ))}
                          </div>
                      )}

                      {/* Export Options */}
                      {msg.type === 'export_options' && msg.payload && (
                          <ExportOptions prompt={msg.payload.prompt} />
                      )}

                      {/* Modification Confirmation */}
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
                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white relative">
          
          {/* AI Suggestions - Floating Absolute above input */}
          {suggestions.length > 0 && !isGenerating && (
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

          <div className="w-full bg-white border border-gray-200 rounded-[24px] p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/30 transition-all">
              <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activeItem?.category === 'Design System' ? "Modify style or add components..." : (isStudioMode ? "Describe your slide deck, doc, or layout..." : "Ask to search, build, or refine...")}
                  className="flex-1 w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400 font-light resize-none p-1 min-h-[60px]"
                  rows={2}
              />

              <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Add Context">
                          <Plus size={18} strokeWidth={2} />
                      </button>
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
                          disabled={!inputValue.trim() || isGenerating}
                          className={`p-2 rounded-full transition-all flex items-center justify-center ${
                              inputValue.trim() && !isGenerating
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
