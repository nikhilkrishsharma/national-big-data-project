// Simulated Real-Time WebSocket client for push notifications

class MockWebSocketClient {
  constructor() {
    this.listeners = new Map();
    this.isConnected = false;
    this.timer = null;
    this.mockFeedEvents = [
      {
        id: "INC-LIVE-901",
        title: "Flash Flood Warning Issued for South Wayanad",
        type: "Flash Flood",
        location: "Wayanad, Kerala",
        lat: 11.61,
        lng: 76.14,
        severity: "Critical",
        status: "Verified",
        aiConfidence: 99,
        source: "IMD Doppler Radar",
        timeAgo: "Just now",
        rainfallIntensity: "195 mm/hr",
        nlpSummary: "Satellite radar echo shows intense convective cell over Meppadi basin.",
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "INC-LIVE-902",
        title: "Landslide Blockage on Mandi-Kullu Highway",
        type: "Landslide",
        location: "Mandi, Himachal Pradesh",
        lat: 31.7084,
        lng: 76.932,
        severity: "High",
        status: "Verified",
        aiConfidence: 96,
        source: "Citizen Report",
        timeAgo: "Just now",
        rainfallIntensity: "140 mm/hr",
        nlpSummary: "Boulders blocked NH-21. Traffic diverted via Kataula route.",
        image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "INC-LIVE-903",
        title: "Water Inundation Alert at Eastern Express Highway",
        type: "Flash Flood",
        location: "Thane, Maharashtra",
        lat: 19.2183,
        lng: 72.9781,
        severity: "Moderate",
        status: "Under Review",
        aiConfidence: 84,
        source: "Twitter / X",
        timeAgo: "Just now",
        rainfallIntensity: "105 mm/hr",
        nlpSummary: "Multiple social posts flag knee-deep water accumulation near Teen Hath Naka.",
        image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80"
      }
    ];
  }

  connect() {
    this.isConnected = true;
    this._emit('connection_status', { connected: true });

    // Start emitting live event pulses every 6 seconds
    let eventIndex = 0;
    this.timer = setInterval(() => {
      if (this.isConnected) {
        const liveEvent = this.mockFeedEvents[eventIndex % this.mockFeedEvents.length];
        eventIndex++;
        const eventWithTimestamp = {
          ...liveEvent,
          id: `INC-LIVE-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: new Date().toISOString()
        };
        this._emit('incident_received', eventWithTimestamp);
      }
    }, 6000);
  }

  disconnect() {
    this.isConnected = false;
    if (this.timer) clearInterval(this.timer);
    this._emit('connection_status', { connected: false });
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  off(eventName, callback) {
    if (!this.listeners.has(eventName)) return;
    const callbacks = this.listeners.get(eventName).filter(cb => cb !== callback);
    this.listeners.set(eventName, callbacks);
  }

  _emit(eventName, data) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach(callback => callback(data));
    }
  }
}

export const socketClient = new MockWebSocketClient();
