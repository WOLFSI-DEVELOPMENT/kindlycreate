
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Sparkles, MessageSquare, Zap, BarChart2, Clock } from 'lucide-react';
import { AnimatedSphere } from './AnimatedSphere';

interface AskKindlyPanelProps {
  currentPrompt: string;
  onReplace: (newPrompt: string) => void;
  onClose: () => void;
}

interface ProcessingStats {
  originalLength: number;
  resultLength: number;
  compressionRatio: string;
  processingTimeMs: number;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  suggestion?: string; // If model offers a new prompt
  stats?: ProcessingStats;
}

const BlingIcon = () => (
<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
  <path d="M2 8c4.178346666666666 0 6 -1.75796 6 -6 0 4.242039999999999 1.8089333333333333 6 6 6 -4.191066666666666 0 -6 1.8089333333333333 -6 6 0 -4.191066666666666 -1.8216533333333331 -6 -6 -6Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"></path>
</svg>
);

export const AskKindlyPanel: React.FC<AskKindlyPanelProps> = ({ currentPrompt, onReplace, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processWithKindlyAPI = async (mode: string, textToProcess: string) => {
    setIsGenerating(true);
    setMessages(prev => [...prev, { role: 'user', text: `${mode.charAt(0).toUpperCase() + mode.slice(1)}` }]);

    try {
        const response = await fetch('https://kindly-intelligence.vercel.app/api/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textToProcess, mode: mode })
        });
        
        const data = await response.json();
        
        if (data.success) {
            setMessages(prev => [...prev, { 
                role: 'model', 
                text: mode === 'explain' ? data.data.result : "Here is the processed result.",
                suggestion: mode !== 'explain' ? data.data.result : undefined,
                stats: data.data.stats
            }]);
        } else {
            setMessages(prev => [...prev, { role: 'model', text: "The Kindly Intelligence API encountered an error." }]);
        }
    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { role: 'model', text: "Network error. Please try again." }]);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsGenerating(true);

    try {
      const systemInstruction = `You are a helpful AI assistant for a Prompt Engineering tool. 
      Your goal is to assist the user with their "System Prompt".
      
      CURRENT PROMPT:
      "${currentPrompt}"
      
      USER REQUEST:
      "${userText}"
      
      INSTRUCTIONS:
      1. If the user asks for a modification, rewrite, or improvement:
         - Generate a NEW version of the prompt.
         - Provide a short explanation of changes.
         - Return raw JSON: { "explanation": "...", "newPrompt": "..." }

      2. If the user asks a question, asks for an explanation, or just wants to chat about the code/prompt:
         - Answer their question clearly.
         - Return raw JSON: { "explanation": "Your answer here...", "newPrompt": null }
      
      3. Return ONLY valid raw JSON. Do not include markdown code blocks.
      `;

      const encoded = encodeURIComponent(systemInstruction);
      const response = await fetch(`https://text.pollinations.ai/${encoded}?model=openai`);

      if (!response.ok) throw new Error('Magic Prompt API failed');
      const text = await response.text();
      
      let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const json = JSON.parse(cleanText || '{}');
      
      if (json.newPrompt) {
          setMessages(prev => [...prev, { 
              role: 'model', 
              text: json.explanation || "Here is the updated prompt.",
              suggestion: json.newPrompt
          }]);
      } else {
           setMessages(prev => [...prev, { 
               role: 'model', 
               text: json.explanation || "I couldn't process that request." 
           }]);
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
    <div className="w-full md:w-[420px] h-full flex flex-col bg-white border-r border-gray-100 relative overflow-hidden font-sans">
      
      {/* --- Visuals: Gradient Blobs --- */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-50/40 via-purple-50/20 to-transparent pointer-events-none z-0"></div>
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-200/30 rounded-full blur-[60px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-[50px] pointer-events-none z-0"></div>

      {/* Header */}
      <div className="relative z-10 p-5 flex items-center justify-between">
         <div className="flex items-center gap-2.5">
             <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center shadow-md">
                 <BlingIcon />
             </div>
             <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-gray-900 leading-none">Kindly Intelligence</span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">v1.0</span>
             </div>
         </div>
         <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100/50 transition-colors">
             <X size={18} />
         </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-6 relative z-10 pb-20">
         {messages.length === 0 && (
             <div className="text-center mt-12 opacity-60 px-6">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Zap size={20} />
                 </div>
                 <p className="text-sm font-medium text-gray-600 mb-1">Kindly Intelligence v1</p>
                 <p className="text-xs text-gray-400">Use the modes below to process your prompt with our new high-speed API.</p>
             </div>
         )}

         {messages.map((msg, idx) => (
             <div key={idx} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                 
                 {/* Text Bubble */}
                 <div className={`max-w-[90%] px-4 py-2.5 text-sm leading-relaxed ${
                     msg.role === 'user' 
                     ? 'bg-black text-white rounded-2xl rounded-br-sm shadow-sm' 
                     : 'text-gray-600 pl-0'
                 }`}>
                     {msg.text}
                 </div>

                 {/* Suggestion Card */}
                 {msg.suggestion && (
                     <div className="w-full max-w-[95%] bg-gray-50 rounded-2xl p-4 flex flex-col gap-3 no-hover shadow-none border border-gray-100">
                         <div className="text-[11px] uppercase font-bold text-gray-400 tracking-wider flex justify-between items-center">
                             <span>Suggested Change</span>
                             {msg.stats && (
                                 <span className="text-green-600 flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded">
                                     <Zap size={8} /> {msg.stats.processingTimeMs}ms
                                 </span>
                             )}
                         </div>
                         <div className="text-[12px] text-gray-800 font-mono leading-relaxed line-clamp-6 bg-white p-3 rounded-lg border border-gray-200">
                             {msg.suggestion}
                         </div>
                         
                         {/* Stats Footer */}
                         {msg.stats && (
                             <div className="flex gap-3 mt-1 pt-2 border-t border-gray-100">
                                 <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                     <BarChart2 size={10} />
                                     <span>{msg.stats.compressionRatio} compression</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                     <Clock size={10} />
                                     <span>{msg.stats.originalLength} → {msg.stats.resultLength} chars</span>
                                 </div>
                             </div>
                         )}

                         <div className="flex justify-end pt-1">
                             <button 
                                onClick={() => onReplace(msg.suggestion!)}
                                className="px-5 py-1.5 bg-black text-white rounded-full text-[11px] font-bold hover:bg-gray-800 transition-all active:scale-[0.95] shadow-sm flex items-center gap-1.5"
                             >
                                <Sparkles size={10} />
                                <span>Replace</span>
                             </button>
                         </div>
                     </div>
                 )}
             </div>
         ))}
         
         {isGenerating && (
             <div className="flex items-center gap-3 pl-1 mt-2">
                 <AnimatedSphere className="w-5 h-5" />
                 <span className="text-xs font-medium text-gray-400 animate-pulse">Processing...</span>
             </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-gradient-to-t from-white via-white to-white/0 relative z-20">
          
          {/* Quick Action Modes */}
          <div className="flex items-center gap-2 mb-3 pl-1 overflow-x-auto no-scrollbar">
             {['Rewrite', 'Summarize', 'Explain', 'Shorten'].map((mode) => (
                 <button 
                    key={mode} 
                    onClick={() => processWithKindlyAPI(mode.toLowerCase(), currentPrompt)}
                    className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-full cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                 >
                    {mode === 'Rewrite' && <Sparkles size={10} />}
                    {mode}
                 </button>
             ))}
          </div>

          <div className="relative group">
              <div className="absolute left-1.5 top-1.5 bottom-1.5 w-9 flex items-center justify-center">
                 <img src="https://iili.io/f8yBZN9.png" alt="Logo" className="w-5 h-5 object-contain opacity-40 grayscale group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all duration-300" />
              </div>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Or ask to refine manually..."
                className="w-full pl-12 pr-12 py-3.5 bg-gray-100 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-gray-200 rounded-full text-sm outline-none transition-all shadow-sm focus:shadow-md font-medium placeholder-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isGenerating}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition-all shadow-sm"
              >
                  <ArrowUp size={16} strokeWidth={2.5} />
              </button>
          </div>
      </div>

    </div>
  );
};
