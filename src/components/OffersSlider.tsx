import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useEstiCRMOffers } from '@/hooks/useEstiCRMOffers';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import OffersCarousel from '@/components/ui/offers-carousel';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

const OffersSlider = () => {
  const { language } = useApp();
  const t = translations[language];
  const { offers: allOffers, loading, error } = useEstiCRMOffers();

  // Show first 8 offers
  const properties = allOffers.slice(0, 8);

  const handleViewOffer = (offer: EstiCRMOffer) => {
    // Handle view offer action - could open modal, navigate to detail page, etc.
    console.log('View offer:', offer);
  };

  if (loading) {
    return (
      <section id="offers" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error || properties.length === 0) {
    return (
      <section id="offers" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
              {t.offers.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              {error ? 'Błąd podczas ładowania ofert' : 'Sprawdź nasze ekskluzywne oferty premium'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="offers" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 animate-fade-in">
            {t.offers.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            {t.offers.subtitle}
          </p>
        </div>

        <div className="relative overflow-hidden w-full h-full py-12">
          <OffersCarousel 
            offers={properties} 
            onViewOffer={handleViewOffer}
            t={t}
          />
        </div>
      </div>
    </section>
  );
};

export default OffersSlider;