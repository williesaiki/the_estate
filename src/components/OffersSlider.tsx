import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Home, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProperties } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const OffersSlider = () => {
  const { language } = useApp();
  const t = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const properties = mockProperties.slice(0, 3); // Show first 3 properties

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % properties.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [properties.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length);
  };

  return (
    <section id="offers" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
            {t.offers.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            {t.offers.subtitle}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl shadow-luxury">
            <div 
              className="flex transition-transform duration-700 ease-luxury"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {properties.map((property) => (
                <div key={property.id} className="w-full flex-shrink-0">
                  <div className="relative h-[600px] md:h-[500px]">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                      <div className="max-w-2xl">
                        <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">
                          {property.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-4 text-white/80">
                          <MapPin className="h-5 w-5" />
                          <span className="text-lg">{property.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-6 mb-6 text-sm text-white/70">
                          <div className="flex items-center space-x-1">
                            <Home className="h-4 w-4" />
                            <span>{property.rooms} {t.offers.rooms}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Square className="h-4 w-4" />
                            <span>{property.area} m²</span>
                          </div>
                        </div>
                        
                        <p className="text-lg text-white/80 mb-8 line-clamp-2">
                          {property.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-primary">
                            {property.price.toLocaleString()} zł
                          </div>
                          <Button className="btn-luxury">
                            {t.offers.viewOffer}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white text-foreground z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white text-foreground z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSlider;