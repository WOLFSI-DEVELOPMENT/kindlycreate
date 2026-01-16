
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BuildingViewProps {
  onStop?: () => void;
}

export const BuildingView: React.FC<BuildingViewProps> = ({ onStop }) => {
  const bgImage = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop"; 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black font-sans">
      
      {/* Blurred Background */}
      <div className="absolute inset-0">
          <img 
              src={bgImage} 
              alt="background" 
              className="w-full h-full object-cover blur-xl scale-110 opacity-70" 
          />
          <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Top Status */}
      <div className="absolute top-8 left-0 right-0 z-30 flex justify-center animate-fade-in-down">
         <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 flex items-center gap-4 shadow-lg">
            <div className="flex gap-1.5">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-100"></span>
            </div>
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">Generating Assets...</span>
            <div className="w-px h-3 bg-white/20"></div>
            <button 
                onClick={onStop}
                className="text-white/60 hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition-all text-[10px] font-bold uppercase tracking-wider"
            >
                Cancel
            </button>
         </div>
      </div>

      {/* Center Card with Skeleton UI */}
      <div className="relative z-20 w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] p-1">
         <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-md">
            
            {/* Inner Content Image (Sharp version of background for consistency or specific style) */}
            <div className="absolute inset-0">
                <img src={bgImage} alt="Cover" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            </div>

            {/* Skeleton UI Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                
                {/* Simulated Loading Content */}
                <div className="space-y-6 animate-pulse-subtle">
                    {/* Title Skeleton */}
                    <div className="space-y-2">
                        <div className="h-8 w-3/4 bg-white/20 rounded-md backdrop-blur-sm"></div>
                        <div className="h-8 w-1/2 bg-white/20 rounded-md backdrop-blur-sm"></div>
                    </div>

                    {/* Text Skeleton */}
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-white/10 rounded-full backdrop-blur-sm"></div>
                        <div className="h-3 w-5/6 bg-white/10 rounded-full backdrop-blur-sm"></div>
                        <div className="h-3 w-4/6 bg-white/10 rounded-full backdrop-blur-sm"></div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="pt-2">
                        <div className="h-10 w-32 bg-white/20 rounded-full flex items-center justify-center gap-2 backdrop-blur-sm">
                             <div className="h-2 w-16 bg-white/30 rounded-full"></div>
                             <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Actual Text Overlay (Optional, user asked for skeleton style UI to show prompt being generated) 
                    Let's keep the text "Export Anywhere" style as requested but make it look like it's loading/building 
                */}
                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                     <h2 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg">Export Anywhere</h2>
                     <p className="text-white/80 text-sm leading-relaxed mb-6 drop-shadow-md">
                        Seamlessly move from idea to implementation in your favorite AI IDE.
                     </p>
                     
                     <div className="flex items-center gap-2 group cursor-pointer w-max">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Explore</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                            <ArrowRight size={12} strokeWidth={3} />
                        </div>
                    </div>
                </div>

            </div>
         </div>
      </div>

      {/* Pagination / Loading Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-2">
         <div className="w-8 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
         <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
         <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
         <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
         <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
         <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
      </div>

    </div>
  );
};
