import { mockFetch } from './api';
import { incidentService } from './incidentService';

class AnalyticsService {
  async getDashboardAnalytics() {
    const response =
      await incidentService.getAllIncidents();

    const incidents = response.data;

    // Large-scale platform counter
    // Starts from 1248 and increases with citizen reports
    const totalIncidents =
      incidentService.getTotalIncidents();

    // Actual prototype records
    const verified = incidents.filter(
      (i) => i.status === 'Verified'
    ).length;

    const underReview = incidents.filter(
      (i) => i.status === 'Under Review'
    ).length;

    const unverified = incidents.filter(
      (i) => i.status === 'Unverified'
    ).length;

    // -----------------------------------------------
    // SOURCE DISTRIBUTION
    // -----------------------------------------------

    const sourceCounts = {};

    incidents.forEach((incident) => {
      const source =
        incident.source || 'Unknown';

      sourceCounts[source] =
        (sourceCounts[source] || 0) + 1;
    });

    const sourceDistribution =
      Object.entries(sourceCounts).map(
        ([name, count]) => ({
          name,
          count,

          percentage:
            incidents.length > 0
              ? Math.round(
                  (count / incidents.length) * 100
                )
              : 0
        })
      );

    // -----------------------------------------------
    // AI CONFIDENCE
    // -----------------------------------------------

    const confidenceValues = incidents
      .map((i) => i.aiConfidence)
      .filter(
        (value) =>
          typeof value === 'number' &&
          !Number.isNaN(value)
      );

    const avgConfidence =
      confidenceValues.length > 0
        ? confidenceValues.reduce(
            (sum, value) => sum + value,
            0
          ) / confidenceValues.length
        : 0;

    return mockFetch({
      totalIncidents,

      verified,

      underReview,

      unverified,

      sourceDistribution,

      avgConfidence
    });
  }

  async getWeatherSnapshot() {
    return mockFetch([]);
  }
}

export const analyticsService =
  new AnalyticsService();