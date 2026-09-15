import React from 'react';
import { IncidentCard } from './IncidentCard';

export const IncidentList = ({ incidents = [], selectedIncident, onSelectIncident }) => {
  return (
    <div className="space-y-2 overflow-y-auto pr-1 h-full">
      {incidents.map((item) => (
        <IncidentCard
          key={item.id}
          incident={item}
          isSelected={selectedIncident?.id === item.id}
          onSelect={onSelectIncident}
        />
      ))}
    </div>
  );
};
