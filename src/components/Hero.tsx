import React from 'react';
import SpaceAnimation from './SpaceAnimation';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Hero = () => {
  const { language } = useApp();
  const t = translations[language];

  const scrollToOffers = () => {
    const element = document.getElementById('offers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Space Animation Background */}
      <SpaceAnimation particleCount={25} />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/eebb6314-e808-4fdf-bce2-c794d2ab21ee.png"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="hero-title mb-6">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 opacity-90 animate-fade-in-up">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
};

export default Hero;