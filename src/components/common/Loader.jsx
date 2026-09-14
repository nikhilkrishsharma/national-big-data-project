import React from 'react';
import { Radar } from 'lucide-react';

export const Loader = ({ text = "Syncing GIS & Live Radar Feeds..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-sky-950/40 border border-sky-500/30">
        <div className="absolute inset-0 rounded-full border border-dashed border-sky-400/40 animate-spin" style={{ animationDuration: '6s' }}></div>
        <Radar className="w-8 h-8 text-sky-400 animate-radar" />
      </div>
      <p className="text-sm font-medium text-sky-300 tracking-wide animate-pulse">{text}</p>
    </div>
  );
};
