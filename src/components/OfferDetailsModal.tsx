import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Home, Square, User, Phone, Mail, Expand, Calendar, Building, Car, Wifi, Trees, Shield } from 'lucide-react';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';
import PropertyMap from './PropertyMap';

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
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 text-white transition-all duration-300">
          <DialogHeader className="border-b border-slate-700/50 pb-4">
            <DialogTitle className="text-3xl font-serif text-white flex items-center justify-between">
              <span>{offer.title}</span>
              <div className="text-2xl font-bold text-slate-200">
                {offer.price.toLocaleString()} PLN
              </div>
            </DialogTitle>
            <div className="flex items-center space-x-2 text-slate-300 mt-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{offer.location}</span>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Gallery Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative overflow-hidden rounded-xl aspect-[5/3] group shadow-2xl">
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

                {/* Fullscreen button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white h-12 w-12 rounded-full transition-all"
                  onClick={openFullscreenGallery}
                >
                  <Expand className="h-6 w-6" />
                </Button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-slate-200 px-4 py-2 rounded-lg font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail navigation */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shadow-lg ${
                        index === currentImageIndex ? 'border-slate-400 scale-105' : 'border-slate-600 hover:border-slate-400'
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
              
              {/* Description moved under gallery */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 text-slate-200">Opis nieruchomości</h3>
                <div className="text-slate-300 leading-relaxed text-lg space-y-4">
                  {offer.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-300 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Location Map moved under description */}
              {offer.latitude && offer.longitude && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 text-slate-200">Lokalizacja</h3>
                  <PropertyMap 
                    latitude={offer.latitude} 
                    longitude={offer.longitude}
                    propertyTitle={offer.title}
                  />
                </div>
              )}
            </div>

            {/* Enhanced Details Section */}
            <div className="space-y-6">
              {/* Basic Property Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-slate-200">Szczegóły nieruchomości</h3>
                <div className="space-y-6">
                  {/* Price */}
                  <div className="text-center py-4 border-b border-slate-700/50">
                    <div className="text-3xl font-bold text-white mb-2">
                      {offer.price.toLocaleString()}
                    </div>
                    <div className="text-lg text-slate-300">
                      {Math.round(offer.price / offer.area).toLocaleString()} zł / m²
                    </div>
                  </div>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Pokoje</div>
                      <div className="text-xl font-semibold text-white">{offer.rooms}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Metraż</div>
                      <div className="text-xl font-semibold text-white">{offer.area.toFixed(2)} m²</div>
                    </div>
                    {offer.floor && (
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Piętro</div>
                        <div className="text-xl font-semibold text-white">{offer.floor} / 4</div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Rok budowy</div>
                      <div className="text-xl font-semibold text-white">1938</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Info */}
              {offer.agent_name && (
                <div className="bg-gradient-to-r from-slate-700/20 to-slate-600/20 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-600/30">
                  <h3 className="text-xl font-semibold mb-4 text-slate-200">Kontakt z agentem</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-slate-400" />
                      <span className="font-medium text-white text-lg">{offer.agent_name}</span>
                    </div>
                    {offer.agent_phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-200">{offer.agent_phone}</span>
                      </div>
                    )}
                    {offer.agent_email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-200">{offer.agent_email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <Button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-4 text-lg rounded-xl shadow-xl transition-all duration-200">
                Skontaktuj się z agentem
              </Button>
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