import React, { createContext, useContext, useState, useEffect } from 'react';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface FavoritesContextType {
  favoriteOffers: EstiCRMOffer[];
  addToFavorites: (offer: EstiCRMOffer) => void;
  removeFromFavorites: (offerId: string) => void;
  isFavorite: (offerId: string) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteOffers, setFavoriteOffers] = useState<EstiCRMOffer[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteOffers');
    if (savedFavorites) {
      try {
        setFavoriteOffers(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteOffers', JSON.stringify(favoriteOffers));
  }, [favoriteOffers]);

  const addToFavorites = (offer: EstiCRMOffer) => {
    setFavoriteOffers(prev => {
      if (prev.some(fav => fav.id === offer.id)) {
        return prev;
      }
      return [...prev, offer];
    });
  };

  const removeFromFavorites = (offerId: string) => {
    setFavoriteOffers(prev => prev.filter(offer => offer.id !== offerId));
  };

  const isFavorite = (offerId: string) => {
    return favoriteOffers.some(offer => offer.id === offerId);
  };

  const favoritesCount = favoriteOffers.length;

  return (
    <FavoritesContext.Provider value={{
      favoriteOffers,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      favoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};