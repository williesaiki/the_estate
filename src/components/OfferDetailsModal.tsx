import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Home, Square, User, Phone, Mail, Expand, Calendar, Building, Car, Wifi, Trees, Shield } from 'lucide-react';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';
import FavoriteButton from '@/components/FavoriteButton';
import PropertyMap from './PropertyMap';
import { mockTeamMembers } from '@/data/mockData';

interface OfferDetailsModalProps {
  offer: EstiCRMOffer | null;
  isOpen: boolean;
  onClose: () => void;
}

const OfferDetailsModal: React.FC<OfferDetailsModalProps> = ({ offer, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  if (!offer) return null;

  const images = offer.images && offer.images.length > 0 ? offer.images : [offer.image];
  
  // Find agent data
  const agentData = mockTeamMembers.find(member => 
    member.name.toLowerCase().includes(offer.agent_name?.toLowerCase().split(' ')[0] || '') ||
    member.name.toLowerCase().includes(offer.agent_name?.toLowerCase().split(' ')[1] || '')
  );

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrollY(target.scrollTop);
    };

    const modalContent = document.querySelector('[data-modal-content]');
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

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
        <DialogContent 
          className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 border-0"
          data-modal-content
        >
          <div className="relative w-full h-full bg-background">
            {/* Image Gallery - 80% height */}
            <div className="relative h-[80vh] w-full">
              <img 
                src={images[currentImageIndex]} 
                alt={`${offer.title} - zdjęcie ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              
              {/* Close button */}
              <Button 
                variant="ghost" 
                className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white z-50"
                onClick={onClose}
              >
                ← POWRÓT
              </Button>

              {/* Gallery controls */}
              {images.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white h-12 w-12 rounded-full transition-all"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white h-12 w-12 rounded-full transition-all"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Navigation dots */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Actions overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <FavoriteButton offer={offer} size="lg" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-black h-12 w-12 rounded-full transition-all"
                >
                  <Expand className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-black h-12 w-12 rounded-full transition-all"
                >
                  <User className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-black h-12 w-12 rounded-full transition-all"
                >
                  <Phone className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="h-[20vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Left column - Title and Description */}
                <div 
                  className="lg:col-span-2 space-y-6"
                  style={{
                    transform: `translateY(${Math.max(0, scrollY * 0.3)}px)`,
                    opacity: Math.max(0.3, 1 - scrollY * 0.003)
                  }}
                >
                  {/* Title with animation */}
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg">{offer.location.toUpperCase()}</span>
                    </div>
                    <h1 className="text-5xl font-serif text-foreground leading-tight">
                      {offer.title}
                    </h1>
                  </div>

                  {/* Property details */}
                  <div className="flex gap-8 text-muted-foreground animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5" />
                      <span>{offer.area.toFixed(2)} m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      <span>{offer.rooms} pok.</span>
                    </div>
                    {offer.floor && (
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        <span>{offer.floor}/4</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>2018</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <p className="text-lg text-muted-foreground leading-relaxed uppercase tracking-wide mb-4">
                      FINALNA APARTMENTS TO NOWE, LUKSUSOWE APARTAMENTY POŁOŻONE NA GÓRNYM MOKOTOWIE
                    </p>
                    <div className="text-muted-foreground leading-relaxed space-y-4">
                      {offer.description.split('\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => (
                        <p key={index} className="text-lg">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Location Map */}
                  {offer.latitude && offer.longitude && (
                    <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
                      <PropertyMap 
                        latitude={offer.latitude} 
                        longitude={offer.longitude}
                        propertyTitle={offer.title}
                      />
                    </div>
                  )}
                </div>

                {/* Right column - Price and Agent */}
                <div className="space-y-6">
                  {/* Price */}
                  <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <div className="text-6xl font-bold text-foreground">
                      {Math.round(offer.price / 1000000)} 000 000 zł
                    </div>
                    <div className="text-xl text-muted-foreground mt-2">
                      {Math.round(offer.price / offer.area).toLocaleString('pl-PL').replace(/,/g, ' ')} zł/m²
                    </div>
                  </div>

                  {/* Agent Info */}
                  {(offer.agent_name || agentData) && (
                    <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                      <div className="flex items-start gap-4">
                        {agentData && (
                          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={agentData.image} 
                              alt={agentData.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-foreground text-lg">
                            {offer.agent_name || agentData?.name}
                          </div>
                          {(offer.agent_phone || agentData?.phone) && (
                            <div className="text-muted-foreground">
                              {offer.agent_phone || agentData?.phone}
                            </div>
                          )}
                          {(offer.agent_email || agentData?.email) && (
                            <div className="text-muted-foreground">
                              {offer.agent_email || agentData?.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Buttons */}
                  <div className="space-y-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg rounded-lg">
                      Zapisz PDF
                    </Button>
                    <Button variant="outline" className="w-full py-4 text-lg rounded-lg">
                      Drukuj
                    </Button>
                    <Button variant="outline" className="w-full py-4 text-lg rounded-lg">
                      Udostępnij
                    </Button>
                  </div>
                </div>
              </div>
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