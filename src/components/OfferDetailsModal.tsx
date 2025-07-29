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

  // All hooks must be called before any conditional logic
  useEffect(() => {
    if (!offer || !isOpen) return;
    
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrollY(target.scrollTop);
    };

    const modalContent = document.querySelector('[data-modal-content]');
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen, offer]);

  // Early return AFTER all hooks are called
  if (!offer) return null;

  const images = offer.images && offer.images.length > 0 ? offer.images : [offer.image];
  
  // Find agent data
  const agentData = mockTeamMembers.find(member => 
    member.name.toLowerCase().includes(offer.agent_name?.toLowerCase().split(' ')[0] || '') ||
    member.name.toLowerCase().includes(offer.agent_name?.toLowerCase().split(' ')[1] || '')
  );

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
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-full h-full p-0 overflow-hidden bg-background border border-border">
          <div className="relative w-full h-full flex flex-col">
            {/* Image Gallery - slides up on scroll */}
            <div 
              className="relative transition-all duration-500 ease-out overflow-hidden"
              style={{
                height: scrollY > 50 ? '200px' : '60%',
                transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)`,
                opacity: Math.max(0.3, 1 - scrollY * 0.003)
              }}
            >
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
                className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground border border-border"
                onClick={onClose}
              >
                ← Powrót
              </Button>

              {/* Gallery controls */}
              {images.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground border border-border h-12 w-12 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground border border-border h-12 w-12 rounded-full"
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
                      className={`w-3 h-3 rounded-full transition-all border ${
                        index === currentImageIndex 
                          ? 'bg-primary border-primary' 
                          : 'bg-background/50 border-border hover:bg-background/70'
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
                  className="bg-background/80 backdrop-blur-sm hover:bg-background text-foreground border border-border h-12 w-12 rounded-full"
                  onClick={openFullscreenGallery}
                >
                  <Expand className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div 
              className="flex-1 overflow-y-auto bg-background"
              onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
            >
              <div className="p-8 space-y-8">
                {/* Header with title and location */}
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="h-5 w-5" />
                    <span className="text-sm uppercase tracking-wide">{offer.location}</span>
                  </div>
                  <h1 className="text-4xl font-serif text-foreground mb-4">
                    {offer.title}
                  </h1>
                  
                  {/* Property details */}
                  <div className="flex gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Square className="h-4 w-4" />
                      <span>{offer.area.toFixed(2)} m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>{offer.rooms} pok.</span>
                    </div>
                    {offer.floor && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>{offer.floor}/4</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>2018</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left column - Description and Map */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Price - mobile only */}
                    <div className="lg:hidden bg-card rounded-lg p-6 border border-border animate-fade-in">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {offer.price.toLocaleString('pl-PL').replace(/,/g, ' ')} zł
                      </div>
                      <div className="text-lg text-muted-foreground">
                        {Math.round(offer.price / offer.area).toLocaleString('pl-PL').replace(/,/g, ' ')} zł/m²
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-card rounded-lg p-6 border border-border animate-fade-in" style={{animationDelay: '0.1s'}}>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">Opis nieruchomości</h3>
                      <div className="text-muted-foreground leading-relaxed space-y-4">
                        {offer.description.split('\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => (
                          <p key={index}>
                            {paragraph.trim()}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Location Map */}
                    {offer.latitude && offer.longitude && (
                      <div className="bg-card rounded-lg p-6 border border-border animate-fade-in" style={{animationDelay: '0.2s'}}>
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Lokalizacja</h3>
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
                    {/* Price - desktop only */}
                    <div className="hidden lg:block bg-card rounded-lg p-6 border border-border animate-fade-in">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-foreground mb-2">
                          {offer.price.toLocaleString('pl-PL').replace(/,/g, ' ')} zł
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {Math.round(offer.price / offer.area).toLocaleString('pl-PL').replace(/,/g, ' ')} zł/m²
                        </div>
                      </div>
                    </div>

                    {/* Agent Info */}
                    {(offer.agent_name || agentData) && (
                      <div className="bg-card rounded-lg p-6 border border-border animate-fade-in" style={{animationDelay: '0.1s'}}>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Kontakt z agentem</h3>
                        <div className="flex items-start gap-4">
                          {agentData && (
                            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
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
                          <div className="flex-1">
                            <div className="font-medium text-foreground mb-2">
                              {offer.agent_name || agentData?.name}
                            </div>
                            {(offer.agent_phone || agentData?.phone) && (
                              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                                <Phone className="h-4 w-4" />
                                <span>{offer.agent_phone || agentData?.phone}</span>
                              </div>
                            )}
                            {(offer.agent_email || agentData?.email) && (
                              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Mail className="h-4 w-4" />
                                <span>{offer.agent_email || agentData?.email}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Buttons */}
                    <div className="space-y-3 animate-fade-in" style={{animationDelay: '0.2s'}}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Skontaktuj się z agentem
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Drukuj
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Udostępnij
                        </Button>
                      </div>
                    </div>
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