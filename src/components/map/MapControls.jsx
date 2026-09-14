import React from 'react';
import { Layers, Globe, RotateCcw } from 'lucide-react';

export const MapControls = ({
  activeTileLayer,
  onTileLayerChange,
  activeLayerToggle,
  onLayerToggleChange,
  onResetView
}) => {
  return (
    <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2">
      {/* Top Map Toggle Pills matching image: [Rainfall], [Flood], [Heatmap] */}
      <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200 flex items-center gap-1 text-xs font-bold">
        {['Rainfall', 'Flood', 'Heatmap'].map((toggle) => (
          <button
            key={toggle}
            onClick={() => onLayerToggleChange && onLayerToggleChange(toggle)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeLayerToggle === toggle
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {toggle}
          </button>
        ))}
      </div>

      <button
        onClick={onResetView}
        className="bg-white p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 shadow-md transition-colors"
        title="Reset Map View"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};
