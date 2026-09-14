import React from 'react';
import { Filter, Flame, RefreshCw, Layers } from 'lucide-react';
import { MapFilters } from '../map/MapFilters';
import { IncidentList } from '../incidents/IncidentList';

export const Sidebar = ({
  mode = 'map-filters',
  filters,
  onFilterChange,
  incidents = [],
  selectedIncident,
  onSelectIncident,
  className = ''
}) => {
  return (
    <aside className={`glass-panel p-4 flex flex-col h-full overflow-hidden ${className}`}>
      {mode === 'map-filters' && (
        <>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Map Filters</h2>
            </div>
            <button
              onClick={() => onFilterChange({ search: '', type: 'All', status: 'All', severity: 'All', state: 'All' })}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-1">
            <MapFilters filters={filters} onFilterChange={onFilterChange} />
          </div>
        </>
      )}

      {mode === 'live-feed' && (
        <>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">Live Incident Feed</h2>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/30">
              {incidents.length} Events
            </span>
          </div>
          <div className="flex-1 overflow-y-auto pr-1">
            <IncidentList
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={onSelectIncident}
            />
          </div>
        </>
      )}
    </aside>
  );
};
