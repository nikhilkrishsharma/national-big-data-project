import React, { useMemo, useState } from 'react';
import {
  Search,
  Download,
  Plus,
  Filter,
  MessageSquare,
  Repeat,
  Heart,
  X
} from 'lucide-react';

import { Badge } from '../components/common/Badge';
import { useIncidents } from '../hooks/useIncidents';

export const Reports = () => {
  const {
    incidents,
    loading,
    error
  } = useIncidents();

  const [selectedReportId, setSelectedReportId] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    event: 'All Events',
    state: 'All States',
    dateRange: 'Last 7 Days',
    status: 'All',
    source: 'All'
  });

  // ============================================================
  // HELPERS
  // ============================================================

  const formatDateTime = (timestamp) => {
    if (!timestamp) return '—';

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return '—';
    }

    return date.toLocaleString('en-IN', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', ' •');
  };

  const normalizeConfidence = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return '—';
    }

    // Backend/mock incidents currently use values like 98,
    // while the Reports UI displays values like 0.92.
    const normalized =
      numericValue > 1
        ? numericValue / 100
        : numericValue;

    return normalized.toFixed(2);
  };

  const getFrequency = (incident) => {
    if (incident.freq !== undefined) {
      return incident.freq;
    }

    if (incident.frq !== undefined) {
      return incident.frq;
    }

    return 1;
  };

  const normalizeSource = (source) => {
    if (!source) return 'Unknown';

    if (
      source === 'Twitter' ||
      source === 'X'
    ) {
      return 'X (Twitter)';
    }

    if (source === 'Citizen Portal') {
      return 'Citizen Report';
    }

    return source;
  };

  const getStateFromLocation = (location = '') => {
    const parts = location.split(',');

    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }

    return '';
  };

  const getEventName = (incident) => {
    return (
      incident.type ||
      incident.event ||
      'Unknown Event'
    );
  };

  const getReportText = (incident) => {
    return (
      incident.text ||
      incident.nlpSummary ||
      incident.description ||
      'No report description available.'
    );
  };

  const getHandle = (incident) => {
    if (incident.handle) {
      return incident.handle;
    }

    if (incident.source === 'Citizen Report') {
      return '@citizen_report';
    }

    if (incident.source === 'Citizen Portal') {
      return '@citizen_report';
    }

    return '@weather_source';
  };

  // ============================================================
  // CONVERT INCIDENT DATA → REPORT ROW
  // ============================================================

  const reportRows = useMemo(() => {
    return incidents.map((incident) => ({
      id: incident.id,

      datetime: formatDateTime(
        incident.timestamp
      ),

      timestamp: incident.timestamp,

      location:
        incident.location ||
        'Unknown Location',

      event: getEventName(incident),

      source: normalizeSource(
        incident.source
      ),

      confidence: normalizeConfidence(
        incident.aiConfidence
      ),

      status:
        incident.status ||
        'Under Review',

      freq: getFrequency(incident),

      severity:
        incident.severity ||
        'Moderate',

      handle: getHandle(incident),

      text: getReportText(incident),

      // Image work is intentionally kept deferred.
      img:
        incident.img ||
        incident.image ||
        null
    }));
  }, [incidents]);

  // ============================================================
  // DYNAMIC FILTER OPTIONS
  // ============================================================

  const eventOptions = useMemo(() => {
    const events = [
      ...new Set(
        reportRows
          .map((row) => row.event)
          .filter(Boolean)
      )
    ];

    return events;
  }, [reportRows]);

  const stateOptions = useMemo(() => {
    const states = [
      ...new Set(
        reportRows
          .map((row) =>
            getStateFromLocation(row.location)
          )
          .filter(Boolean)
      )
    ];

    return states;
  }, [reportRows]);

  const sourceOptions = useMemo(() => {
    const sources = [
      ...new Set(
        reportRows
          .map((row) => row.source)
          .filter(Boolean)
      )
    ];

    return sources;
  }, [reportRows]);

  // ============================================================
  // FILTER REPORTS
  // ============================================================

  const filteredReports = useMemo(() => {
    const query =
      filters.search.trim().toLowerCase();

    const now = new Date();

    let rangeDays = null;

    if (filters.dateRange === 'Last 7 Days') {
      rangeDays = 7;
    }

    if (filters.dateRange === 'Last 30 Days') {
      rangeDays = 30;
    }

    return reportRows.filter((row) => {
      // ------------------------------------------
      // SEARCH
      // ------------------------------------------

      const searchableValues = [
        row.location,
        row.event,
        row.source,
        row.text,
        row.handle
      ];

      const matchesSearch =
        !query ||
        searchableValues.some(
          (value) =>
            String(value)
              .toLowerCase()
              .includes(query)
        );

      // ------------------------------------------
      // EVENT
      // ------------------------------------------

      const matchesEvent =
        filters.event === 'All Events' ||
        row.event === filters.event;

      // ------------------------------------------
      // STATE
      // ------------------------------------------

      const rowState =
        getStateFromLocation(row.location);

      const matchesState =
        filters.state === 'All States' ||
        rowState === filters.state;

      // ------------------------------------------
      // STATUS
      // ------------------------------------------

      const matchesStatus =
        filters.status === 'All' ||
        row.status === filters.status;

      // ------------------------------------------
      // SOURCE
      // ------------------------------------------

      const matchesSource =
        filters.source === 'All' ||
        row.source === filters.source;

      // ------------------------------------------
      // DATE RANGE
      // ------------------------------------------

      let matchesDate = true;

      if (rangeDays) {
        const reportDate = new Date(
          row.timestamp
        );

        if (!Number.isNaN(reportDate.getTime())) {
          const difference =
            now.getTime() -
            reportDate.getTime();

          const differenceInDays =
            difference /
            (1000 * 60 * 60 * 24);

          matchesDate =
            differenceInDays <= rangeDays;
        }
      }

      return (
        matchesSearch &&
        matchesEvent &&
        matchesState &&
        matchesStatus &&
        matchesSource &&
        matchesDate
      );
    });
  }, [reportRows, filters]);

  // ============================================================
  // ACTIVE REPORT
  // ============================================================

  const activeReport =
    filteredReports.find(
      (report) =>
        report.id === selectedReportId
    ) || filteredReports[0];

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading reports...
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="p-6 text-sm text-red-500">
        Failed to load reports: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reports
          </h1>

          <p className="text-xs text-slate-500 font-medium">
            View, search and manage weather incident reports
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            className="
              px-4 py-2
              text-xs font-semibold
              text-slate-700
              bg-white
              border border-slate-300
              hover:bg-slate-50
              rounded-xl
              shadow-sm
              flex items-center gap-1.5
            "
          >
            <Download className="w-3.5 h-3.5" />

            <span>
              Export
            </span>
          </button>

          <button
            className="
              px-5 py-2
              text-xs font-semibold
              text-white
              bg-blue-600
              hover:bg-blue-700
              rounded-xl
              shadow-md
              shadow-blue-500/20
              flex items-center gap-1.5
            "
          >
            <Plus className="w-3.5 h-3.5" />

            <span>
              Generate Report
            </span>
          </button>

        </div>
      </div>

      {/* ======================================================
          FILTER TOOLBAR
      ====================================================== */}

      <div className="
        bg-white
        rounded-2xl
        p-4
        border border-slate-200
        shadow-sm
        space-y-3
      ">

        <div className="
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
        ">

          {/* SEARCH */}

          <div className="relative w-full sm:w-96">

            <Search
              className="
                w-4 h-4
                text-slate-400
                absolute
                left-3
                top-2.5
              "
            />

            <input
              type="text"
              placeholder="Search by location, event, source, etc..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value
                }))
              }
              className="
                w-full
                bg-slate-50
                text-xs
                font-medium
                text-slate-900
                pl-9
                pr-3
                py-2
                rounded-xl
                border border-slate-200
                focus:outline-none
                focus:border-blue-500
              "
            />

          </div>

          {/* ADVANCED FILTER */}

          <button
            className="
              px-3
              py-1.5
              text-xs
              font-semibold
              text-blue-600
              bg-blue-50
              hover:bg-blue-100
              rounded-xl
              flex
              items-center
              gap-1.5
              border border-blue-200
            "
          >

            <Filter className="w-3.5 h-3.5" />

            <span>
              Advanced Filters
            </span>

          </button>

        </div>

        {/* ==================================================
            DROPDOWN FILTERS
        ================================================== */}

        <div className="
          grid
          grid-cols-2
          sm:grid-cols-5
          gap-3
          text-xs
          font-semibold
          text-slate-700
          pt-1
        ">

          {/* EVENT */}

          <div>

            <span className="
              text-[10px]
              text-slate-400
              font-bold
              block
              mb-1
            ">
              Event Type
            </span>

            <select
              value={filters.event}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  event: e.target.value
                }))
              }
              className="
                w-full
                bg-white
                p-2
                rounded-xl
                border border-slate-200
                text-xs
                font-semibold
              "
            >

              <option>
                All Events
              </option>

              {eventOptions.map((event) => (
                <option
                  key={event}
                  value={event}
                >
                  {event}
                </option>
              ))}

            </select>

          </div>

          {/* STATE */}

          <div>

            <span className="
              text-[10px]
              text-slate-400
              font-bold
              block
              mb-1
            ">
              State
            </span>

            <select
              value={filters.state}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  state: e.target.value
                }))
              }
              className="
                w-full
                bg-white
                p-2
                rounded-xl
                border border-slate-200
                text-xs
                font-semibold
              "
            >

              <option>
                All States
              </option>

              {stateOptions.map((state) => (
                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              ))}

            </select>

          </div>

          {/* DATE */}

          <div>

            <span className="
              text-[10px]
              text-slate-400
              font-bold
              block
              mb-1
            ">
              Date Range
            </span>

            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: e.target.value
                }))
              }
              className="
                w-full
                bg-white
                p-2
                rounded-xl
                border border-slate-200
                text-xs
                font-semibold
              "
            >

              <option>
                Last 7 Days
              </option>

              <option>
                Last 30 Days
              </option>

              <option>
                All Time
              </option>

            </select>

          </div>

          {/* STATUS */}

          <div>

            <span className="
              text-[10px]
              text-slate-400
              font-bold
              block
              mb-1
            ">
              Verification Status
            </span>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value
                }))
              }
              className="
                w-full
                bg-white
                p-2
                rounded-xl
                border border-slate-200
                text-xs
                font-semibold
              "
            >

              <option>
                All
              </option>

              <option>
                Verified
              </option>

              <option>
                Under Review
              </option>

              <option>
                Unverified
              </option>

            </select>

          </div>

          {/* SOURCE */}

          <div>

            <span className="
              text-[10px]
              text-slate-400
              font-bold
              block
              mb-1
            ">
              Source
            </span>

            <select
              value={filters.source}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  source: e.target.value
                }))
              }
              className="
                w-full
                bg-white
                p-2
                rounded-xl
                border border-slate-200
                text-xs
                font-semibold
              "
            >

              <option>
                All
              </option>

              {sourceOptions.map((source) => (
                <option
                  key={source}
                  value={source}
                >
                  {source}
                </option>
              ))}

            </select>

          </div>

        </div>
      </div>

      {/* ======================================================
          REPORT TABLE
      ====================================================== */}

      <div className="
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        overflow-hidden
      ">

        <div className="overflow-x-auto">

          <table className="
            w-full
            text-left
            text-xs
            text-slate-700
          ">

            <thead className="
              bg-slate-50
              text-slate-500
              font-bold
              text-[11px]
              uppercase
              border-b border-slate-200
            ">

              <tr>

                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    className="
                      rounded
                      border-slate-300
                      text-blue-600
                    "
                  />
                </th>

                <th className="p-3">
                  Date & Time
                </th>

                <th className="p-3">
                  Location
                </th>

                <th className="p-3">
                  Event
                </th>

                <th className="p-3">
                  Source
                </th>

                <th className="p-3">
                  AI Confidence
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3 text-center">
                  Freq
                </th>

                <th className="p-3">
                  Severity
                </th>

              </tr>

            </thead>

            <tbody className="
              divide-y
              divide-slate-100
              font-medium
            ">

              {filteredReports.length === 0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="
                      p-8
                      text-center
                      text-slate-500
                    "
                  >
                    No reports match the selected filters.
                  </td>

                </tr>

              )}

              {filteredReports.map((row) => (

                <tr
                  key={row.id}
                  onClick={() =>
                    setSelectedReportId(row.id)
                  }
                  className={`
                    hover:bg-blue-50/50
                    cursor-pointer
                    transition-colors
                    ${
                      activeReport?.id === row.id
                        ? 'bg-blue-50/80 font-semibold'
                        : ''
                    }
                  `}
                >

                  <td className="p-3 text-center">

                    <input
                      type="checkbox"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                      className="
                        rounded
                        border-slate-300
                        text-blue-600
                      "
                    />

                  </td>

                  <td className="
                    p-3
                    whitespace-nowrap
                    text-slate-500
                    font-mono
                    text-[11px]
                  ">
                    {row.datetime}
                  </td>

                  <td className="
                    p-3
                    font-bold
                    text-slate-900
                    whitespace-nowrap
                  ">
                    {row.location}
                  </td>

                  <td className="
                    p-3
                    font-semibold
                    text-slate-800
                  ">
                    {row.event}
                  </td>

                  <td className="
                    p-3
                    text-slate-500
                  ">
                    {row.source}
                  </td>

                  <td className="
                    p-3
                    font-mono
                    font-bold
                    text-slate-800
                  ">
                    {row.confidence}
                  </td>

                  <td className="
                    p-3
                    whitespace-nowrap
                  ">
                    <Badge
                      status={row.status}
                      size="sm"
                    />
                  </td>

                  <td className="
                    p-3
                    text-center
                    font-mono
                    font-bold
                    text-slate-700
                  ">
                    {row.freq}
                  </td>

                  <td className="
                    p-3
                    font-bold
                    whitespace-nowrap
                  ">

                    <span
                      className={
                        row.severity === 'Critical'
                          ? 'text-red-600'
                          : row.severity === 'High'
                          ? 'text-rose-600'
                          : row.severity === 'Medium'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }
                    >
                      {row.severity}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ====================================================
            PAGINATION
        ==================================================== */}

        <div className="
          p-3
          bg-slate-50
          border-t border-slate-200
          flex
          items-center
          justify-between
          text-xs
          text-slate-500
          font-medium
        ">

          <div>
            Showing{' '}
            {filteredReports.length
              ? `1-${filteredReports.length}`
              : '0'}{' '}
            of {filteredReports.length} reports
          </div>

          <div className="
            flex
            items-center
            gap-1
            font-semibold
          ">

            <button className="
              px-2
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              &lt;
            </button>

            <button className="
              px-3
              py-1
              rounded
              bg-blue-600
              text-white
            ">
              1
            </button>

            <button className="
              px-3
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              2
            </button>

            <button className="
              px-3
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              3
            </button>

            <button className="
              px-3
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              4
            </button>

            <button className="
              px-3
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              5
            </button>

            <span>
              ...
            </span>

            <button className="
              px-3
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              125
            </button>

            <button className="
              px-2
              py-1
              rounded
              bg-white
              border border-slate-200
              text-slate-600
            ">
              &gt;
            </button>

          </div>

        </div>

      </div>

      {/* ======================================================
          REPORT INSPECTOR
      ====================================================== */}

      {activeReport && (

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-6
          pt-2
        ">

          {/* ==================================================
              SOCIAL / REPORT PREVIEW
          ================================================== */}

          <div className="
            lg:col-span-6
            bg-white
            rounded-2xl
            p-5
            border border-slate-200
            shadow-sm
            space-y-4
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div className="
                flex
                items-center
                gap-2
              ">

                <div className="
                  w-8
                  h-8
                  rounded-full
                  bg-blue-100
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-xs
                ">
                  {activeReport.source === 'Citizen Report'
                    ? 'C'
                    : 'X'}
                </div>

                <div>

                  <span className="
                    font-bold
                    text-xs
                    text-slate-900
                  ">
                    {activeReport.handle}
                  </span>

                  <span className="
                    text-[11px]
                    text-slate-400
                    block
                    font-mono
                  ">
                    {activeReport.datetime}
                  </span>

                </div>

              </div>

            </div>

            <p className="
              text-xs
              text-slate-700
              font-medium
              leading-relaxed
            ">
              {activeReport.text}
            </p>

            {/* IMAGE KEPT AS DEFERRED WORK */}

            {activeReport.img ? (

              <div className="
                rounded-xl
                overflow-hidden
                border border-slate-200
                aspect-video
              ">

                <img
                  src={activeReport.img}
                  alt="Ground preview"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>

            ) : (

              <div className="
                rounded-xl
                border border-dashed
                border-slate-300
                bg-slate-50
                aspect-video
                flex
                items-center
                justify-center
                text-xs
                text-slate-400
              ">
                Image preview not available
              </div>

            )}

            <div className="
              flex
              items-center
              gap-6
              text-xs
              text-slate-500
              font-semibold
              pt-1
            ">

              <span className="
                flex
                items-center
                gap-1.5
              ">
                <MessageSquare className="w-4 h-4" />
                124
              </span>

              <span className="
                flex
                items-center
                gap-1.5
              ">
                <Repeat className="w-4 h-4" />
                302
              </span>

              <span className="
                flex
                items-center
                gap-1.5
              ">
                <Heart className="
                  w-4
                  h-4
                  text-rose-500
                " />
                1.2K
              </span>

            </div>

          </div>

          {/* ==================================================
              INCIDENT DETAILS
          ================================================== */}

          <div className="
            lg:col-span-6
            bg-white
            rounded-2xl
            p-5
            border border-slate-200
            shadow-sm
            space-y-4
          ">

            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              pb-3
            ">

              <h3 className="
                text-sm
                font-extrabold
                text-slate-900
              ">
                Incident Details
              </h3>

              <button
                onClick={() =>
                  setSelectedReportId(null)
                }
                className="
                  text-slate-400
                  hover:text-slate-600
                "
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            <div className="
              space-y-3
              text-xs
            ">

              {/* LOCATION */}

              <div className="
                flex
                justify-between
                py-1.5
                border-b
                border-slate-100
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  Location
                </span>

                <span className="
                  font-bold
                  text-slate-900
                ">
                  {activeReport.location}
                </span>

              </div>

              {/* EVENT */}

              <div className="
                flex
                justify-between
                py-1.5
                border-b
                border-slate-100
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  Event Type
                </span>

                <span className="
                  font-bold
                  text-slate-900
                ">
                  {activeReport.event}
                </span>

              </div>

              {/* SOURCE */}

              <div className="
                flex
                justify-between
                py-1.5
                border-b
                border-slate-100
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  Source
                </span>

                <span className="
                  font-bold
                  text-slate-900
                ">
                  {activeReport.source}
                </span>

              </div>

              {/* AI CONFIDENCE */}

              <div className="
                flex
                justify-between
                py-1.5
                border-b
                border-slate-100
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  AI Confidence
                </span>

                <span className="
                  font-mono
                  font-bold
                  text-blue-600
                ">
                  {activeReport.confidence}
                </span>

              </div>

              {/* STATUS */}

              <div className="
                flex
                justify-between
                py-1.5
                border-b
                border-slate-100
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  Verification Status
                </span>

                <Badge
                  status={activeReport.status}
                  size="sm"
                />

              </div>

              {/* FREQUENCY */}

              <div className="
                flex
                justify-between
                py-1.5
                border-b
                border-slate-100
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  Frequency
                </span>

                <span className="
                  font-mono
                  font-bold
                  text-slate-900
                ">
                  {activeReport.freq}
                </span>

              </div>

              {/* SEVERITY */}

              <div className="
                flex
                justify-between
                py-1.5
              ">

                <span className="
                  text-slate-500
                  font-semibold
                ">
                  Severity
                </span>

                <span
                  className={`
                    font-bold
                    ${
                      activeReport.severity === 'Critical'
                        ? 'text-red-600'
                        : activeReport.severity === 'High'
                        ? 'text-rose-600'
                        : activeReport.severity === 'Medium'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }
                  `}
                >
                  {activeReport.severity}
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};