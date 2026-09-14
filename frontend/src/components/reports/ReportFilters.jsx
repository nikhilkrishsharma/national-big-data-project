import React from 'react';
import { Search, Download, Filter, FileSpreadsheet, FileJson } from 'lucide-react';
import { Button } from '../common/Button';

export const ReportFilters = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  severityFilter,
  onSeverityChange,
  onExportCSV,
  onExportJSON
}) => {
  return (
    <div className="glass-panel p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reports by ID, city, or NLP text..."
          className="w-full bg-slate-900/90 text-xs text-white placeholder-slate-500 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Filter Selectors */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <Filter className="w-3.5 h-3.5 text-sky-400" />
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-slate-900 text-xs text-white px-2.5 py-1.5 rounded-md border border-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Under Review">Under Review</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <span>Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="bg-slate-900 text-xs text-white px-2.5 py-1.5 rounded-md border border-slate-700 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Export Action Buttons */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          icon={FileSpreadsheet}
          onClick={onExportCSV}
        >
          Export CSV
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={FileJson}
          onClick={onExportJSON}
        >
          Export JSON
        </Button>
      </div>
    </div>
  );
};
