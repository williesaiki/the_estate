import React, { useState } from 'react';
import { MapPin, Home, Square, Phone, Mail, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OfferDetailsModal from '@/components/OfferDetailsModal';
import FavoriteButton from '@/components/FavoriteButton';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface AgentOffersGridProps {
  offers: EstiCRMOffer[];
}

interface OfferCardProps {
  offer: EstiCRMOffer;
  onShowDetails: (offer: EstiCRMOffer) => void;
}

const OfferCard = ({ offer, onShowDetails }: OfferCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get all images for the offer
  const allImages = [offer.image, ...(offer.images || [])].filter(Boolean);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('pl-PL').replace(/,/g, ' ');
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text: string, maxLength: number) => {
    const cleanText = stripHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="property-card group cursor-pointer flex flex-col"
      onClick={() => onShowDetails(offer)}
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img 
          src={allImages[currentImageIndex]} 
          alt={offer.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image navigation arrows - only show if more than 1 image */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </>
        )}
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
            {offer.type === 'Mieszkanie' ? 'Mieszkanie' : offer.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <FavoriteButton offer={offer} size="sm" />
          <span className="px-3 py-1 bg-background/90 text-foreground text-sm font-semibold rounded-full">
            {formatPrice(offer.price)} zł
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Location */}
        <div className="flex items-center space-x-1 mb-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="font-medium">{offer.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Home className="h-4 w-4" />
            <span>{offer.rooms} {offer.rooms === 1 ? 'pokój' : 'pokoje'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span>{offer.area.toFixed(2)} m²</span>
          </div>
          {offer.floor && (
            <span>{offer.floor}. piętro</span>
          )}
        </div>

        {/* Title/Description */}
        <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2 flex-1">
          {offer.title}
        </h3>

        {/* Bottom section - always at bottom */}
        <div className="mt-auto">
          {/* Price */}
          <div className="text-2xl font-bold text-white mb-4">
            {offer.price.toLocaleString('pl-PL').replace(/,/g, ' ')} PLN
          </div>

          {/* Agent Info */}
          {offer.agent_name && (
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{offer.agent_name}</span>
              </div>
              {offer.agent_phone && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <Phone className="h-4 w-4" />
                  <span>{offer.agent_phone}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button 
            className="btn-luxury w-full group-hover:shadow-gold transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails(offer);
            }}
          >
            Zobacz ofertę
          </Button>
        </div>
      </div>
    </div>
  );
};

const AgentOffersGrid = ({ offers }: AgentOffersGridProps) => {
  const [selectedOffer, setSelectedOffer] = useState<EstiCRMOffer | null>(null);

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Brak dostępnych ofert.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div 
            key={offer.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-fade-in"
          >
            <OfferCard 
              offer={offer} 
              onShowDetails={setSelectedOffer}
            />
          </div>
        ))}
      </div>

      {selectedOffer && (
        <OfferDetailsModal
          offer={selectedOffer}
          isOpen={true}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </>
  );
};

export default AgentOffersGrid;