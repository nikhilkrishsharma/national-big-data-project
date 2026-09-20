import { INCIDENTS } from '../data/mockData';
import { mockFetch } from './api';

const STORAGE_KEY = 'weather_incidents';

const TOTAL_INCIDENTS_KEY = 'weather_total_incidents';
const BASE_TOTAL_INCIDENTS = 1248;

class IncidentService {
  constructor() {
    const savedIncidents = localStorage.getItem(STORAGE_KEY);

    if (savedIncidents) {
      try {
        this.incidents = JSON.parse(savedIncidents);
      } catch (error) {
        console.error('Failed to load saved incidents:', error);
        this.incidents = [...INCIDENTS];
      }
    } else {
      this.incidents = [...INCIDENTS];
      this.saveToStorage();
    }

    // Initialize large-scale incident counter
    const savedTotal = localStorage.getItem(TOTAL_INCIDENTS_KEY);

    if (savedTotal === null) {
      localStorage.setItem(
        TOTAL_INCIDENTS_KEY,
        BASE_TOTAL_INCIDENTS.toString()
      );
    }

    this.listeners = new Set();
  }

  // --------------------------------------------------
  // INCIDENT STORAGE
  // --------------------------------------------------

  saveToStorage() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.incidents)
      );
    } catch (error) {
      console.error('Failed to save incidents:', error);
    }
  }

  // --------------------------------------------------
  // LARGE-SCALE INCIDENT COUNTER
  // --------------------------------------------------

  getTotalIncidents() {
    const savedTotal = localStorage.getItem(
      TOTAL_INCIDENTS_KEY
    );

    return savedTotal
      ? Number(savedTotal)
      : BASE_TOTAL_INCIDENTS;
  }

  incrementTotalIncidents() {
    const currentTotal = this.getTotalIncidents();

    const newTotal = currentTotal + 1;

    localStorage.setItem(
      TOTAL_INCIDENTS_KEY,
      newTotal.toString()
    );

    return newTotal;
  }

  // --------------------------------------------------
  // SUBSCRIPTIONS
  // --------------------------------------------------

  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --------------------------------------------------
  // GET ALL INCIDENTS
  // --------------------------------------------------

  async getAllIncidents(filters = {}) {
    let result = [...this.incidents];

    if (filters.search) {
      const q = filters.search.toLowerCase();

      result = result.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.location?.toLowerCase().includes(q) ||
          i.nlpSummary?.toLowerCase().includes(q)
      );
    }

    if (filters.type && filters.type !== 'All') {
      const types = Array.isArray(filters.type)
        ? filters.type
        : [filters.type];

      result = result.filter((i) =>
        types.includes(i.type)
      );
    }

    if (filters.status && filters.status !== 'All') {
      const statuses = Array.isArray(filters.status)
        ? filters.status
        : [filters.status];

      result = result.filter((i) =>
        statuses.includes(i.status)
      );
    }

    if (filters.severity && filters.severity !== 'All') {
      result = result.filter(
        (i) => i.severity === filters.severity
      );
    }

    if (filters.state && filters.state !== 'All') {
      result = result.filter(
        (i) => i.location?.includes(filters.state)
      );
    }

    if (filters.dateFrom) {
      result = result.filter(
        (i) =>
          new Date(i.timestamp) >=
          new Date(`${filters.dateFrom}T00:00:00`)
      );
    }

    if (filters.dateTo) {
      result = result.filter(
        (i) =>
          new Date(i.timestamp) <=
          new Date(`${filters.dateTo}T23:59:59`)
      );
    }

    return mockFetch(result);
  }

  // --------------------------------------------------
  // GET SINGLE INCIDENT
  // --------------------------------------------------

  async getIncidentById(id) {
    const item = this.incidents.find(
      (i) => i.id === id
    );

    if (!item) {
      throw new Error(`Incident ${id} not found`);
    }

    return mockFetch(item);
  }

  // --------------------------------------------------
  // CREATE INCIDENT
  // --------------------------------------------------

 async createIncident(newIncident) {
  // Match an existing incident using:
  // 1. Same event type
  // 2. Same location
  const existingIndex = this.incidents.findIndex((incident) => {
    const sameType =
      incident.type?.trim().toLowerCase() ===
      newIncident.type?.trim().toLowerCase();

    const sameLocation =
      incident.location?.trim().toLowerCase() ===
      newIncident.location?.trim().toLowerCase();

    return sameType && sameLocation;
  });

  // If the same event already exists at the same location,
  // increase its frequency instead of creating a new incident.
  if (existingIndex !== -1) {
    const existingIncident = this.incidents[existingIndex];

    const updatedIncident = {
      ...existingIncident,

      // Increase frequency
      freq: (existingIncident.freq || 1) + 1,

      // Keep the latest report time
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',

      // Keep the latest description if provided
      nlpSummary:
        newIncident.nlpSummary || existingIncident.nlpSummary,

      // Keep latest image if a new one was uploaded
      image:
        newIncident.image || existingIncident.image,

      // Keep the latest AI confidence if available
      aiConfidence:
        typeof newIncident.aiConfidence === 'number'
          ? newIncident.aiConfidence
          : existingIncident.aiConfidence,

      // Keep the incident under review
      status: existingIncident.status || 'Under Review'
    };

    this.incidents[existingIndex] = updatedIncident;

    this.saveToStorage();
    this.notify();

    return mockFetch(updatedIncident);
  }

  // No matching incident → create a new one
  const created = {
    id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString(),
    timeAgo: 'Just now',
    aiConfidence:
      typeof newIncident.aiConfidence === 'number'
        ? newIncident.aiConfidence
        : Math.floor(80 + Math.random() * 19),
    status: 'Under Review',
    freq: 1,
    upvotes: 1,
    ndrfDispatched: false,
    ...newIncident
  };

  this.incidents.unshift(created);

  this.saveToStorage();
  this.notify();

  return mockFetch(created);
}

  // --------------------------------------------------
  // UPDATE INCIDENT STATUS
  // --------------------------------------------------

  async updateIncidentStatus(id, newStatus) {
    const index = this.incidents.findIndex(
      (i) => i.id === id
    );

    if (index !== -1) {
      this.incidents[index].status = newStatus;

      this.saveToStorage();

      this.notify();

      return mockFetch(this.incidents[index]);
    }

    throw new Error(`Incident ${id} not found`);
  }
}

export const incidentService = new IncidentService();