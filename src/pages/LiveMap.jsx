import React, { useState } from 'react';
import { WeatherMap } from '../components/map/WeatherMap';
import { MapFilters } from '../components/map/MapFilters';
import { IncidentList } from '../components/incidents/IncidentList';
import { IncidentDetails } from '../components/incidents/IncidentDetails';
import { useIncidents } from '../hooks/useIncidents';
import { Radio, ShieldAlert, CheckCircle2, MapPin, Clock, AlertTriangle } from 'lucide-react';

export const LiveMap = () => {
  const {
    incidents,
    filters,
    updateFilters,
    selectedIncident,
    setSelectedIncident,
    updateStatus
  } = useIncidents();

  return (
    <div className="space-y-4 pb-8">
      
      {/* Top Header matching reference image 2 (Left) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Live Map</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time view of weather-related incidents across India</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Updates</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>WebSocket Connected</span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Command Layout matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start min-h-[540px]">
        
        {/* Left Filter Panel (Col 3) */}
        <div className="md:col-span-3 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
            Filters
          </h3>
          <MapFilters filters={filters} onFilterChange={updateFilters} />
        </div>

        {/* Center GIS Map (Col 6) */}
        <div className="md:col-span-6 h-[540px]">
          <WeatherMap
            incidents={incidents}
            selectedIncident={selectedIncident}
            onSelectIncident={setSelectedIncident}
          />
        </div>

        {/* Right Live Incident Feed (Col 3) */}
        <div className="md:col-span-3 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col h-[540px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <h3 className="text-sm font-extrabold text-slate-900">Live Incident Feed</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-full border border-blue-200">
              17 new
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <IncidentList
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={setSelectedIncident}
            />
          </div>
        </div>

      </div>

      {/* Bottom KPI Summary Bar matching reference screenshot (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Live Incidents</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">138</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+12% from last hour</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Verified Reports</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">102</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+8% from last hour</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active States</span>
            <MapPin className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">24</div>
          <p className="text-[11px] text-slate-400 font-medium">out of 28</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Last Update</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-sm font-extrabold text-slate-900 font-mono mt-1">Apr 30, 2025 • 10:45 AM</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
          </p>
        </div>

      </div>

      {/* Selected Incident Drawer */}
      {selectedIncident && (
        <IncidentDetails
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onUpdateStatus={updateStatus}
        />
      )}

    </div>
  );
};
