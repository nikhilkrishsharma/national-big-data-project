import { INCIDENTS } from "../data/mockData";
import { mockFetch } from "./api";

class IncidentService {
  constructor() {
    this.incidents = [...INCIDENTS];
  }

  async getAllIncidents(filters = {}) {
    let result = [...this.incidents];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          i.nlpSummary.toLowerCase().includes(q)
      );
    }

    if (filters.type && filters.type !== "All") {
      result = result.filter((i) => i.type === filters.type);
    }

    if (filters.status && filters.status !== "All") {
      result = result.filter((i) => i.status === filters.status);
    }

    if (filters.severity && filters.severity !== "All") {
      result = result.filter((i) => i.severity === filters.severity);
    }

    if (filters.state && filters.state !== "All") {
      result = result.filter((i) => i.location.includes(filters.state));
    }

    return mockFetch(result);
  }

  async getIncidentById(id) {
    const item = this.incidents.find((i) => i.id === id);
    if (!item) {
      throw new Error(`Incident ${id} not found`);
    }
    return mockFetch(item);
  }

  async createIncident(newIncident) {
    const created = {
      id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      timeAgo: "Just now",
      aiConfidence: Math.floor(80 + Math.random() * 19),
      status: "Under Review",
      upvotes: 1,
      ndrfDispatched: false,
      ...newIncident
    };
    this.incidents.unshift(created);
    return mockFetch(created);
  }

  async updateIncidentStatus(id, newStatus) {
    const index = this.incidents.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.incidents[index].status = newStatus;
      return mockFetch(this.incidents[index]);
    }
    throw new Error(`Incident ${id} not found`);
  }
}

export const incidentService = new IncidentService();
