import React from 'react';
import { MapPin, Home, Square, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProperties } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const PropertiesGrid = () => {
  const { language } = useApp();
  const t = translations[language];

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
          {mockProperties.map((property, index) => (
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
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {property.price.toLocaleString()} zł
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {property.title}
                </h3>
                
                <div className="flex items-center space-x-1 mb-4 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Home className="h-4 w-4" />
                    <span>{property.rooms} {t.offers.rooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area} m²</span>
                  </div>
                  {property.floor && (
                    <span>{property.floor}. piętro</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 text-sm line-clamp-2">
                  {property.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="pill-button">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="pill-button flex items-center space-x-1">
                      <Plus className="h-3 w-3" />
                      <span>{property.amenities.length - 3} {t.offers.more}</span>
                    </span>
                  )}
                </div>

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