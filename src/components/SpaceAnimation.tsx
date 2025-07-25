import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  delay: number;
}

interface SpaceAnimationProps {
  particleCount?: number;
  className?: string;
}

const SpaceAnimation: React.FC<SpaceAnimationProps> = ({ 
  particleCount = 20, 
  className = "" 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = (): Particle[] => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        velocityX: (Math.random() - 0.5) * 0.5,
        velocityY: (Math.random() - 0.5) * 0.5,
        delay: Math.random() * 10
      }));
    };

    setParticles(generateParticles());
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${15 + particle.delay}s infinite linear`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      <div 
        className="absolute top-20 left-10 w-6 h-6 border border-white/20 rotate-45 animate-pulse"
        style={{ 
          animation: 'floatSlow 20s infinite ease-in-out',
          animationDelay: '0s'
        }}
      />
      <div 
        className="absolute top-40 right-20 w-8 h-8 bg-white/10 rounded-full animate-pulse"
        style={{ 
          animation: 'floatSlow 25s infinite ease-in-out reverse',
          animationDelay: '5s'
        }}
      />
      <div 
        className="absolute bottom-32 left-20 w-4 h-4 bg-white/15 rotate-12"
        style={{ 
          animation: 'floatSlow 18s infinite ease-in-out',
          animationDelay: '8s'
        }}
      />
      <div 
        className="absolute top-60 right-40 w-3 h-12 bg-white/10 rounded-full rotate-45"
        style={{ 
          animation: 'floatSlow 22s infinite ease-in-out reverse',
          animationDelay: '3s'
        }}
      />
    </div>
  );
};

export default SpaceAnimation;