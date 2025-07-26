import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Home, Square, X } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import OfferDetailsModal from '@/components/OfferDetailsModal';
import FavoriteButton from '@/components/FavoriteButton';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesModal = ({ isOpen, onClose }: FavoritesModalProps) => {
  const { favoriteOffers } = useFavorites();
  const [selectedOffer, setSelectedOffer] = useState<EstiCRMOffer | null>(null);

  const formatPrice = (price: number): string => {
    return price.toLocaleString('pl-PL').replace(/,/g, ' ');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Ulubione oferty ({favoriteOffers.length})</DialogTitle>
          </DialogHeader>
          
          {favoriteOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nie masz jeszcze żadnych ulubionych ofert.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Dodaj oferty do ulubionych klikając ikonkę serca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteOffers.map((offer) => (
                <div 
                  key={offer.id}
                  className="property-card group cursor-pointer flex flex-col"
                  onClick={() => setSelectedOffer(offer)}
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        {offer.type}
                      </span>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <FavoriteButton offer={offer} size="sm" />
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center space-x-1 mb-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{offer.location}</span>
                    </div>

                    <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Home className="h-4 w-4" />
                        <span>{offer.rooms} {offer.rooms === 1 ? 'pokój' : 'pokoje'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="h-4 w-4" />
                        <span>{offer.area.toFixed(2)} m²</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2 flex-1">
                      {offer.title}
                    </h3>

                    <div className="text-xl font-bold text-primary">
                      {formatPrice(offer.price)} PLN
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

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

export default FavoritesModal;