import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EstiCRMOffer } from '@/hooks/useEstiCRMOffers';

interface OffersFilterProps {
  offers: EstiCRMOffer[];
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  searchTerm: string;
  transactionType: 'all' | 'sprzedaz' | 'wynajem';
  location: string;
  marketType: 'all' | 'pierwotny' | 'wtorny';
  priceFrom: string;
  priceTo: string;
  areaFrom: string;
  areaTo: string;
  propertyType: string;
}

const OffersFilter: React.FC<OffersFilterProps> = ({ offers, onFiltersChange }) => {
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

  // Extract unique locations from offers
  const availableLocations = useMemo(() => {
    const locations = offers
      .map(offer => offer.location)
      .filter((location, index, array) => array.indexOf(location) === index)
      .sort();
    return locations;
  }, [offers]);

  // Extract unique property types from offers
  const availablePropertyTypes = useMemo(() => {
    const types = offers
      .map(offer => offer.type || 'Mieszkanie')
      .filter((type, index, array) => array.indexOf(type) === index)
      .sort();
    return types;
  }, [offers]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (key: 'priceFrom' | 'priceTo', value: string) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, '');
    handleFilterChange(key, numericValue);
  };

  const formatPriceDisplay = (value: string) => {
    if (!value) return '';
    return parseInt(value).toLocaleString('pl-PL');
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      searchTerm: '',
      transactionType: 'all',
      location: 'all',
      marketType: 'all',
      priceFrom: '',
      priceTo: '',
      areaFrom: '',
      areaTo: '',
      propertyType: 'all',
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Filtry wyszukiwania</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search Input */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-foreground mb-2">
            Nazwa lub numer oferty
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Wpisz nazwę lub numer oferty"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Rodzaj
          </label>
          <div className="flex border border-input rounded-md bg-background">
            <button
              type="button"
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md transition-colors ${
                filters.transactionType === 'sprzedaz'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-muted'
              }`}
              onClick={() => handleFilterChange('transactionType', filters.transactionType === 'sprzedaz' ? 'all' : 'sprzedaz')}
            >
              Sprzedaż
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md border-l border-input transition-colors ${
                filters.transactionType === 'wynajem'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-muted'
              }`}
              onClick={() => handleFilterChange('transactionType', filters.transactionType === 'wynajem' ? 'all' : 'wynajem')}
            >
              Wynajem
            </button>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Lokalizacja
          </label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border">
              <SelectItem value="all">Wszystkie</SelectItem>
              {availableLocations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Market Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Rynek
          </label>
          <div className="flex border border-input rounded-md bg-background">
            <button
              type="button"
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-md transition-colors ${
                filters.marketType === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-muted'
              }`}
              onClick={() => handleFilterChange('marketType', 'all')}
            >
              Wszystkie
            </button>
            <button
              type="button"
              className={`flex-1 px-3 py-2 text-sm font-medium border-l border-input transition-colors ${
                filters.marketType === 'pierwotny'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-muted'
              }`}
              onClick={() => handleFilterChange('marketType', 'pierwotny')}
            >
              Pierwotny
            </button>
            <button
              type="button"
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-md border-l border-input transition-colors ${
                filters.marketType === 'wtorny'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-muted'
              }`}
              onClick={() => handleFilterChange('marketType', 'wtorny')}
            >
              Wtórny
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Cena
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Od"
              value={formatPriceDisplay(filters.priceFrom)}
              onChange={(e) => handlePriceChange('priceFrom', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Do"
              value={formatPriceDisplay(filters.priceTo)}
              onChange={(e) => handlePriceChange('priceTo', e.target.value)}
            />
          </div>
        </div>

        {/* Area Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Metraż
          </label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Od"
              value={filters.areaFrom}
              onChange={(e) => handleFilterChange('areaFrom', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Do"
              value={filters.areaTo}
              onChange={(e) => handleFilterChange('areaTo', e.target.value)}
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Typ
          </label>
          <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border">
              <SelectItem value="all">Wszystkie</SelectItem>
              {availablePropertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Wyczyść wszystkie filtry
        </Button>
      </div>
    </div>
  );
};

export default OffersFilter;