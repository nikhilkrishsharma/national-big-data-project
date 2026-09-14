import React from 'react';
import { EventTrendChart } from '../components/analytics/EventTrendChart';
import { EventDistribution } from '../components/analytics/EventDistribution';
import { StateActivity } from '../components/analytics/StateActivity';
import { Card } from '../components/common/Card';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  PieChart as PieIcon, 
  CloudRain, 
  Waves, 
  Sun, 
  RotateCw 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const Analytics = () => {
  const verificationData = [
    { name: "Verified", value: 72, color: "#10b981" },
    { name: "Under Review", value: 18, color: "#f59e0b" },
    { name: "Unverified", value: 10, color: "#ef4444" }
  ];

  const sourceData = [
    { name: "Social Media", pct: "62%" },
    { name: "News", pct: "18%" },
    { name: "APIs", pct: "12%" },
    { name: "Citizen Reports", pct: "8%" }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header matching Image 2 (Middle) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Analytics</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time insights and trends from weather data</p>
        </div>

        <div className="flex items-center gap-3">
          <select className="bg-white text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-xl border border-slate-300 shadow-sm focus:outline-none">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="monsoon">Monsoon Season</option>
          </select>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards matching Image 2 (Middle) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Verified Reports */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Verified Reports</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">1,248</div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>12%</span>
            <span className="text-[11px] text-slate-400 font-medium ml-1">vs. previous 7 days</span>
          </div>
        </div>

        {/* KPI 2: Active Incidents */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Incidents</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">186</div>
          <div className="flex items-center gap-1 text-xs font-bold text-rose-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>8%</span>
            <span className="text-[11px] text-slate-400 font-medium ml-1">vs. previous 7 days</span>
          </div>
        </div>

        {/* KPI 3: Source Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Source Distribution</span>
            <PieIcon className="w-4 h-4 text-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-700 pt-1">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="text-slate-500">{s.name}</span>
                <span className="font-bold text-slate-900 font-mono">{s.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KPI 4: Avg. AI Confidence */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Avg. AI Confidence</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">0.87</div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>6%</span>
            <span className="text-[11px] text-slate-400 font-medium ml-1">vs. previous 7 days</span>
          </div>
        </div>

      </div>

      {/* Row 2: Incidents Over Time + Event Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <EventTrendChart />
        </div>
        <div className="lg:col-span-5">
          <EventDistribution />
        </div>
      </div>

      {/* Row 3: State-wise Activity + Verification Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <StateActivity />
        </div>

        <div className="lg:col-span-5">
          <Card title="Verification Outcomes">
            <div className="h-64 w-full relative flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-slate-900 font-mono">1,248</span>
                <span className="text-[10px] font-semibold text-slate-400">Total Reports</span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={verificationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {verificationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 pt-2 border-t border-slate-100 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Verified 72%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Under Review 18%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Unverified 10%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 4: Trend Analysis Cards Grid matching reference */}
      <Card title="Trend Analysis">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
              <CloudRain className="w-4 h-4" />
              <span>Heavy Rain</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
              Incidents increased by 45% compared to last week.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
              <Waves className="w-4 h-4" />
              <span>Flood Alerts</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
              Highest activity in Uttar Pradesh & Bihar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
              <Sun className="w-4 h-4" />
              <span>Heatwave</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
              Rising trend in central and western regions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
              <RotateCw className="w-4 h-4" />
              <span>Cyclone</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1">
              No new cyclone activity in the last 7 days.
            </p>
          </div>

        </div>
      </Card>

    </div>
  );
};
