import React from 'react';

interface AnimatedSphereProps {
  className?: string;
}

export const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`rounded-full sphere-gradient animate-fluid shadow-[inset_4px_4px_20px_rgba(255,255,255,0.6),inset_-4px_-4px_20px_rgba(0,0,0,0.05)] ${className}`}></div>
  );
};