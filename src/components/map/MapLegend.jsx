import React from 'react';

export const MapLegend = () => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-md p-3.5 rounded-2xl max-w-xs text-xs border border-slate-200 shadow-xl space-y-2.5">
      <div className="font-extrabold text-slate-900 border-b border-slate-100 pb-1.5">
        Incident Legend
      </div>

      <div className="space-y-1.5 text-[11px] font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span>Heavy Rain</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
          <span>Flood</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
          <span>Cyclone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Heatwave</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          <span>Active Incident</span>
        </div>
      </div>

      <div className="pt-1 border-t border-slate-100">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Rainfall Intensity</span>
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-200 via-amber-400 to-rose-600"></div>
        <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};
