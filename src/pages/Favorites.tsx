import React, { useState } from 'react';
import { MapPin, Home, Square, User, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OfferDetailsModal from '@/components/OfferDetailsModal';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/contexts/FavoritesContext';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

const Favorites = () => {
  const { favoriteOffers } = useFavorites();
  const [selectedOffer, setSelectedOffer] = useState<EstiCRMOffer | null>(null);

  const formatPrice = (price: number): string => {
    return price.toLocaleString('pl-PL').replace(/,/g, ' ');
  };

  const OfferCard = ({ offer, onShowDetails }: { offer: EstiCRMOffer; onShowDetails: (offer: EstiCRMOffer) => void }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const allImages = [offer.image, ...(offer.images || [])].filter(Boolean);
    
    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };
    
    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
      <div 
        className="property-card group cursor-pointer flex flex-col"
        onClick={() => onShowDetails(offer)}
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <img 
            src={allImages[currentImageIndex]} 
            alt={offer.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
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
        
        <div className="p-6 flex flex-col flex-1">
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
            {offer.floor && (
              <span>{offer.floor}. piętro</span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2 flex-1">
            {offer.title}
          </h3>

          <div className="mt-auto">
            <div className="text-2xl font-bold text-white mb-4">
              {offer.price.toLocaleString('pl-PL').replace(/,/g, ' ')} PLN
            </div>

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-[hsl(220_13%_9%)]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
              Ulubione oferty
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Twoje zapisane oferty nieruchomości ({favoriteOffers.length})
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {favoriteOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Home className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Brak ulubionych ofert
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nie masz jeszcze żadnych ulubionych ofert. Przeglądaj nasze oferty i dodawaj te, które Ci się podobają.
                </p>
                <Button 
                  onClick={() => window.location.href = '/offers'}
                  className="btn-luxury"
                >
                  Przeglądaj oferty
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Results Counter */}
              <div className="mb-8">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{favoriteOffers.length}</span> 
                  {favoriteOffers.length === 1 ? ' ulubiona oferta' : favoriteOffers.length < 5 ? ' ulubione oferty' : ' ulubionych ofert'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteOffers.map((offer, index) => (
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
            </>
          )}
        </div>
      </section>

      <Footer />
      
      {selectedOffer && (
        <OfferDetailsModal
          offer={selectedOffer}
          isOpen={true}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
};

export default Favorites;