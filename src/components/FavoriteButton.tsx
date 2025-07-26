import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface FavoriteButtonProps {
  offer: EstiCRMOffer;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FavoriteButton = ({ offer, size = 'md', className = '' }: FavoriteButtonProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isOfferFavorite = isFavorite(offer.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isOfferFavorite) {
      removeFromFavorites(offer.id);
    } else {
      addToFavorites(offer);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      className={`${sizeClasses[size]} bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border/50 transition-all duration-200 ${className}`}
    >
      <Heart 
        size={iconSizes[size]}
        className={`transition-colors duration-200 ${
          isOfferFavorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-muted-foreground hover:text-red-500'
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;