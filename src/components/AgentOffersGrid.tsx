import React, { useState } from 'react';
import { MapPin, Home, Square, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OfferDetailsModal from '@/components/OfferDetailsModal';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface AgentOffersGridProps {
  offers: EstiCRMOffer[];
}

const AgentOffersGrid = ({ offers }: AgentOffersGridProps) => {
  const [selectedOffer, setSelectedOffer] = useState<EstiCRMOffer | null>(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div 
            key={offer.id} 
            className="card-luxury group hover:shadow-gold transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden rounded-t-2xl mb-6">
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {offer.type === 'Mieszkanie' ? 'Mieszkanie' : offer.type}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-background/90 text-foreground text-sm font-semibold rounded-full">
                  {formatPrice(offer.price)} zł
                </span>
              </div>
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {offer.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  <span className="text-sm">{offer.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{offer.rooms} pokoje</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{offer.area} m²</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {truncateText(offer.description, 120)}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {offer.agent_name || 'Agent'}
                    </span>
                  </div>
                  {offer.agent_phone && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{offer.agent_phone}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full btn-luxury"
                  onClick={() => setSelectedOffer(offer)}
                >
                  Zobacz ofertę
                </Button>
              </div>
            </div>
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