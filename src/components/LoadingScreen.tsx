import { useEffect, useState } from 'react';
import logoSvg from '@/assets/logo.svg';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadComplete();
      }, 500); // Wait for fade out animation
    }, 1500); // Show loading for 1.5 seconds minimum

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-black z-50 animate-fade-out pointer-events-none">
        <div className="flex items-center justify-center h-full">
          <img 
            src={logoSvg} 
            alt="Loading..." 
            className="w-16 h-16 animate-[heartbeat_2s_ease-in-out_infinite]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <img 
        src={logoSvg} 
        alt="Loading..." 
        className="w-16 h-16 animate-[heartbeat_2s_ease-in-out_infinite]"
      />
    </div>
  );
};