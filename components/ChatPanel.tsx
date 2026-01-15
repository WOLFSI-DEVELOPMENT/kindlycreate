
import React, { useState, useEffect, useRef } from 'react';
import { Mic, ArrowUp, Plus, Sparkles, User } from 'lucide-react';
import { useDeepgram } from '../hooks/useDeepgram';
import { InteractiveAvatar } from './InteractiveAvatar';

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

interface ChatPanelProps {
    onGenerate: (prompt: string) => Promise<string | void>;
    isGenerating: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onGenerate, isGenerating }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');

    const { isListening, toggleListening } = useDeepgram({
        onTranscript: (text) => setInputValue(prev => {
            const newText = prev ? prev.trim() + ' ' + text : text;
            return newText;
        })
    });

    const handleSubmit = async () => {
        if (!inputValue.trim() || isGenerating) return;

        const userMsg = inputValue;
        setInputValue('');
        
        // Add user message
        const newMessages = [...messages, { role: 'user', text: userMsg } as ChatMessage];
        setMessages(newMessages);

        // Call parent handler and wait for reply
        const reply = await onGenerate(userMsg);
        
        if (reply && typeof reply === 'string') {
            setMessages(prev => [...prev, { role: 'model', text: reply }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="w-full md:w-[420px] h-full flex flex-col bg-white border-r border-gray-100 relative">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-6">
                            <InteractiveAvatar className="w-12 h-12" />
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1">AI Component Builder</h3>
                        <p className="text-sm text-gray-500">Describe the UI you want to build, and I'll generate the system prompt for you.</p>
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
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-gray-100 text-gray-800 rounded-tr-sm' 
                            : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-tl-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isGenerating && (
                    <div className="flex gap-3">
                         <div className="flex-shrink-0">
                            <InteractiveAvatar className="w-8 h-8" />
                        </div>
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                             <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                             <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-50 bg-white">
                <div className="w-full bg-white border border-gray-200 rounded-[24px] p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/30 transition-all">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe a UI component..." 
                        className="flex-1 w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400 font-light resize-none p-1 min-h-[60px]"
                        rows={2}
                    />

                    <div className="flex justify-between items-center mt-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Plus size={20} strokeWidth={1.5} />
                        </button>

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
                                onClick={handleSubmit}
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
