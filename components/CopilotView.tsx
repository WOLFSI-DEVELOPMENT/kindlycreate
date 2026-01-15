
import React, { useState, useRef, useEffect } from 'react';
import { Mic, ArrowUp, Sparkles, Image as ImageIcon, MessageSquare, Plus, Code } from 'lucide-react';
import { AnimatedSphere } from './AnimatedSphere';
import { useDeepgram } from '../hooks/useDeepgram';

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isImageRequest?: boolean;
}

interface CopilotViewProps {
  userName?: string;
}

export const CopilotView: React.FC<CopilotViewProps> = ({ userName = "Creator" }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, toggleListening } = useDeepgram({
      onTranscript: (text) => setInputValue(prev => {
          const newText = prev ? prev.trim() + ' ' + text : text;
          return newText;
      })
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateImage = async (prompt: string) => {
      setIsTyping(true);
      try {
          const response = await fetch("https://platform-five-woad.vercel.app/v1/images/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  prompt: prompt,
                  num_images: 1,
                  width: 512,
                  height: 512
              })
          });
          const data = await response.json();
          const imageUrl = data.data?.[0]?.url || data.url || data.image || (Array.isArray(data) ? data[0] : null);
          
          if (imageUrl) {
              setMessages(prev => [...prev, { role: 'model', text: `Here is the image for: "${prompt}"`, image: imageUrl }]);
          } else {
               setMessages(prev => [...prev, { role: 'model', text: "I couldn't generate that image right now." }]);
          }
      } catch (error) {
          console.error("Image generation failed:", error);
          setMessages(prev => [...prev, { role: 'model', text: "Failed to connect to image service." }]);
      } finally {
          setIsTyping(false);
      }
  };

  const generateText = async (prompt: string) => {
      setIsTyping(true);
      try {
        const encoded = encodeURIComponent(`You are Kindly Copilot, a helpful and creative AI assistant. 
        User says: ${prompt}
        
        Respond helpfully and concisely.`);
        
        const response = await fetch(`https://text.pollinations.ai/${encoded}?model=glm`);
        if (!response.ok) throw new Error("API failed");
        const text = await response.text();
        
        if (text) {
             setMessages(prev => [...prev, { role: 'model', text: text }]);
        }
      } catch (e) {
          console.error(e);
          setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble thinking right now." }]);
      } finally {
          setIsTyping(false);
      }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const text = inputValue;
    const isImage = text.toLowerCase().startsWith('image:') || text.toLowerCase().includes('generate an image');
    const cleanText = text.replace(/^image:\s*/i, '');

    const newMsg: Message = { role: 'user', text: text };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    
    if (isImage) {
        generateImage(cleanText);
    } else {
        generateText(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderEmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto w-full">
        <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="text-[#4285F4] w-6 h-6" />
                <h1 className="text-3xl font-medium text-slate-800">Hi {userName}</h1>
            </div>
            <h2 className="text-4xl font-medium text-[#1A73E8]">Where should we start?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <button onClick={() => setInputValue("Generate a UI for a dashboard")} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors border border-transparent hover:border-gray-200 group">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Design UI</span>
                    <Code size={16} className="text-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-gray-500">Create a dashboard layout</p>
            </button>
            <button onClick={() => setInputValue("Generate an image of a futuristic city")} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors border border-transparent hover:border-gray-200 group">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Create Image</span>
                    <ImageIcon size={16} className="text-[#DB4437] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-gray-500">Futuristic city concept</p>
            </button>
            <button onClick={() => setInputValue("Write a system prompt for a coding assistant")} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors border border-transparent hover:border-gray-200 group">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Write Prompt</span>
                    <MessageSquare size={16} className="text-[#F4B400] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-gray-500">For a coding assistant</p>
            </button>
            <button onClick={() => setInputValue("Explain how Tailwind CSS grid works")} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors border border-transparent hover:border-gray-200 group">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Brainstorm</span>
                    <Sparkles size={16} className="text-[#0F9D58] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-gray-500">Explain CSS Grid</p>
            </button>
        </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#F9FAFB] relative overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
         <div className="flex items-center gap-2 pointer-events-auto">
             <div className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 text-xs font-medium text-gray-600 shadow-sm flex items-center gap-2">
                 <Sparkles size={12} className="text-blue-500" />
                 Kindly Copilot
             </div>
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth pb-32">
          {messages.length === 0 ? renderEmptyState() : (
              <div className="max-w-3xl mx-auto p-4 pt-20 space-y-8">
                  {messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.role === 'model' && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white shadow-md">
                                  <Sparkles size={14} />
                              </div>
                          )}
                          <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-[#F0F4F9] px-5 py-3 rounded-[20px] rounded-tr-sm text-gray-800' : 'text-gray-800 leading-relaxed'}`}>
                              {msg.text}
                              {msg.image && (
                                  <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                      <img src={msg.image} alt="Generated content" className="w-full h-auto" />
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
                  {isTyping && (
                      <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white animate-pulse">
                              <Sparkles size={14} />
                          </div>
                          <div className="flex items-center gap-1 h-8">
                              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                          </div>
                      </div>
                  )}
                  <div ref={messagesEndRef} />
              </div>
          )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-6 md:bottom-6 left-0 right-0 px-4 z-20">
          <div className="max-w-3xl mx-auto bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 p-2 flex items-center gap-2 transition-shadow focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Plus size={20} strokeWidth={2} />
              </button>
              
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Copilot..." 
                className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 h-10 px-2"
              />

              <div className="flex items-center gap-1">
                  <button 
                    onClick={toggleListening}
                    className={`p-3 rounded-full transition-colors ${isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                  >
                      <Mic size={20} strokeWidth={2} />
                  </button>
                  <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className={`p-3 rounded-full transition-all ${
                        inputValue.trim() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                      <ArrowUp size={20} strokeWidth={2.5} />
                  </button>
              </div>
          </div>
          <div className="text-center mt-3 text-xs text-gray-400 font-medium pb-20 md:pb-0">
              Gemini 3.0 Pro • Kindly Copilot can make mistakes. Check important info.
          </div>
      </div>
    </div>
  );
};
