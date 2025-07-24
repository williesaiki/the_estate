import React, { useState, useEffect } from 'react';
import { MapPin, Home, Square, Plus, Filter, Loader2, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyImageCarousel from '@/components/PropertyImageCarousel';
import OfferDetailsModal from '@/components/OfferDetailsModal';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { useEstiCRMOffers, EstiCRMOffer } from '@/hooks/useEstiCRMOffers';
import { useParams, useNavigate } from 'react-router-dom';

const Offers = () => {
  const { language } = useApp();
  const t = translations[language];
  const { offers, loading, error } = useEstiCRMOffers();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<EstiCRMOffer | null>(null);

  useEffect(() => {
    if (id && offers.length > 0) {
      const offer = offers.find(o => o.id === id);
      setSelectedOffer(offer || null);
    } else if (!id) {
      setSelectedOffer(null);
    }
  }, [id, offers]);

  const handleOfferClick = (offer: EstiCRMOffer) => {
    navigate(`/offers/${offer.id}`);
  };

  const handleCloseModal = () => {
    navigate('/offers');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-red-500">Błąd podczas ładowania ofert: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6 animate-fade-in">
              {t.offers.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
              {t.offers.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="card-luxury max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filtry wyszukiwania</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Lokalizacja" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mokotow">Mokotów</SelectItem>
                  <SelectItem value="srodmiescie">Śródmieście</SelectItem>
                  <SelectItem value="wilanow">Wilanów</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Liczba pokoi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 pokój</SelectItem>
                  <SelectItem value="2">2 pokoje</SelectItem>
                  <SelectItem value="3">3 pokoje</SelectItem>
                  <SelectItem value="4">4+ pokoje</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Cena" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500k">do 500k</SelectItem>
                  <SelectItem value="1m">500k - 1M</SelectItem>
                  <SelectItem value="2m">1M - 2M</SelectItem>
                  <SelectItem value="3m">2M+</SelectItem>
                </SelectContent>
              </Select>

              <Button className="btn-luxury">
                Szukaj
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {offers.map((property, index) => (
              <div 
                key={property.id} 
                className="property-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Carousel */}
                <PropertyImageCarousel
                  images={property.images && property.images.length > 0 ? property.images : [property.image]}
                  title={property.title}
                  price={property.price}
                />

                {/* Content */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center space-x-1 mb-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{property.location}</span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Home className="h-4 w-4" />
                      <span>{property.rooms} {property.rooms === 1 ? 'pokój' : 'pokoje'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="h-4 w-4" />
                      <span>{property.area.toFixed(2)} m²</span>
                    </div>
                    {property.floor && (
                      <span>{property.floor}. piętro</span>
                    )}
                  </div>

                  {/* Title/Description */}
                  <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {property.title}
                  </h3>

                  {/* Price */}
                  <div className="text-2xl font-bold text-primary mb-4">
                    {property.price.toLocaleString()} PLN
                  </div>

                  {/* Agent Info */}
                  {property.agent_name && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.agent_name}</span>
                      </div>
                      {property.agent_phone && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Phone className="h-4 w-4" />
                          <span>{property.agent_phone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="btn-luxury w-full group-hover:shadow-gold transition-all duration-300"
                    onClick={() => handleOfferClick(property)}
                  >
                    {t.offers.viewOffer}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="outline" className="btn-ghost-luxury">
              Załaduj więcej ofert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Offer Details Modal */}
      <OfferDetailsModal 
        offer={selectedOffer}
        isOpen={!!selectedOffer}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Offers;