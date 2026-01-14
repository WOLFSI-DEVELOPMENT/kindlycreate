import React from 'react';

export const JellyButton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden">
       {/* Ambient background blur */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] pointer-events-none"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[80px] pointer-events-none"></div>

       <style>{`
        @keyframes jelly {
          0% { transform: scale(1, 1); }
          25% { transform: scale(1.25, 0.75); }
          40% { transform: scale(0.75, 1.25); }
          50% { transform: scale(1.15, 0.85); }
          65% { transform: scale(0.95, 1.05); }
          75% { transform: scale(1.05, 0.95); }
          100% { transform: scale(1, 1); }
        }
        .jelly-btn:active {
          animation: jelly 0.6s;
        }
      `}</style>
      
      <div className="text-center mb-16 relative z-10">
         <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Jelly Interaction</h2>
         <p className="text-gray-500">Physics-based CSS animation</p>
      </div>
      
      <button className="jelly-btn relative px-16 py-6 bg-gradient-to-b from-indigo-500 to-violet-600 text-white font-bold text-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5),0_0_0_1px_rgba(255,255,255,0.2)_inset,0_2px_0_rgba(255,255,255,0.2)_inset] hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.6),0_0_0_1px_rgba(255,255,255,0.2)_inset,0_2px_0_rgba(255,255,255,0.2)_inset] hover:-translate-y-1 transition-all duration-300 group">
        <span className="relative z-10 drop-shadow-md">Squish Me!</span>
        
        {/* Shine effects */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent rounded-b-2xl"></div>
      </button>
    </div>
  );
};