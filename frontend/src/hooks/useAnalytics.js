import {
  useState,
  useEffect,
  useCallback
} from 'react';

import { analyticsService } from '../services/analyticsService';
import { incidentService } from '../services/incidentService';

export const useAnalytics = () => {
  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const loadAnalytics =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await analyticsService.getDashboardAnalytics();

        setAnalytics(response.data);

        setError(null);
      } catch (err) {
        console.error(
          'Failed to load analytics:',
          err
        );

        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, []);

  // Initial load
  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Update Analytics whenever
  // a new incident is created/updated
  useEffect(() => {
    const unsubscribe =
      incidentService.subscribe(() => {
        loadAnalytics();
      });

    return unsubscribe;
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: loadAnalytics
  };
};