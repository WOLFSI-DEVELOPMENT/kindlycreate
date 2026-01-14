
import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, ArrowUp, ChevronDown, Check, Sparkles, Layout, Type as TypeIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AnimatedSphere } from './AnimatedSphere';

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

interface PlanningViewProps {
  initialPrompt: string;
  onBuild: (history: Message[]) => void;
  creationMode?: 'prompt' | 'prototype' | 'image';
}

const SYSTEM_INSTRUCTION = `You are a professional UI/UX Architect.
Your goal is to prepare a detailed plan for a UI component.

Phase 1: Discovery. 
- Ask ONLY 1-3 short, clarifying questions to understand the user's requirements.
- If the user's initial prompt is detailed enough, skip questions.
- Use **bold** for key concepts or questions to make them stand out.

Phase 2: Blueprint.
- Once you have enough information, generate a "Project Blueprint".
- You MUST output the blueprint as a JSON block wrapped in a specific code fence: \`\`\`json:blueprint ... \`\`\`.
- The JSON object must follow this structure:
{
  "title": "Short Creative Title",
  "summary": "One sentence summary.",
  "colors": ["#hex1", "#hex2"],
  "typography": "Primary font",
  "layout": "Short layout description",
  "features": ["Feature 1", "Feature 2"]
}
`;

// --- Components ---

const BlueprintInline: React.FC<{ data: any, onBuild: () => void }> = ({ data, onBuild }) => {
  return (
    <div className="mt-2 space-y-4">
      {/* Title & Summary */}
      <div className="border-l-2 border-black pl-3 py-1">
        <h3 className="font-bold text-gray-900 text-lg">{data.title || "Blueprint"}</h3>
        <p className="text-gray-600 italic text-sm">{data.summary}</p>
      </div>

      {/* Details List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
         <div>
            <span className="font-semibold text-gray-800">Layout:</span> <span className="text-gray-600">{data.layout}</span>
         </div>
         <div>
            <span className="font-semibold text-gray-800">Typography:</span> <span className="text-gray-600">{data.typography}</span>
         </div>
         
         {data.colors && (
             <div className="flex items-center gap-2">
                 <span className="font-semibold text-gray-800">Palette:</span>
                 <div className="flex gap-1.5">
                    {data.colors.map((color: string, i: number) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color }} title={color} />
                    ))}
                 </div>
             </div>
         )}
      </div>

      {/* Features */}
      {data.features && data.features.length > 0 && (
          <div className="pt-1">
             <span className="font-semibold text-gray-800 text-sm block mb-1">Key Features:</span>
             <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5 ml-1">
                {data.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
             </ul>
          </div>
      )}

      {/* Action */}
      <div className="pt-2">
          <button 
            onClick={onBuild}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
             <Sparkles size={14} />
             <span>Create this Component</span>
          </button>
      </div>
    </div>
  );
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    // Split by **text** to render bold.
    const parts = content.split(/(\*\*[^*]+?\*\*)/g);
    
    return (
        <div className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap">
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
            })}
        </div>
    );
};

export const PlanningView: React.FC<PlanningViewProps> = ({ initialPrompt, onBuild, creationMode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Auto-scroll
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  
  // Init
  useEffect(() => {
    if (!hasInitialized.current && initialPrompt) {
        hasInitialized.current = true;
        setMessages([{ role: 'user', text: initialPrompt }]);
        
        if (creationMode === 'image') {
            generateImage(initialPrompt);
        } else {
            generateTextResponse(initialPrompt);
        }
    }
  }, [initialPrompt, creationMode]);

  const generateImage = async (prompt: string) => {
      setIsTyping(true);
      try {
          const response = await fetch("https://platform-five-woad.vercel.app/v1/images/generate", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  prompt: prompt,
                  num_images: 1,
                  width: 512,
                  height: 512
              })
          });
          const data = await response.json();
          // Defensive check for various response formats
          const imageUrl = data.data?.[0]?.url || data.url || data.image || (Array.isArray(data) ? data[0] : null);
          
          if (imageUrl) {
              setMessages(prev => [...prev, { role: 'model', text: `Here is the generated image for: "${prompt}"`, image: imageUrl }]);
          } else {
               setMessages(prev => [...prev, { role: 'model', text: "Sorry, I couldn't generate an image at this time." }]);
          }
      } catch (error) {
          console.error("Image generation failed:", error);
          setMessages(prev => [...prev, { role: 'model', text: "Error: Failed to connect to the image generation service." }]);
      } finally {
          setIsTyping(false);
      }
  };

  const generateTextResponse = async (prompt: string, history: Message[] = []) => {
      setIsTyping(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const contents = history.concat({ role: 'user', text: prompt }).map(m => ({ role: m.role, parts: [{ text: m.text }] }));
        
        const res = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: contents,
            config: { systemInstruction: SYSTEM_INSTRUCTION }
        });
        
        if (res.text) {
             setMessages(prev => [...prev, { role: 'model', text: res.text }]);
        }
      } catch (e) {
          console.error(e);
      } finally {
          setIsTyping(false);
      }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const newMsg: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    
    if (creationMode === 'image') {
        generateImage(inputValue);
    } else {
        generateTextResponse(inputValue, messages);
    }
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.image) {
        return (
            <div className="space-y-3">
                <div className="text-[15px] text-gray-700">{msg.text}</div>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm max-w-sm">
                    <img src={msg.image} alt="Generated result" className="w-full h-auto object-cover" />
                </div>
            </div>
        );
    }

    const parts = msg.text.split(/```json:blueprint([\s\S]*?)```/);
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            try { return <BlueprintInline key={index} data={JSON.parse(part)} onBuild={() => onBuild(messages)} />; } catch { return null; }
        }
        if (!part.trim()) return null;
        return <MarkdownRenderer key={index} content={part} />;
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-50 flex-shrink-0">
             <h1 className="font-semibold text-gray-900">{creationMode === 'image' ? 'Image Generation' : 'Blueprint Phase'}</h1>
             <div className="text-xs text-gray-400">{creationMode === 'image' ? 'Creating visuals' : 'Refining requirements'}</div>
        </div>

        {/* Chat - Increased bottom padding to pb-64 to allow scrolling past input */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 pb-64">
            <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         {msg.role === 'model' && <div className="mt-1 flex-shrink-0"><AnimatedSphere className="w-8 h-8" /></div>}
                        <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-gray-100 px-5 py-3 rounded-[20px] rounded-tr-sm' : ''}`}>
                            {msg.role === 'user' ? <div className="text-gray-800 text-[15px]">{msg.text}</div> : renderMessageContent(msg)}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="text-gray-400 text-sm pl-12 flex items-center gap-1"><span>{creationMode === 'image' ? 'Generating image' : 'Thinking'}</span><span className="animate-pulse">...</span></div>}
                <div ref={messagesEndRef} />
            </div>
        </div>

        {/* Input */}
        <div className="absolute bottom-6 left-0 right-0 px-6 pointer-events-none">
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center pl-4 pr-1 pointer-events-auto transition-all focus-within:ring-4 focus-within:ring-gray-100 h-14">
                 <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    placeholder={creationMode === 'image' ? "Refine image prompt..." : "Refine the plan..."} 
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 text-base placeholder-gray-400 resize-none h-6 py-0 leading-6"
                    rows={1}
                />
                <button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim()} 
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center flex-shrink-0 ${
                        inputValue.trim() 
                        ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
                        : 'bg-gray-100 text-gray-300'
                    }`}
                >
                    <ArrowUp size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    </div>
  );
};
