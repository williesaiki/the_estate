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
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  // If only one image or no images, show simple image
  if (images.length <= 1) {
    return <div className="relative overflow-hidden rounded-t-2xl">
        <img src={images[0] || '/placeholder.svg'} alt={title} className="property-image" onError={e => {
        e.currentTarget.src = '/placeholder.svg';
      }} />
        
      </div>;
  }
  return <div className="relative overflow-hidden rounded-t-2xl group">
      <img src={images[currentImageIndex]} alt={`${title} - zdjęcie ${currentImageIndex + 1}`} className="property-image" onError={e => {
      e.currentTarget.src = '/placeholder.svg';
    }} />
      
      {/* Price tag */}
      

      {/* Navigation buttons */}
      <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-black/20 text-white shadow-lg h-10 w-10 rounded-full z-50" onClick={prevImage}>
        <ChevronLeft className="h-5 w-5 drop-shadow-lg" />
      </Button>

      <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-black/20 text-white shadow-lg h-10 w-10 rounded-full z-50" onClick={nextImage}>
        <ChevronRight className="h-5 w-5 drop-shadow-lg" />
      </Button>

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {images.map((_, index) => <button key={index} className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-primary' : 'bg-background/60 hover:bg-background/80'}`} onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(index);
      }} />)}
      </div>
    </div>;
};
export default PropertyImageCarousel;