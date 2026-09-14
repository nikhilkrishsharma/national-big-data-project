import React from 'react';
import { Badge } from '../common/Badge';

export const IncidentCard = ({ incident, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(incident)}
      className={`p-3.5 rounded-xl transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'bg-blue-50/80 border-blue-400 shadow-md ring-1 ring-blue-300'
          : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{incident.title}</h4>
      </div>

      <div className="text-[11px] font-medium text-slate-500 mb-2">
        {incident.location}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="font-mono text-slate-400 font-medium">{incident.timeAgo}</span>
        <Badge status={incident.status} size="sm" />
      </div>
    </div>
  );
};
