import React, { useState } from 'react';
import { MapPin, Home, Square, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockProperties } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Offers = () => {
  const { language } = useApp();
  const t = translations[language];
  const [filteredProperties] = useState(mockProperties);

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
            {filteredProperties.map((property, index) => (
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

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="outline" className="btn-ghost-luxury">
              Załaduj więcej ofert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;