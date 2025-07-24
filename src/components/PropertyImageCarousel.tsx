import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
  price: number;
}

const PropertyImageCarousel: React.FC<PropertyImageCarouselProps> = ({
  images,
  title,
  price
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // If only one image or no images, show simple image
  if (images.length <= 1) {
    return (
      <div className="relative overflow-hidden rounded-t-2xl">
        <img 
          src={images[0] || '/placeholder.svg'} 
          alt={title}
          className="property-image"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          {price.toLocaleString()} PLN
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-t-2xl group">
      <img 
        src={images[currentImageIndex]} 
        alt={`${title} - zdjęcie ${currentImageIndex + 1}`}
        className="property-image"
        onError={(e) => {
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
      
      {/* Price tag */}
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
        {price.toLocaleString()} PLN
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground shadow-md border border-border/50 opacity-80 hover:opacity-100 transition-all duration-200 h-10 w-10 rounded-full z-10"
        onClick={prevImage}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground shadow-md border border-border/50 opacity-80 hover:opacity-100 transition-all duration-200 h-10 w-10 rounded-full z-10"
        onClick={nextImage}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentImageIndex 
                ? 'bg-primary' 
                : 'bg-background/60 hover:bg-background/80'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentImageIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImageCarousel;