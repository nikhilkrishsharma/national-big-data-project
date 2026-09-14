import { ANALYTICS_DATA, WEATHER_SNAPSHOT } from "../data/mockData";
import { mockFetch } from "./api";

class AnalyticsService {
  async getDashboardAnalytics() {
    return mockFetch(ANALYTICS_DATA);
  }

  async getWeatherSnapshot() {
    return mockFetch(WEATHER_SNAPSHOT);
  }
}

export const analyticsService = new AnalyticsService();
