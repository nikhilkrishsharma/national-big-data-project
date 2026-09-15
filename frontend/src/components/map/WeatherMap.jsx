import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { Badge } from '../common/Badge';

// Fix Leaflet default icon paths in React / Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const INDIA_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

const createClusterIcon = (count, color = '#2563eb') => {
  const svgHtml = `
    <div style="width: 34px; height: 34px; border-radius: 50%; background-color: ${color}; color: #ffffff; font-weight: 800; font-size: 13px; font-family: sans-serif; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px ${color}80; border: 2.5px solid #ffffff;">
      ${count}
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
};

// Map controller helper to handle view reset and tile size invalidation
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
      if (center) map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

export const WeatherMap = ({ incidents = [], selectedIncident, onSelectIncident }) => {
  const [activeLayerToggle, setActiveLayerToggle] = useState('Rainfall');
  const [mapCenter, setMapCenter] = useState(INDIA_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  const clusterPoints = incidents.filter((incident) => incident.lat && incident.lng).map((incident) => ({
    ...incident,
    count: 1,
    color: incident.severity === 'Critical' ? '#dc2626' : incident.severity === 'High' ? '#f97316' : '#2563eb'
  }));

  return (
    <div className="relative w-full h-full min-h-[540px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      <MapContainer
        center={INDIA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        style={{ height: '100%', width: '100%' }}
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        {/* High Reliability OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {clusterPoints.map((pt) => (
          <Marker
            key={pt.id}
            position={[pt.lat, pt.lng]}
            icon={createClusterIcon(pt.count, pt.color)}
            eventHandlers={{
              click: () => onSelectIncident && onSelectIncident(pt)
            }}
          >
            <Popup>
              <div className="p-1 space-y-1 text-xs">
                <div className="font-bold text-slate-900">{pt.title}</div>
                <div className="text-slate-500 font-medium">{pt.type} • {pt.count} active reports</div>
                <Badge status={pt.status} size="sm" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Layer Controls */}
      <MapControls
        activeLayerToggle={activeLayerToggle}
        onLayerToggleChange={setActiveLayerToggle}
        onResetView={() => { setMapCenter(INDIA_CENTER); setMapZoom(DEFAULT_ZOOM); }}
      />

      {/* Map Legend Box */}
      <MapLegend />
    </div>
  );
};
