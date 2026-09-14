import React, { useState } from 'react';
import { Search, Download, Plus, Filter, MessageSquare, Repeat, Heart, Eye, X } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reportRows = [
    { id: "1", datetime: "Apr 30, 2025 • 10:42 AM", location: "Jaipur, Rajasthan", event: "Heavy Rain", source: "X (Twitter)", confidence: "0.92", status: "Verified", freq: 12, severity: "High", handle: "@weather_updates", text: "Heavy rain continues in Jaipur since morning. Roads are waterlogged and traffic is moving slow. #Jaipur #Rain #Weather", img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80" },
    { id: "2", datetime: "Apr 30, 2025 • 10:38 AM", location: "Patna, Bihar", event: "Flood Alert", source: "News", confidence: "0.88", status: "Under Review", freq: 8, severity: "High", handle: "@bihar_news", text: "Water level rising rapidly in Punpun river near Patna.", img: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80" },
    { id: "3", datetime: "Apr 30, 2025 • 10:32 AM", location: "Mumbai, Maharashtra", event: "Heavy Rain", source: "X (Twitter)", confidence: "0.84", status: "Verified", freq: 15, severity: "Medium", handle: "@mumbai_rains", text: "Severe waterlogging at Dadar TT circle after 2 hours of heavy downpour.", img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80" },
    { id: "4", datetime: "Apr 30, 2025 • 10:25 AM", location: "Visakhapatnam, Andhra Pradesh", event: "Cyclone", source: "APIs", confidence: "0.76", status: "Under Review", freq: 6, severity: "High", handle: "@vizag_alert", text: "High waves observed near RK beach with gale winds.", img: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=600&q=80" },
    { id: "5", datetime: "Apr 30, 2025 • 10:18 AM", location: "Nagpur, Maharashtra", event: "Heatwave", source: "X (Twitter)", confidence: "0.81", status: "Verified", freq: 10, severity: "Medium", handle: "@nagpur_today", text: "Temperature reaches 44.5°C in Nagpur today.", img: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=600&q=80" },
    { id: "6", datetime: "Apr 30, 2025 • 10:12 AM", location: "Kolkata, West Bengal", event: "Flood Alert", source: "News", confidence: "0.63", status: "Unverified", freq: 4, severity: "High", handle: "@kolkata_feed", text: "Unverified post claiming waterlogging near Howrah station.", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80" },
    { id: "7", datetime: "Apr 30, 2025 • 10:05 AM", location: "Chennai, Tamil Nadu", event: "Heavy Rain", source: "X (Twitter)", confidence: "0.87", status: "Verified", freq: 11, severity: "Medium", handle: "@chennai_weather", text: "Continuous thunderstorms reported over Velachery.", img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80" },
    { id: "8", datetime: "Apr 30, 2025 • 09:56 AM", location: "Guwahati, Assam", event: "Active Incident", source: "Citizen Report", confidence: "0.94", status: "Verified", freq: 7, severity: "High", handle: "@assam_citizen", text: "Landslip reported along Zoo Road corridor.", img: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80" },
    { id: "9", datetime: "Apr 30, 2025 • 09:45 AM", location: "Ranchi, Jharkhand", event: "Heavy Rain", source: "X (Twitter)", confidence: "0.82", status: "Under Review", freq: 5, severity: "Medium", handle: "@ranchi_live", text: "Heavy lightning and rains across Kanke road.", img: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80" },
    { id: "10", datetime: "Apr 30, 2025 • 09:32 AM", location: "Bengaluru, Karnataka", event: "Rain Alert", source: "News", confidence: "0.78", status: "Verified", freq: 3, severity: "Low", handle: "@blr_traffic", text: "Light rain causing slow movement near Silk Board.", img: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80" }
  ];

  const activeReport = selectedReport || reportRows[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header matching Image 2 (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports</h1>
          <p className="text-xs text-slate-500 font-medium">View, search and manage weather incident reports</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-sm flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Top Filter Toolbar matching Image 2 (Right) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by location, event, source, etc..."
              className="w-full bg-slate-50 text-xs font-medium text-slate-900 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-1.5 border border-blue-200">
            <Filter className="w-3.5 h-3.5" />
            <span>Advanced Filters</span>
          </button>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-semibold text-slate-700 pt-1">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">Event Type</span>
            <select className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold">
              <option>All Events</option>
              <option>Heavy Rain</option>
              <option>Flood Alert</option>
              <option>Cyclone</option>
              <option>Heatwave</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">State</span>
            <select className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold">
              <option>All States</option>
              <option>Rajasthan</option>
              <option>Bihar</option>
              <option>Maharashtra</option>
              <option>Tamil Nadu</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">Date Range</span>
            <select className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">Verification Status</span>
            <select className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold">
              <option>All</option>
              <option>Verified</option>
              <option>Under Review</option>
              <option>Unverified</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-1">Source</span>
            <select className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold">
              <option>All</option>
              <option>X (Twitter)</option>
              <option>News</option>
              <option>APIs</option>
              <option>Citizen Report</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table matching Image 2 (Right) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                </th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Location</th>
                <th className="p-3">Event</th>
                <th className="p-3">Source</th>
                <th className="p-3">AI Confidence</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Freq</th>
                <th className="p-3">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {reportRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedReport(row)}
                  className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                    activeReport.id === row.id ? 'bg-blue-50/80 font-semibold' : ''
                  }`}
                >
                  <td className="p-3 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                  </td>
                  <td className="p-3 whitespace-nowrap text-slate-500 font-mono text-[11px]">{row.datetime}</td>
                  <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{row.location}</td>
                  <td className="p-3 font-semibold text-slate-800">{row.event}</td>
                  <td className="p-3 text-slate-500">{row.source}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">{row.confidence}</td>
                  <td className="p-3 whitespace-nowrap">
                    <Badge status={row.status} size="sm" />
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-slate-700">{row.freq}</td>
                  <td className="p-3 font-bold whitespace-nowrap">
                    <span className={
                      row.severity === 'High' ? 'text-rose-600' : row.severity === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                    }>
                      {row.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div>Showing 1-10 of 1,248 reports</div>
          <div className="flex items-center gap-1 font-semibold">
            <button className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-600">&lt;</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-600">2</button>
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-600">3</button>
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-600">4</button>
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-600">5</button>
            <span>...</span>
            <button className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-600">125</button>
            <button className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-600">&gt;</button>
          </div>
        </div>
      </div>

      {/* Bottom Section Inspector Drawer / Split Card matching Image 2 (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Left: Social Post Preview Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                X
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900">{activeReport.handle}</span>
                <span className="text-[11px] text-slate-400 block font-mono">{activeReport.datetime}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {activeReport.text}
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video">
            <img src={activeReport.img} alt="Ground preview" className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-semibold pt-1">
            <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> 124</span>
            <span className="flex items-center gap-1.5"><Repeat className="w-4 h-4" /> 302</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500" /> 1.2K</span>
          </div>
        </div>

        {/* Right: Incident Details Summary */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900">Incident Details</h3>
            <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Location</span>
              <span className="font-bold text-slate-900">{activeReport.location}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Event Type</span>
              <span className="font-bold text-slate-900">{activeReport.event}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Source</span>
              <span className="font-bold text-slate-900">{activeReport.source}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">AI Confidence</span>
              <span className="font-mono font-bold text-blue-600">{activeReport.confidence}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Verification Status</span>
              <Badge status={activeReport.status} size="sm" />
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Frequency</span>
              <span className="font-mono font-bold text-slate-900">{activeReport.freq}</span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 font-semibold">Severity</span>
              <span className={`font-bold ${activeReport.severity === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>
                {activeReport.severity}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
