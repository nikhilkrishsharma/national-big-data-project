import React from 'react';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import { Card } from '../common/Card';

const EVENT_DATA = [
  {
    name: 'Heavy Rain',
    value: 42,
    color: '#3b82f6'
  },
  {
    name: 'Flood',
    value: 24,
    color: '#06b6d4'
  },
  {
    name: 'Cyclone',
    value: 12,
    color: '#a855f7'
  },
  {
    name: 'Heatwave',
    value: 8,
    color: '#f59e0b'
  },
  {
    name: 'Thunderstorm',
    value: 7,
    color: '#94a3b8'
  },
  {
    name: 'Other',
    value: 7,
    color: '#64748b'
  }
];

export const EventDistribution = ({
  totalIncidents = 1248
}) => {
  return (
    <Card className="h-full p-6">

      {/* HEADER */}

      <div className="mb-4">

        <h2 className="text-lg font-semibold text-slate-900">
          Event Distribution
        </h2>

      </div>

      <div className="border-t border-slate-100 pt-5">

        {/* DONUT */}

        <div className="relative h-[300px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={EVENT_DATA}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={100}
                paddingAngle={3}
              >

                {EVENT_DATA.map(
                  (entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

          {/* CENTER TEXT */}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-sm text-slate-400">
              Total Incidents
            </span>

            <span className="mt-1 text-2xl font-bold text-slate-900">
              {totalIncidents.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      {/* LEGEND */}

      <div className="mt-4 border-t border-slate-100 pt-4">

        <div className="grid grid-cols-2 gap-x-6 gap-y-3">

          {EVENT_DATA.map((event) => (
            <div
              key={event.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-2">

                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      event.color
                  }}
                />

                <span className="text-sm text-slate-600">
                  {event.name}
                </span>

              </div>

              <span className="text-sm font-semibold text-slate-900">
                {event.value}%
              </span>

            </div>
          ))}

        </div>

      </div>

    </Card>
  );
};