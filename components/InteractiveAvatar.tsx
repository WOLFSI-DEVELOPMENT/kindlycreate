
import React, { useState, useEffect, useRef } from 'react';

export const InteractiveAvatar = ({ className = "w-8 h-8" }: { className?: string }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [look, setLook] = useState({ x: 0, y: 0 });
    const [expression, setExpression] = useState('neutral');

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!svgRef.current) return;
            const rect = svgRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            
            // Limit movement range for subtle effect (smaller for avatar)
            const maxDist = 6;
            const sensitivity = 4; 
            const x = (dx / window.innerWidth) * maxDist * sensitivity;
            const y = (dy / window.innerHeight) * maxDist * sensitivity;

            setLook({ 
                x: Math.max(-maxDist, Math.min(maxDist, x)), 
                y: Math.max(-maxDist, Math.min(maxDist, y)) 
            });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const roll = Math.random();
            if (roll < 0.05) {
                setExpression('blink');
                setTimeout(() => setExpression('neutral'), 150);
            } else if (roll < 0.1) {
                setExpression('wink');
                setTimeout(() => setExpression('neutral'), 400);
            } else {
                setExpression('neutral');
            }
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const getEyeTransform = (side: 'left' | 'right') => {
        if (expression === 'blink') return 'scaleY(0.1)';
        if (expression === 'wink' && side === 'right') return 'scaleY(0.1)';
        return 'scaleY(1)';
    };

    return (
        <div className={`${className} relative select-none`}>
            <svg 
                ref={svgRef} 
                viewBox="0 0 200 200" 
                className="w-full h-full drop-shadow-sm"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF8F55" />
                        <stop offset="30%" stopColor="#FF499E" />
                        <stop offset="60%" stopColor="#A45EFF" />
                        <stop offset="100%" stopColor="#2D8CFF" />
                    </linearGradient>
                </defs>

                {/* Main Stroke Group */}
                <g 
                    stroke="url(#avatarGradient)" 
                    strokeWidth="16" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    {/* Face Ring */}
                    <circle cx="100" cy="100" r="85" />

                    {/* Facial Features Group - Moves with cursor */}
                    <g style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: 'transform 0.1s ease-out' }}>
                        
                        {/* Eyes */}
                        <g style={{ transformOrigin: '65px 85px', transform: getEyeTransform('left'), transition: 'transform 0.2s' }}>
                            <circle cx="65" cy="85" r="14" fill="url(#avatarGradient)" stroke="none" />
                        </g>
                        <g style={{ transformOrigin: '135px 85px', transform: getEyeTransform('right'), transition: 'transform 0.2s' }}>
                            <circle cx="135" cy="85" r="14" fill="url(#avatarGradient)" stroke="none" />
                        </g>

                        {/* Mouth (Smile) */}
                        <path d="M 60 145 Q 100 175 140 145" strokeWidth="14" />
                    </g>
                </g>
            </svg>
        </div>
    );
};
