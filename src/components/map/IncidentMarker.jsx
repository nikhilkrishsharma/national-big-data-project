import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ExternalLink, Navigation, ThumbsUp, ShieldCheck } from 'lucide-react';

const createCustomIcon = (severity, type) => {
  let color = '#0284c7'; // default blue
  let pulseClass = '';

  if (severity === 'Critical') {
    color = '#ef4444'; // red
    pulseClass = 'animate-ping opacity-75';
  } else if (severity === 'High') {
    color = '#f97316'; // orange
  } else if (severity === 'Moderate') {
    color = '#f59e0b'; // amber
  }

  const svgHtml = `
    <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
      ${severity === 'Critical' ? `<span style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background-color: ${color}; opacity: 0.4;" class="${pulseClass}"></span>` : ''}
      <div style="position: relative; width: 28px; height: 28px; border-radius: 50%; background-color: #0f172a; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px ${color}80;">
        <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color};"></div>
      </div>
    </div>
  `;

  return L.divAnchor ? L.divAnchor : L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

export const IncidentMarker = ({ incident, onSelect }) => {
  const icon = createCustomIcon(incident.severity, incident.type);

  return (
    <Marker
      position={[incident.lat, incident.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect && onSelect(incident)
      }}
    >
      <Popup className="incident-leaflet-popup">
        <div className="p-1 space-y-2 max-w-xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-2">
            <Badge severity={incident.severity} size="sm" />
            <Badge status={incident.status} size="sm" />
          </div>

          <h4 className="text-sm font-bold text-white leading-snug">{incident.title}</h4>
          
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1 font-medium">
              <Navigation className="w-3 h-3 text-sky-400" />
              {incident.location}
            </span>
            <span className="font-mono text-sky-400">{incident.timeAgo}</span>
          </div>

          <p className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800 line-clamp-2">
            {incident.nlpSummary}
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3 h-3" /> AI Conf: {incident.aiConfidence}%
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ThumbsUp className="w-3 h-3" /> {incident.upvotes}
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={() => onSelect && onSelect(incident)}
          >
            <span>View Full Details</span>
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};
