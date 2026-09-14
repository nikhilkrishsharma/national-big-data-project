import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { INDIAN_STATES } from '../../data/mockData';

export const MapFilters = ({ filters, onFilterChange }) => {
  const eventTypes = [
    { label: "Heavy Rain", checked: true },
    { label: "Flood Alerts", checked: true },
    { label: "Cyclone", checked: false },
    { label: "Heatwave", checked: false },
    { label: "Active Incidents", checked: true }
  ];

  return (
    <div className="space-y-5 text-xs text-slate-700">
      
      {/* Event Type Checkboxes */}
      <div>
        <label className="block font-bold text-slate-900 mb-2">Event Type</label>
        <div className="space-y-1.5">
          {eventTypes.map((item) => (
            <label key={item.label} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* State / Region Dropdown */}
      <div>
        <label className="block font-bold text-slate-900 mb-1.5">State / Region</label>
        <select
          value={filters.state || 'All'}
          onChange={(e) => onFilterChange({ state: e.target.value })}
          className="w-full bg-white text-xs font-semibold text-slate-800 px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 shadow-sm"
        >
          <option value="All">All States</option>
          {INDIAN_STATES.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date & Time Pickers matching reference image */}
      <div className="space-y-2">
        <label className="block font-bold text-slate-900">Date & Time</label>
        
        <div className="relative">
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            readOnly
            value="01 Apr 2025 - 30 Apr 2025"
            className="w-full bg-white text-[11px] font-semibold text-slate-700 pl-8 pr-2 py-2 rounded-xl border border-slate-300 shadow-sm"
          />
        </div>

        <div className="relative">
          <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            readOnly
            value="00:00 - 23:59"
            className="w-full bg-white text-[11px] font-semibold text-slate-700 pl-8 pr-2 py-2 rounded-xl border border-slate-300 shadow-sm"
          />
        </div>
      </div>

      {/* Verification Status Checkboxes */}
      <div>
        <label className="block font-bold text-slate-900 mb-2">Verification Status</label>
        <div className="space-y-1.5 font-semibold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-slate-300" />
            <span>Verified</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-slate-300" />
            <span>Under Review</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-slate-300" />
            <span>Unverified</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 text-xs">
          Apply Filters
        </button>
        <button className="w-full py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl text-xs">
          Reset
        </button>
      </div>

    </div>
  );
};
