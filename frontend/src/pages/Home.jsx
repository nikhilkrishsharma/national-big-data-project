import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  FileEdit, 
  CloudRain, 
  Waves, 
  RotateCw, 
  Sun, 
  AlertTriangle, 
  Radio, 
  Brain, 
  MapPin, 
  Bell, 
  BarChart3, 
  Users, 
  Cloud, 
  CloudLightning, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const Home = () => {
  const navigate = useNavigate();

  const overviewItems = [
    { label: "Heavy Rain", value: "17", sub: "States", icon: CloudRain, color: "text-blue-600 bg-blue-50" },
    { label: "Flood Alerts", value: "42", sub: "Districts", icon: Waves, color: "text-sky-600 bg-sky-50" },
    { label: "Cyclone", value: "2", sub: "Active", icon: RotateCw, color: "text-purple-600 bg-purple-50" },
    { label: "Heatwave", value: "5", sub: "Regions", icon: Sun, color: "text-amber-600 bg-amber-50" },
    { label: "Active Incidents", value: "138", sub: "Total", icon: AlertTriangle, color: "text-rose-600 bg-rose-50" },
  ];

  const features = [
    {
      title: "Multi-Source Data",
      description: "Collecting data from IMD, APIs, social media, news, satellites and citizen reports.",
      icon: Radio,
      bgColor: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "AI-Powered Analysis",
      description: "Advanced AI models detect events, predict impacts and generate accurate insights.",
      icon: Brain,
      bgColor: "bg-purple-50 text-purple-600"
    },
    {
      title: "Interactive GIS Maps",
      description: "Explore real-time weather conditions with interactive maps and layers.",
      icon: MapPin,
      bgColor: "bg-blue-50 text-blue-600"
    },
    {
      title: "Real-Time Alerts",
      description: "Instant alerts and notifications for severe weather and disaster events.",
      icon: Bell,
      bgColor: "bg-orange-50 text-orange-600"
    },
    {
      title: "Analytics & Reports",
      description: "In-depth analytics, trends and reports for data-driven decision making.",
      icon: BarChart3,
      bgColor: "bg-cyan-50 text-cyan-600"
    },
    {
      title: "Citizen Participation",
      description: "Empower citizens to report incidents and contribute to weather intelligence.",
      icon: Users,
      bgColor: "bg-rose-50 text-rose-600"
    }
  ];

  const weatherSnapshot = [
    { city: "Delhi", temp: "28°C", condition: "Light Rain", humidity: "72%", icon: CloudRain },
    { city: "Mumbai", temp: "29°C", condition: "Cloudy", humidity: "78%", icon: Cloud },
    { city: "Kolkata", temp: "27°C", condition: "Moderate Rain", humidity: "83%", icon: CloudRain },
    { city: "Chennai", temp: "31°C", condition: "Partly Cloudy", humidity: "65%", icon: Sun },
    { city: "Guwahati", temp: "26°C", condition: "Heavy Rain", humidity: "87%", icon: CloudLightning }
  ];

  const recentAlerts = [
    { title: "Heavy Rain Alert", location: "Kanpur, Uttar Pradesh", time: "10:45 AM", type: "alert", icon: AlertTriangle, color: "text-rose-500 bg-rose-50" },
    { title: "Flood Warning", location: "Cachar, Assam", time: "10:30 AM", type: "warning", icon: Waves, color: "text-amber-500 bg-amber-50" },
    { title: "Cyclone Watch", location: "Puri, Odisha", time: "09:50 AM", type: "watch", icon: RotateCw, color: "text-purple-500 bg-purple-50" }
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Top Hero Section matching Image 1 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        {/* Hero Left Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
            <span>AI Powered • Real Time • Reliable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
            National Weather <br />
            <span className="text-blue-600">Intelligence</span> Platform
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-xl font-medium">
            Real-time data from multiple sources, AI-powered analytics and interactive maps for accurate weather intelligence and early alerts.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/live-map')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Explore Live Map</span>
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl shadow-sm transition-all"
            >
              <FileEdit className="w-4 h-4 text-slate-600" />
              <span>Report an Incident</span>
            </button>
          </div>
        </div>

        {/* Hero Center Vector India Map Graphic */}
        <div className="lg:col-span-3 flex justify-center relative">
          <div className="relative w-full max-w-sm aspect-square bg-gradient-to-b from-blue-50/80 to-sky-100/50 rounded-3xl p-6 border border-blue-100/80 shadow-sm flex items-center justify-center">
            
            {/* SVG India Map Silhouette */}
            <svg viewBox="0 0 200 220" className="w-full h-full opacity-60 text-blue-400 fill-current">
              <path d="M100,10 C110,20 130,25 140,40 C150,55 160,70 155,90 C150,110 170,120 160,140 C150,160 130,170 110,200 C95,205 90,190 80,180 C70,170 50,150 45,130 C40,110 50,90 60,70 C70,50 85,30 100,10 Z" />
            </svg>

            {/* Circular Marker Badges on Map */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <CloudRain className="w-4 h-4" />
            </div>

            <div className="absolute top-1/4 left-1/3 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sun className="w-4 h-4" />
            </div>

            <div className="absolute top-1/3 right-8 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>

            <div className="absolute top-1/2 left-8 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CloudRain className="w-4 h-4" />
            </div>

            <div className="absolute bottom-1/3 right-1/3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Waves className="w-4 h-4" />
            </div>

            <div className="absolute bottom-12 left-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
              <CloudRain className="w-4 h-4" />
            </div>

            <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-lg">
              <Sun className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Hero Right Widget "Today's Overview" */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Today's Overview
            </h3>

            <div className="space-y-3">
              {overviewItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 font-mono">{item.value}</span>
                      <span className="text-[10px] text-slate-400 block -mt-1 font-medium">{item.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* 6 Feature Highlight Cards Section */}
      <section className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3 hover:border-blue-300 hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Row: Live Weather Snapshot + Recent Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        
        {/* Left Column: Live Weather Snapshot */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Live Weather Snapshot</h3>
            <button onClick={() => navigate('/live-map')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {weatherSnapshot.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.city} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-2 text-center">
                  <h5 className="text-xs font-bold text-slate-800">{item.city}</h5>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono">{item.temp}</div>
                  <p className="text-[11px] text-slate-500 font-medium">{item.condition}</p>
                  <p className="text-[10px] text-blue-600 font-medium pt-1 border-t border-slate-100">
                    💧 Humidity: {item.humidity}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Alerts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Recent Alerts</h3>
            <button onClick={() => navigate('/live-map')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm divide-y divide-slate-100">
            {recentAlerts.map((alertItem, idx) => {
              const Icon = alertItem.icon;
              return (
                <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${alertItem.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{alertItem.title}</h5>
                      <span className="text-[11px] text-slate-500 font-medium">{alertItem.location}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">{alertItem.time}</span>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
};
