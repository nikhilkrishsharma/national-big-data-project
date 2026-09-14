import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../common/Card';

const data = [
  { state: "Uttar Pradesh", pct: "18%", count: 224 },
  { state: "Maharashtra", pct: "16%", count: 199 },
  { state: "Bihar", pct: "12%", count: 150 },
  { state: "Tamil Nadu", pct: "10%", count: 124 },
  { state: "Rajasthan", pct: "8%", count: 98 },
  { state: "West Bengal", pct: "7%", count: 87 },
  { state: "Gujarat", pct: "6%", count: 74 },
  { state: "Others", pct: "23%", count: 202 }
];

export const StateActivity = () => {
  return (
    <Card title="State-wise Activity">
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis dataKey="state" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#60a5fa'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
