import React, { useEffect, useRef, useState } from 'react';

export const CreepyButton: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - btnX;
      const deltaY = e.clientY - btnY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 8); // Limit movement distance

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      
      <h2 className="text-white/40 mb-16 text-2xl font-light tracking-[0.2em] uppercase">Observation Mode</h2>
      
      <button 
        ref={btnRef}
        className="relative px-16 py-6 bg-white text-black font-bold rounded-full shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center gap-6 group overflow-hidden"
      >
        <span className="text-lg tracking-widest uppercase font-black z-10">Don't Click</span>
        
        {/* Eyes Container */}
        <div className="flex gap-3 z-10">
           <Eye pupilPos={pupilPos} />
           <Eye pupilPos={pupilPos} />
        </div>

        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
      </button>
    </div>
  );
};

const Eye = ({ pupilPos }: { pupilPos: { x: number, y: number } }) => (
  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center relative overflow-hidden shadow-inner ring-2 ring-black/10">
    <div 
      className="w-4 h-4 bg-white rounded-full absolute transition-transform duration-75 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
    >
    </div>
  </div>
);