import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [weatherSnapshot, setWeatherSnapshot] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const [analyticsRes, weatherRes] = await Promise.all([
          analyticsService.getDashboardAnalytics(),
          analyticsService.getWeatherSnapshot()
        ]);
        setAnalytics(analyticsRes.data);
        setWeatherSnapshot(weatherRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  return {
    analytics,
    weatherSnapshot,
    loading,
    error
  };
};
