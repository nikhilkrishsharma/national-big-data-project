import React from 'react';

import { EventTrendChart } from '../components/analytics/EventTrendChart';
import { EventDistribution } from '../components/analytics/EventDistribution';
import { StateActivity } from '../components/analytics/StateActivity';
import { Card } from '../components/common/Card';
import { useAnalytics } from '../hooks/useAnalytics';

import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  PieChart as PieIcon
} from 'lucide-react';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export const Analytics = () => {
  const {
    analytics,
    loading,
    error
  } = useAnalytics();

  // ---------------------------------------------
  // LOADING
  // ---------------------------------------------

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading analytics...
      </div>
    );
  }

  // ---------------------------------------------
  // ERROR
  // ---------------------------------------------

  if (error) {
    return (
      <div className="p-6 text-sm text-red-500">
        Failed to load analytics: {error}
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  // ---------------------------------------------
  // VERIFICATION DATA
  // ---------------------------------------------

  const verificationData = [
    {
      name: 'Verified',
      value: analytics.verified,
      color: '#10b981'
    },
    {
      name: 'Under Review',
      value: analytics.underReview,
      color: '#f59e0b'
    },
    {
      name: 'Unverified',
      value: analytics.unverified,
      color: '#ef4444'
    }
  ];

  // ---------------------------------------------
  // SOURCE DATA
  // ---------------------------------------------

  const sourceData =
    analytics.sourceDistribution.map(
      (source) => ({
        name: source.name,
        pct: `${source.percentage}%`
      })
    );

  // ---------------------------------------------
  // ACTUAL CURRENT INCIDENT RECORDS
  // ---------------------------------------------

  const activeIncidents =
    analytics.verified +
    analytics.underReview +
    analytics.unverified;

  // ---------------------------------------------
  // VERIFICATION PERCENTAGES
  // ---------------------------------------------

  const verifiedPercentage =
    activeIncidents > 0
      ? Math.round(
          (analytics.verified / activeIncidents) * 100
        )
      : 0;

  const underReviewPercentage =
    activeIncidents > 0
      ? Math.round(
          (analytics.underReview / activeIncidents) * 100
        )
      : 0;

  const unverifiedPercentage =
    activeIncidents > 0
      ? Math.round(
          (analytics.unverified / activeIncidents) * 100
        )
      : 0;

  return (
    <div className="space-y-6 pb-12">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="text-sm text-slate-500">
            Real-time insights and trends from weather data
          </p>
        </div>

        <div className="flex items-center gap-3">

          <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>

          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-600">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            Live

          </div>

        </div>

      </div>

      {/* =========================================
          KPI CARDS
      ========================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* VERIFIED REPORTS */}

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Verified Reports
            </span>

            <CheckCircle2 className="h-5 w-5 text-blue-600" />

          </div>

          <div className="mt-4 text-3xl font-bold text-slate-900">
            {analytics.verified}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">

            <ArrowUpRight className="h-4 w-4 text-emerald-500" />

            <span className="text-emerald-500">
              Live
            </span>

            <span className="text-slate-400">
              from current incidents
            </span>

          </div>

        </Card>

        {/* ACTIVE INCIDENTS */}

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Active Incidents
            </span>

            <AlertTriangle className="h-5 w-5 text-red-500" />

          </div>

          <div className="mt-4 text-3xl font-bold text-slate-900">
            {activeIncidents}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">

            <ArrowUpRight className="h-4 w-4 text-red-500" />

            <span className="text-red-500">
              Live
            </span>

            <span className="text-slate-400">
              current incident records
            </span>

          </div>

        </Card>

        {/* SOURCE DISTRIBUTION */}

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Source Distribution
            </span>

            <PieIcon className="h-5 w-5 text-cyan-500" />

          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">

            {sourceData.map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-between gap-2 text-sm"
              >

                <span className="truncate text-slate-600">
                  {source.name}
                </span>

                <span className="font-semibold text-slate-900">
                  {source.pct}
                </span>

              </div>
            ))}

          </div>

        </Card>

        {/* AVG AI CONFIDENCE */}

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Avg. AI Confidence
            </span>

            <ShieldCheck className="h-5 w-5 text-emerald-500" />

          </div>

          <div className="mt-4 text-3xl font-bold text-slate-900">
            {analytics.avgConfidence.toFixed(2)}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">

            <ArrowUpRight className="h-4 w-4 text-emerald-500" />

            <span className="text-emerald-500">
              Live
            </span>

            <span className="text-slate-400">
              calculated from incidents
            </span>

          </div>

        </Card>

      </div>

      {/* =========================================
          INCIDENTS OVER TIME + EVENT DISTRIBUTION
          ORIGINAL STRUCTURE
      ========================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">

        {/* INCIDENTS OVER TIME */}

        <div className="xl:col-span-3">

          <EventTrendChart />

        </div>

        {/* EVENT DISTRIBUTION */}

        <div className="xl:col-span-2">

          <EventDistribution
            totalIncidents={
              analytics.totalIncidents
            }
          />

        </div>

      </div>

      {/* =========================================
          STATE-WISE ACTIVITY + VERIFICATION OUTCOMES
          ORIGINAL STRUCTURE
      ========================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">

        {/* STATE-WISE ACTIVITY */}

        <div className="xl:col-span-3">

          <StateActivity />

        </div>

        {/* VERIFICATION OUTCOMES */}

        <Card className="xl:col-span-2 p-6">

          <div className="mb-4">

            <h2 className="text-lg font-semibold text-slate-900">
              Verification Outcomes
            </h2>

            <p className="text-sm text-slate-500">
              Current verification breakdown
            </p>

          </div>

          <div className="border-t border-slate-100 pt-4">

            {/* DONUT */}

            <div className="relative h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={verificationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                  >

                    {verificationData.map(
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

              {/* CENTER */}

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-2xl font-bold text-slate-900">
                  {activeIncidents.toLocaleString()}
                </span>

                <span className="text-sm text-slate-400">
                  Total Reports
                </span>

              </div>

            </div>

          </div>

          {/* VERIFICATION LEGEND */}

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">

            {/* VERIFIED */}

            <div className="text-center">

              <div className="flex items-center justify-center gap-2">

                <span className="h-3 w-3 rounded-full bg-emerald-500" />

                <span className="text-sm font-medium text-slate-900">
                  Verified
                </span>

              </div>

              <p className="mt-1 text-sm font-semibold text-emerald-500">
                {verifiedPercentage}%
              </p>

            </div>

            {/* UNDER REVIEW */}

            <div className="text-center">

              <div className="flex items-center justify-center gap-2">

                <span className="h-3 w-3 rounded-full bg-amber-500" />

                <span className="text-sm font-medium text-slate-900">
                  Under Review
                </span>

              </div>

              <p className="mt-1 text-sm font-semibold text-amber-500">
                {underReviewPercentage}%
              </p>

            </div>

            {/* UNVERIFIED */}

            <div className="text-center">

              <div className="flex items-center justify-center gap-2">

                <span className="h-3 w-3 rounded-full bg-red-500" />

                <span className="text-sm font-medium text-slate-900">
                  Unverified
                </span>

              </div>

              <p className="mt-1 text-sm font-semibold text-red-500">
                {unverifiedPercentage}%
              </p>

            </div>

          </div>

        </Card>

      </div>

    </div>
  );
};