import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Eye, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export const ReportTable = ({ incidents = [], onSelectIncident, onUpdateStatus }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(incidents.length / itemsPerPage) || 1;
  const currentIncidents = incidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === currentIncidents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentIncidents.map((i) => i.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="glass-panel overflow-hidden border-slate-800 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="p-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === currentIncidents.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0"
                />
              </th>
              <th className="p-3">Report ID</th>
              <th className="p-3">Title & Category</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Severity</th>
              <th className="p-3">AI Confidence</th>
              <th className="p-3">Source</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {currentIncidents.length > 0 ? (
              currentIncidents.map((incident) => {
                const isChecked = selectedIds.includes(incident.id);
                return (
                  <tr
                    key={incident.id}
                    className={`hover:bg-slate-800/60 transition-colors ${
                      isChecked ? 'bg-slate-800/40' : ''
                    }`}
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelectRow(incident.id)}
                        className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0"
                      />
                    </td>
                    <td className="p-3 font-mono font-bold text-sky-400 whitespace-nowrap">
                      {incident.id}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-100">{incident.title}</div>
                      <span className="text-[10px] text-slate-400">{incident.type}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-200 whitespace-nowrap">
                      {incident.location}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <Badge status={incident.status} size="sm" />
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <Badge severity={incident.severity} size="sm" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${incident.aiConfidence}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">{incident.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px] whitespace-nowrap">
                      {incident.source}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => onSelectIncident(incident)}
                        >
                          Inspect
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-400 text-xs">
                  No incident reports match your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Controls */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing {incidents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, incidents.length)} of {incidents.length} entries
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1 rounded bg-slate-800 border border-slate-700 disabled:opacity-40 hover:bg-slate-700"
          >
            <ChevronLeft className="w-4 h-4 text-slate-300" />
          </button>
          <span className="font-mono text-slate-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-1 rounded bg-slate-800 border border-slate-700 disabled:opacity-40 hover:bg-slate-700"
          >
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
