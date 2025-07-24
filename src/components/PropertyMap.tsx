import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  propertyTitle: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude, propertyTitle }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !latitude || !longitude) return;

    // For now, use a placeholder token - user needs to add their Mapbox token
    const mapboxToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTdrMDNrbjkxbXQyMm1xZjFsZGplNW5qIn0.example'; // This is a placeholder
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [longitude, latitude],
        zoom: 15,
      });

      // Add marker for the property
      const marker = new mapboxgl.Marker({
        color: 'hsl(var(--primary))',
        scale: 1.2
      })
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="p-2 font-medium">${propertyTitle}</div>`)
        )
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    } catch (error) {
      console.error('Mapbox initialization failed:', error);
    }

    return () => {
      map.current?.remove();
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
        <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
          Aby wyświetlić mapę, dodaj token Mapbox w ustawieniach
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;