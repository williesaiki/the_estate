import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Home, Square, Plus, Filter, Loader2, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyImageCarousel from '@/components/PropertyImageCarousel';
import OfferDetailsModal from '@/components/OfferDetailsModal';
import OffersFilter, { FilterState } from '@/components/OffersFilter';
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
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    transactionType: 'all',
    location: 'all',
    marketType: 'all',
    priceFrom: '',
    priceTo: '',
    areaFrom: '',
    areaTo: '',
    propertyType: 'all',
  });

  // Filter offers based on current filters
  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      // Search term filter
      if (filters.searchTerm && !offer.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
          !String(offer.id).includes(filters.searchTerm)) {
        return false;
      }

      // Location filter
      if (filters.location && filters.location !== 'all' && offer.location !== filters.location) {
        return false;
      }

      // Property type filter
      if (filters.propertyType && filters.propertyType !== 'all' && offer.type !== filters.propertyType) {
        return false;
      }

      // Price range filter
      if (filters.priceFrom && offer.price < parseFloat(filters.priceFrom)) {
        return false;
      }
      if (filters.priceTo && offer.price > parseFloat(filters.priceTo)) {
        return false;
      }

      // Area range filter
      if (filters.areaFrom && offer.area < parseFloat(filters.areaFrom)) {
        return false;
      }
      if (filters.areaTo && offer.area > parseFloat(filters.areaTo)) {
        return false;
      }

      return true;
    });
  }, [offers, filters]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    console.log('Offers useEffect - id:', id, 'offers length:', offers.length);
    if (id && offers.length > 0) {
      // Convert both to strings to ensure comparison works
      const offer = offers.find(o => String(o.id) === String(id));
      console.log('Found offer:', offer);
      console.log('Comparing:', offers.map(o => ({ id: o.id, type: typeof o.id })));
      setSelectedOffer(offer || null);
    } else if (!id) {
      console.log('No id, clearing selected offer');
      setSelectedOffer(null);
    }
  }, [id, offers]);

  const handleOfferClick = (offer: EstiCRMOffer) => {
    console.log('Clicking offer:', offer.id);
    navigate(`/offers/${offer.id}`);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
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
          <div className="text-center mb-16 flex flex-col justify-center min-h-[200px]">
            <div className="mt-8">
              <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6 animate-fade-in">
                {t.offers.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
                {t.offers.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <OffersFilter offers={offers} onFiltersChange={handleFiltersChange} />
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-[1400px]">
          {/* Results Counter */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Znaleziono <span className="font-semibold text-foreground">{filteredOffers.length}</span> 
              {filteredOffers.length === 1 ? ' ofertę' : filteredOffers.length < 5 ? ' oferty' : ' ofert'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOffers.map((property, index) => (
              <div 
                key={property.id} 
                className="property-card group cursor-pointer flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleOfferClick(property)}
              >
                {/* Image Carousel */}
                <div onClick={(e) => e.stopPropagation()}>
                  <PropertyImageCarousel
                    images={property.images && property.images.length > 0 ? property.images : [property.image]}
                    title={property.title}
                    price={property.price}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
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
                  <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2 flex-1">
                    {property.title}
                  </h3>

                  {/* Bottom section - always at bottom */}
                  <div className="mt-auto">
                    {/* Price */}
                    <div className="text-2xl font-bold text-white mb-4">
                      {property.price.toLocaleString('pl-PL').replace(/,/g, ' ')} PLN
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOfferClick(property);
                      }}
                    >
                      {t.offers.viewOffer}
                    </Button>
                  </div>
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