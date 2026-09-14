import React from 'react';
import { IncidentDetails } from '../incidents/IncidentDetails';

export const ReportDetails = ({ incident, onClose, onUpdateStatus }) => {
  return (
    <IncidentDetails
      incident={incident}
      onClose={onClose}
      onUpdateStatus={onUpdateStatus}
    />
  );
};
