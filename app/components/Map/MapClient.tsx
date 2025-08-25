'use client';

import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationEvent } from 'leaflet';
import { useMapStore } from '@/app/store/map-store';

function MyComponent() {
  const map = useMap();
  const { updateCoords } = useMapStore();
  console.log('map center:', map.getCenter());

  const event = useMapEvents({
    // Update coordinates when map is moved/dragged
    moveend: () => {
      const center = event.getCenter();
      console.log('map moved to:', center);
      updateCoords(center.lat, center.lng);
    },
    // Update coordinates when map is clicked
    click: (e) => {
      console.log('map clicked at:', e.latlng);
      updateCoords(e.latlng.lat, e.latlng.lng);
    },
    // Update coordinates when zoom changes
    zoomend: () => {
      const center = event.getCenter();
      console.log('map zoomed, center:', center);
      updateCoords(center.lat, center.lng);
    },
    // Optional: Use browser geolocation
    locationfound: (location: LocationEvent) => {
      console.log('browser location found:', location);
      updateCoords(location.latlng.lat, location.latlng.lng);
    },
  });

  return null;
}

function MapClient() {
  const { lat, lon } = useMapStore();

  return (
    <div className="relative">
      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer center={[lat, lon]} zoom={25} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent />
        </MapContainer>
      </div>

      {/* Coordinates Display */}
      <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-mono text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
        📍 {lat.toFixed(4)}, {lon.toFixed(4)}
      </div>
    </div>
  );
}

export default MapClient;
