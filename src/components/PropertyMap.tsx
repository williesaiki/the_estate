import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  propertyTitle: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude, propertyTitle }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || !latitude || !longitude) return;

    const initMap = async () => {
      try {
        // Use Google Maps without API key for basic functionality
        // For production, you should add a Google Maps API key
        const loader = new Loader({
          apiKey: '', // Empty API key - works with limitations
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();

        const mapOptions: any = {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        };

        mapRef.current = new (window as any).google.maps.Map(mapContainer.current!, mapOptions);

        // Add marker for the property
        const marker = new (window as any).google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: mapRef.current,
          title: propertyTitle,
        });

        // Add info window
        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `<div style="padding: 8px; font-weight: 500;">${propertyTitle}</div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(mapRef.current, marker);
        });

        // Show info window by default
        infoWindow.open(mapRef.current, marker);

      } catch (error) {
        console.error('Google Maps initialization failed:', error);
        // Fallback to showing coordinates
        if (mapContainer.current) {
          mapContainer.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-muted rounded-lg">
              <div class="text-center">
                <p class="text-sm text-muted-foreground mb-2">Lokalizacja:</p>
                <p class="text-sm font-medium">${latitude.toFixed(6)}, ${longitude.toFixed(6)}</p>
                <p class="text-xs text-muted-foreground mt-1">Dodaj Google Maps API key dla pełnej funkcjonalności</p>
              </div>
            </div>
          `;
        }
      }
    };

    initMap();

    return () => {
      mapRef.current = null;
    };
  }, [latitude, longitude, propertyTitle]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Lokalizacja</h3>
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full h-64 rounded-lg border border-border bg-muted"
        />
      </div>
    </div>
  );
};

export default PropertyMap;