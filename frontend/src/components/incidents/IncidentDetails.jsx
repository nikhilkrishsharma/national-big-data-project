import React from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  Radio 
} from 'lucide-react';

export const IncidentDetails = ({ incident, onClose, onUpdateStatus }) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Badge severity={incident.severity || "High"} />
              <Badge status={incident.status || "Verified"} />
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider">{incident.id || "INC-2025-089"}</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 leading-snug">{incident.title}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <MapPin className="w-4 h-4 text-blue-600" />
                {incident.location || "Jaipur, Rajasthan"}
              </span>
              <span className="flex items-center gap-1 font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {incident.timeAgo || "2 mins ago"}
              </span>
            </div>
          </div>

          {/* Media Preview Image */}
          {incident.image && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video">
              <img
                src={incident.image}
                alt={incident.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[11px] text-slate-800 font-semibold flex items-center gap-1.5 border border-slate-200 shadow-sm">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                Source: {incident.source || "Twitter/X"} ({incident.socialHandle || "@weather_updates"})
              </div>
            </div>
          )}

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Multimodal AI Verification Summary
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {incident.nlpSummary || "Multimodal AI verified matching ground photos and social media feeds. Satellite radar echoes corroborate heavy precipitation over the region."}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-semibold text-[11px]">AI Confidence Score</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${(incident.aiConfidence || 92)}%` }}
                  ></div>
                </div>
                <span className="font-mono font-bold text-emerald-700">{incident.aiConfidence || 92}%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-semibold text-[11px]">Affected Population</span>
              <p className="font-mono font-bold text-slate-900 text-sm mt-1 flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-600" />
                {incident.affectedPopulation || "1,500+"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="emerald"
              size="sm"
              icon={CheckCircle2}
              onClick={() => onUpdateStatus && onUpdateStatus(incident.id, 'Verified')}
            >
              Verify Incident
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={AlertTriangle}
              onClick={() => onUpdateStatus && onUpdateStatus(incident.id, 'Unverified')}
            >
              Flag False Alarm
            </Button>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Send}
            className="w-full"
            onClick={() => alert(`NDRF Alert dispatched for ${incident.location || "selected region"}`)}
          >
            Dispatch Emergency Alert
          </Button>
        </div>

      </div>
    </div>
  );
};
