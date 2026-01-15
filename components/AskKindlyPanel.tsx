
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ArrowUp, X, Sparkles, Plus, Menu, Mic, User, Search, ExternalLink, Zap, Layout, Code, CheckCircle2 } from 'lucide-react';
import { InteractiveAvatar } from './InteractiveAvatar';
import { useDeepgram } from '../hooks/useDeepgram';
import { COMPONENT_ITEMS } from '../constants';
import { ComponentItem } from '../types';

interface AskKindlyPanelProps {
  activeItem?: ComponentItem;
  onUpdateItem: (updates: Partial<ComponentItem>) => void;
  onClose: () => void;
  onGenerateCanvas?: (title: string, prompt: string, preGeneratedCode?: string) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  type?: 'text' | 'search_result' | 'canvas_building' | 'export_options' | 'design_modification';
  payload?: any;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Helper Functions ---

const generateCanvasCode = async (userPrompt: string) => {
    const systemPrompt = `ACT AS: Senior Frontend Developer.
    TASK: Write code for a functional UI prototype.
    CONTEXT: The user wants a single-file HTML prototype using Tailwind CSS.
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

const getInitialSuggestions = (item?: ComponentItem) => {
    if (!item) return ["Search library", "Build dashboard", "Create landing"];
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

const BuildingCard: React.FC<{ title: string, prompt: string, onComplete: (title: string, prompt: string, code: string) => void }> = ({ title, prompt, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    // 1. Trigger generation on mount
    useEffect(() => {
        let isMounted = true;
        generateCanvasCode(prompt).then(code => {
            if (isMounted && code) setGeneratedCode(code);
        });
        return () => { isMounted = false; };
    }, [prompt]);

    // 2. Manage progress visualization
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        
        if (progress < 90) {
            // Smoothly animate to 90%
            interval = setInterval(() => {
                setProgress(prev => {
                    const diff = 90 - prev;
                    return prev + (diff * 0.1); 
                });
            }, 200);
        } else if (progress >= 90 && !generatedCode) {
            // Stall at 90% if code isn't ready
            // No op, just wait
        } else if (generatedCode && progress < 100) {
            // Code is ready, finish the bar
            interval = setInterval(() => {
                setProgress(prev => prev + 5);
            }, 50);
        } else if (progress >= 100) {
            setCompleted(true);
        }

        return () => clearInterval(interval);
    }, [progress, generatedCode]);

    return (
        <div className="bg-gray-100 rounded-xl p-4 flex gap-4 mt-2 border border-gray-200 shadow-sm max-w-sm">
            {/* Preview Box */}
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0 text-xs font-mono text-gray-400 font-bold">
                {Math.round(progress)}%
            </div>
            
            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    {completed ? <div className="w-2 h-2 bg-green-500 rounded-full"></div> : <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>}
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                        {completed ? `Ready: ${title}` : `Building ${title}...`}
                    </h4>
                </div>
                
                {!completed ? (
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                ) : (
                    <button 
                        onClick={() => generatedCode && onComplete(title, prompt, generatedCode)}
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mt-1"
                    >
                        Open Canvas <ArrowUp size={10} className="rotate-45" />
                    </button>
                )}
            </div>
        </div>
    );
};

export const AskKindlyPanel: React.FC<AskKindlyPanelProps> = ({ activeItem, onUpdateItem, onClose, onGenerateCanvas }) => {
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
         Return: { "type": "canvas", "title": "Short App Name", "prompt": "Full detailed system prompt for the app", "text": "I'm setting up the canvas for you." }
         
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
      } else if (data.type === 'canvas') {
          newMsg.type = 'canvas_building';
          newMsg.payload = { title: data.title, prompt: data.prompt };
      } else if (data.type === 'export') {
          newMsg.type = 'export_options';
          newMsg.payload = { prompt: data.prompt || activeItem?.systemPrompt };
      } else if (data.type === 'modify') {
          newMsg.type = 'design_modification';
          newMsg.text = data.explanation || "I've updated the design system.";
          // Apply update immediately
          onUpdateItem({ code: data.code });
      }

      setMessages(prev => [...prev, newMsg]);
      
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
                  <p className="text-sm text-gray-500">I can search the library, build canvases, or modify your designs.</p>
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

                      {/* Canvas Building Card */}
                      {msg.type === 'canvas_building' && msg.payload && onGenerateCanvas && (
                          <BuildingCard 
                              title={msg.payload.title} 
                              prompt={msg.payload.prompt} 
                              onComplete={onGenerateCanvas} 
                          />
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
                  placeholder={activeItem?.category === 'Design System' ? "Modify style or add components..." : "Ask to search, build, or refine..."}
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
