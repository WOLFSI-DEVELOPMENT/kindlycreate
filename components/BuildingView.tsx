
import React, { useState, useEffect } from 'react';

interface BuildingViewProps {
  onStop?: () => void;
}

const INITIAL_ITEMS = [
  {
    title: "Intelligent Architecture",
    description: "Kindly Create analyzes your intent to build structurally sound UI hierarchies.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Master Prompt Engineering",
    description: "We craft the perfect system instructions for Cursor, Bolt, and v0.",
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Export Anywhere",
    description: "Seamlessly move from idea to implementation in your favorite AI IDE.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Design System Agnostic",
    description: "Switch between iOS, Material, Linear, and Brutalist styles instantly.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Rapid Prototyping",
    description: "Visualize your ideas with instant HTML & Tailwind previews.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Visual Assets",
    description: "Generate complementary images and icons for your applications.",
    image: "https://images.unsplash.com/photo-1614728853913-1e22ba61d527?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Clean Code Generation",
    description: "Get production-ready Tailwind CSS that is easy to maintain.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "User-Centric Design",
    description: "Focus on experience and flow while AI handles the boilerplate.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Collaborative Ready",
    description: "Share your blueprints and prompts with your team effortlessly.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Future Proof",
    description: "Building the next generation of interfaces with Gemini models.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
  }
];

export const BuildingView: React.FC<BuildingViewProps> = ({ onStop }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState(INITIAL_ITEMS);

  useEffect(() => {
    const fetchPexelsImages = async () => {
        try {
            const response = await fetch("https://api.pexels.com/v1/search?query=abstract+technology+ui+design&per_page=10&orientation=portrait", {
                headers: {
                    Authorization: "8Mh8jDK5VAgGnnmNYO2k0LqdaLL8lbIR4ou5Vnd8Zod0cETWahEx1MKf"
                }
            });
            const data = await response.json();
            if (data.photos && data.photos.length > 0) {
                setItems(prev => prev.map((item, i) => ({
                    ...item,
                    image: data.photos[i % data.photos.length]?.src?.large2x || item.image
                })));
            }
        } catch (error) {
            console.error("Failed to fetch Pexels images:", error);
        }
    };
    fetchPexelsImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black font-sans">
      
      {/* Background Layer: Blurs dynamically based on current slide */}
      {items.map((item, index) => (
         <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-60' : 'opacity-0'}`}
         >
            <img 
                src={item.image} 
                alt="background" 
                className="w-full h-full object-cover blur-[100px] scale-125 saturate-150" 
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
         </div>
      ))}

      {/* Top Bar Status */}
      <div className="absolute top-8 left-0 right-0 z-30 flex justify-center animate-fade-in-down">
         <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 flex items-center gap-4 shadow-lg">
            <div className="flex gap-1.5">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-100"></span>
            </div>
            <span className="text-white/90 text-xs font-medium tracking-wide">Generating Assets...</span>
            <div className="w-px h-3 bg-white/20"></div>
            <button 
                onClick={onStop}
                className="text-white/60 hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition-all text-[10px] font-bold uppercase tracking-wider"
            >
                Cancel
            </button>
         </div>
      </div>

      {/* Main Carousel Card */}
      <div className="relative z-20 w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] md:aspect-[3/4] p-4 perspective-1000">
         <div className="relative w-full h-full">
            {items.map((item, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-700 ease-in-out transform-gpu ${
                        index === currentIndex 
                        ? 'opacity-100 translate-x-0 scale-100 z-10' 
                        : index < currentIndex 
                            ? 'opacity-0 -translate-x-12 scale-95 z-0' 
                            : 'opacity-0 translate-x-12 scale-95 z-0'
                    }`}
                >
                    {/* Card Image */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[4000ms] ease-linear scale-100 hover:scale-110" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                        <div className="translate-y-0 transition-transform duration-500 delay-100">
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 drop-shadow-sm">{item.title}</h2>
                            <p className="text-white/80 text-sm md:text-base font-light mb-6 line-clamp-3 leading-relaxed">{item.description}</p>
                            
                            <div className="flex items-center gap-2 group cursor-pointer w-max">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors">Explore</span>
                                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-black transition-all">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
         </div>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-2">
        {items.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
            />
        ))}
      </div>

    </div>
  );
};
