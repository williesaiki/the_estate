import React from 'react';
import { MapPin, Home, Square, Plus, Loader2, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { useEstiCRMOffers } from '@/hooks/useEstiCRMOffers';

const PropertiesGrid = () => {
  const { language } = useApp();
  const t = translations[language];
  const { offers, loading, error } = useEstiCRMOffers();

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-500">Błąd podczas ładowania ofert: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
            {t.properties.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            {t.properties.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {offers.map((property, index) => (
            <div 
              key={property.id} 
              className="property-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="property-image"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {property.price.toLocaleString()} PLN
                </div>
              </div>

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
                <Button className="btn-luxury w-full group-hover:shadow-gold transition-all duration-300">
                  {t.offers.viewOffer}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesGrid;