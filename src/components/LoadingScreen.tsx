import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import logoSvg from '@/assets/logo.svg';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  isRouteChange?: boolean;
}

export const LoadingScreen = ({ onLoadComplete, isRouteChange = false }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = isRouteChange ? 800 : 2000;
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadComplete?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [onLoadComplete, isRouteChange]);

  if (!isVisible) {
    return (
      <motion.div 
        className="fixed inset-0 bg-black z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative w-32 h-32">
          <img 
            src={logoSvg} 
            alt="Loading..." 
            className="w-32 h-32 brightness-75"
          />
          <motion.div
            className="absolute inset-0 w-32 h-32"
            style={{
              background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.8) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
              mask: `url(${logoSvg}) center/contain no-repeat`,
              WebkitMask: `url(${logoSvg}) center/contain no-repeat`,
            }}
            initial={{ backgroundPosition: "200% 0" }}
            animate={{ backgroundPosition: "-200% 0" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-32 h-32">
        <img 
          src={logoSvg} 
          alt="Loading..." 
          className="w-32 h-32 brightness-75"
        />
        <motion.div
          className="absolute inset-0 w-32 h-32"
          style={{
            background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.8) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
            mask: `url(${logoSvg}) center/contain no-repeat`,
            WebkitMask: `url(${logoSvg}) center/contain no-repeat`,
          }}
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};