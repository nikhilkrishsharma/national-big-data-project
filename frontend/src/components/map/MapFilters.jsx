import React, { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { INDIAN_STATES } from '../../data/mockData';

export const MapFilters = ({ filters, onFilterChange }) => {
  const eventTypes = [
    "Landslide",
    "Flash Flood",
    "Cloudburst",
    "Cyclone",
    "Heatwave"
  ];
  const statuses = ["Verified", "Under Review", "Unverified"];
  const [selectedTypes, setSelectedTypes] = useState(filters.type === 'All' ? eventTypes : filters.type || []);
  const [selectedStatuses, setSelectedStatuses] = useState(filters.status === 'All' ? statuses : filters.status || []);
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '');
  const [dateTo, setDateTo] = useState(filters.dateTo || '');

  useEffect(() => {
    setSelectedTypes(filters.type === 'All' ? eventTypes : filters.type || []);
    setSelectedStatuses(filters.status === 'All' ? statuses : filters.status || []);
    setDateFrom(filters.dateFrom || '');
    setDateTo(filters.dateTo || '');
  }, [filters.type, filters.status, filters.dateFrom, filters.dateTo]);

  const toggleSelection = (value, selected, setSelected) => {
    setSelected(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };

  const applyFilters = () => {
    onFilterChange({
      type: selectedTypes.length === eventTypes.length ? 'All' : selectedTypes,
      status: selectedStatuses.length === statuses.length ? 'All' : selectedStatuses,
      dateFrom,
      dateTo
    });
  };

  const resetFilters = () => {
    setSelectedTypes(eventTypes);
    setSelectedStatuses(statuses);
    setDateFrom('');
    setDateTo('');
    onFilterChange({ state: 'All', type: 'All', status: 'All', severity: 'All', search: '', dateFrom: '', dateTo: '' });
  };

  return (
    <div className="space-y-5 text-xs text-slate-700">
      
      {/* Event Type Checkboxes */}
      <div>
        <label className="block font-bold text-slate-900 mb-2">Event Type</label>
        <div className="space-y-1.5">
          {eventTypes.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={selectedTypes.includes(item)}
                onChange={() => toggleSelection(item, selectedTypes, setSelectedTypes)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span>{item}</span>
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
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full bg-white text-[11px] font-semibold text-slate-700 pl-8 pr-2 py-2 rounded-xl border border-slate-300 shadow-sm"
          />
        </div>

        <div className="relative">
          <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full bg-white text-[11px] font-semibold text-slate-700 pl-8 pr-2 py-2 rounded-xl border border-slate-300 shadow-sm"
          />
        </div>
      </div>

      {/* Verification Status Checkboxes */}
      <div>
        <label className="block font-bold text-slate-900 mb-2">Verification Status</label>
        <div className="space-y-1.5 font-semibold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStatuses.includes('Verified')}
              onChange={() => toggleSelection('Verified', selectedStatuses, setSelectedStatuses)}
              className="w-4 h-4 rounded text-blue-600 border-slate-300"
            />
            <span>Verified</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStatuses.includes('Under Review')}
              onChange={() => toggleSelection('Under Review', selectedStatuses, setSelectedStatuses)}
              className="w-4 h-4 rounded text-blue-600 border-slate-300"
            />
            <span>Under Review</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStatuses.includes('Unverified')}
              onChange={() => toggleSelection('Unverified', selectedStatuses, setSelectedStatuses)}
              className="w-4 h-4 rounded text-blue-600 border-slate-300"
            />
            <span>Unverified</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <button onClick={applyFilters} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 text-xs">
          Apply Filters
        </button>
        <button onClick={resetFilters} className="w-full py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl text-xs">
          Reset
        </button>
      </div>

    </div>
  );
};
