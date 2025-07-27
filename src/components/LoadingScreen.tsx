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
      }, 300); // Shortened fade out time
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isVisible) {
    return (
      <motion.div 
        className="fixed inset-0 bg-black z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.img 
          src={logoSvg} 
          alt="Loading..." 
          className="w-32 h-32"
          style={{
            filter: "brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.3))"
          }}
          animate={{
            filter: [
              "brightness(0.6) drop-shadow(0 0 10px rgba(255,255,255,0.1))",
              "brightness(1.2) drop-shadow(0 0 30px rgba(255,255,255,0.6))",
              "brightness(0.6) drop-shadow(0 0 10px rgba(255,255,255,0.1))"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.img 
        src={logoSvg} 
        alt="Loading..." 
        className="w-32 h-32"
        style={{
          filter: "brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.3))"
        }}
        animate={{
          filter: [
            "brightness(0.6) drop-shadow(0 0 10px rgba(255,255,255,0.1))",
            "brightness(1.2) drop-shadow(0 0 30px rgba(255,255,255,0.6))",
            "brightness(0.6) drop-shadow(0 0 10px rgba(255,255,255,0.1))"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};