import React from 'react';
import { Mic, ArrowUp, Sparkles, Terminal, Image as ImageIcon } from 'lucide-react';

export const RadiantPreview: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 font-inter relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Text */}
      <div className="text-center mb-16 animate-fade-in-up relative z-10">
        <h1 className="text-6xl font-semibold text-slate-900 tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-slate-600">
          How can I help?
        </h1>
        <p className="text-slate-400 text-xl font-light tracking-wide">
          Experience the fluid interface designed for the future.
        </p>
      </div>

      {/* Radiant Input Container */}
      <div className="relative w-full max-w-2xl group z-20">
        
        {/* The Glow Effect */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-tilt"></div>
        
        {/* The Main Input Box */}
        <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_40px_-10px_rgba(0,0,0,0.05)] ring-1 ring-white/50 p-3 pr-3 border border-slate-100/50">
          
          <button className="pl-4 pr-3 text-slate-400 hover:text-slate-600 transition-colors">
            <span className="text-3xl font-light text-slate-300 leading-none">+</span>
          </button>
          
          <input 
            type="text" 
            placeholder="Ask anything..." 
            className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-xl h-12 px-2 font-medium"
          />

          <div className="flex items-center gap-3">
             <button className="p-3 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
               <Mic size={22} strokeWidth={1.5} />
             </button>
             <button className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all shadow-md hover:shadow-lg active:scale-95">
               <ArrowUp size={22} strokeWidth={2} />
             </button>
          </div>
        </div>
      </div>

      {/* Suggestions / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl w-full px-4 relative z-10">
        <SuggestionCard 
          icon={<Sparkles className="text-amber-500" size={18} />}
          title="Creative Writing"
          desc="Stories, poems, scripts"
        />
         <SuggestionCard 
          icon={<Terminal className="text-blue-500" size={18} />}
          title="Code Analysis"
          desc="Debug, refactor, optimize"
        />
         <SuggestionCard 
          icon={<ImageIcon className="text-pink-500" size={18} />}
          title="Image Gen"
          desc="Logos, art, diagrams"
        />
      </div>
    </div>
  );
};

const SuggestionCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <button className="flex flex-col items-start text-left p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200 group">
    <div className="mb-3 p-2 bg-white rounded-lg shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-slate-800 font-semibold text-sm mb-1">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </button>
);