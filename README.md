# National Weather Intelligence Platform Frontend

A state-of-the-art, pixel-perfect web application built with **React**, **Vite**, **Leaflet GIS**, **Recharts**, and modern CSS glassmorphism styling for live weather disaster tracking, NLP verification, and emergency response management across India.

## Features

- **Interactive GIS Map (`/live-map`)**: Real-time Leaflet map featuring pulse markers, heatmap layer toggles, incident popups, map layer controls, and real-time live ticker.
- **Analytics Command Dashboard (`/analytics`)**: Recharts powered line trends, event distribution donut chart, state activity rankings, and AI verification accuracy metrics.
- **Incident Verification Portal (`/reports`)**: Searchable data table with status filtering (Verified, Under Review, Unverified), AI confidence badges, CSV export, and side inspector drawer.
- **Real-Time WebSocket Simulation (`useWebSocket`)**: Simulated live pushes every 4 seconds with active event audio/visual alerts.
- **Home Landing Hero (`/`)**: National overview map, weather snapshot for major Indian metropolises, operational stats, and severe alerts ticker.

## Setup & Running

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```
