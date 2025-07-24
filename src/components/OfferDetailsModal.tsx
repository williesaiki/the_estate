import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Home, Square, User, Phone, Mail, Expand } from 'lucide-react';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface OfferDetailsModalProps {
  offer: EstiCRMOffer | null;
  isOpen: boolean;
  onClose: () => void;
}

const OfferDetailsModal: React.FC<OfferDetailsModalProps> = ({ offer, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);

  if (!offer) return null;

  const images = offer.images && offer.images.length > 0 ? offer.images : [offer.image];

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const openFullscreenGallery = () => {
    setIsGalleryFullscreen(true);
  };

  const closeFullscreenGallery = () => {
    setIsGalleryFullscreen(false);
  };

  return (
    <>
      {/* Main Modal */}
      <Dialog open={isOpen && !isGalleryFullscreen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] overflow-auto bg-gradient-subtle border-primary/20">
          <DialogHeader className="border-b border-primary/10 pb-6 mb-6">
            <DialogTitle className="text-3xl font-serif text-foreground bg-gradient-primary bg-clip-text text-transparent">
              {offer.title}
            </DialogTitle>
            <div className="flex items-center space-x-2 text-muted-foreground mt-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">{offer.location}</span>
            </div>
          </DialogHeader>

          <div className="space-y-8">
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/9] group shadow-luxury">
                <img 
                  src={images[currentImageIndex]}
                  alt={`${offer.title} - zdjęcie ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                
                {/* Navigation buttons */}
                {images.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground border border-primary/20 h-12 w-12 rounded-full shadow-luxury backdrop-blur-sm"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground border border-primary/20 h-12 w-12 rounded-full shadow-luxury backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}

                {/* Fullscreen button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background text-foreground border border-primary/20 h-12 w-12 rounded-full shadow-luxury backdrop-blur-sm"
                  onClick={openFullscreenGallery}
                >
                  <Expand className="h-5 w-5" />
                </Button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-background/90 text-foreground px-3 py-2 rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail navigation */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shadow-md hover:shadow-luxury ${
                        index === currentImageIndex ? 'border-primary shadow-gold' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price and Key Details */}
            <div className="card-luxury p-6">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                {offer.price.toLocaleString()} PLN
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-primary/10">
                  <Home className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{offer.rooms}</div>
                  <div className="text-sm text-muted-foreground">{offer.rooms === 1 ? 'pokój' : 'pokoje'}</div>
                </div>
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-primary/10">
                  <Square className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{offer.area.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">m²</div>
                </div>
                {offer.floor && (
                  <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-foreground">{offer.floor}</div>
                    <div className="text-sm text-muted-foreground">piętro</div>
                  </div>
                )}
              </div>

            {/* Description */}
            <div className="card-luxury p-6">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-foreground">Opis nieruchomości</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {offer.description}
              </p>
            </div>

            {/* Amenities */}
            {offer.amenities && offer.amenities.length > 0 && (
              <div className="card-luxury p-6">
                <h3 className="text-2xl font-serif font-semibold mb-4 text-foreground">Udogodnienia</h3>
                <div className="flex flex-wrap gap-3">
                  {offer.amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-subtle border border-primary/20 text-foreground rounded-full text-sm font-medium hover:shadow-gold transition-all"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Agent Info */}
            {offer.agent_name && (
              <div className="card-luxury p-6 bg-gradient-subtle border-primary/20">
                <h3 className="text-2xl font-serif font-semibold mb-4 text-foreground">Kontakt z agentem</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-lg text-foreground">{offer.agent_name}</span>
                  </div>
                  {offer.agent_phone && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground">{offer.agent_phone}</span>
                    </div>
                  )}
                  {offer.agent_email && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground">{offer.agent_email}</span>
                    </div>
                  )}
                </div>
                
                {/* Contact Button */}
                <Button className="w-full btn-luxury mt-6 text-lg py-6">
                  Skontaktuj się z agentem
                </Button>
              </div>
            )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Gallery Modal */}
      <Dialog open={isGalleryFullscreen} onOpenChange={closeFullscreenGallery}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 border-0">
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <img 
              src={images[currentImageIndex]} 
              alt={`${offer.title} - zdjęcie ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white h-12 w-12 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white h-12 w-12 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Close button */}
            <Button 
              variant="ghost" 
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white"
              onClick={closeFullscreenGallery}
            >
              Zamknij
            </Button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded text-lg">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OfferDetailsModal;