import { useState, useEffect, useCallback } from 'react';
import { incidentService } from '../services/incidentService';

export const useIncidents = (initialFilters = {}) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    severity: 'All',
    state: 'All',
    ...initialFilters
  });
  const [selectedIncident, setSelectedIncident] = useState(null);

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await incidentService.getAllIncidents(filters);
      setIncidents(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const updated = await incidentService.updateIncidentStatus(id, newStatus);
      setIncidents((prev) =>
        prev.map((item) => (item.id === id ? updated.data : item))
      );
      if (selectedIncident?.id === id) {
        setSelectedIncident(updated.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    incidents,
    loading,
    error,
    filters,
    updateFilters,
    selectedIncident,
    setSelectedIncident,
    updateStatus,
    refetch: fetchIncidents
  };
};
