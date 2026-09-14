import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../common/Card';

const data = [
  { name: "Heavy Rain", value: 42, color: "#3b82f6" },
  { name: "Flood", value: 24, color: "#06b6d4" },
  { name: "Cyclone", value: 12, color: "#a855f7" },
  { name: "Heatwave", value: 8, color: "#f59e0b" },
  { name: "Others", value: 14, color: "#94a3b8" }
];

export const EventDistribution = () => {
  return (
    <Card title="Event Distribution">
      <div className="h-64 w-full relative flex items-center justify-center">
        {/* Center label matching reference screenshot */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-semibold text-slate-400">Total Incidents</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">1,248</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
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

      {/* Legend list matching reference image */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span>{item.name}</span>
            </div>
            <span className="font-bold text-slate-900 font-mono">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
