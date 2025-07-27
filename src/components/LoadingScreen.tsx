import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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
          <motion.img 
            src={logoSvg} 
            alt="Loading..." 
            className="w-32 h-32"
            initial={{ filter: "brightness(0.4)" }}
            animate={{ filter: ["brightness(0.4)", "brightness(1)", "brightness(0.4)"] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.img 
        src={logoSvg} 
        alt="Loading..." 
        className="w-32 h-32"
        initial={{ filter: "brightness(0.4)" }}
        animate={{ filter: ["brightness(0.4)", "brightness(1)", "brightness(0.4)"] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
    </div>
  );
};