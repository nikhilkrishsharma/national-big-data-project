import React, { useState } from 'react';
import {
  X,
  MapPin,
  CloudRain,
  Upload,
  Send,
  AlertTriangle
} from 'lucide-react';

const LOCATION_COORDINATES = {
  "kanpur, uttar pradesh": [26.4499, 80.3319],
  "lucknow, uttar pradesh": [26.8467, 80.9462],
  "varanasi, uttar pradesh": [25.3176, 82.9739],
  "agra, uttar pradesh": [27.1767, 78.0081],

  "mumbai, maharashtra": [19.0760, 72.8777],
  "pune, maharashtra": [18.5204, 73.8567],
  "nagpur, maharashtra": [21.1458, 79.0882],

  "delhi, delhi": [28.6139, 77.2090],

  "chennai, tamil nadu": [13.0827, 80.2707],
  "kolkata, west bengal": [22.5726, 88.3639],
  "guwahati, assam": [26.1445, 91.7362],
  "bhubaneswar, odisha": [20.2961, 85.8245],
  "thiruvananthapuram, kerala": [8.5241, 76.9366],
  "shimla, himachal pradesh": [31.1048, 77.1734],
  "dehradun, uttarakhand": [30.3165, 78.0322],
};

export const IncidentReportModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    state: '',
    severity: 'Moderate',
    description: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0] || null
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.type || !formData.location || !formData.state) {
    return;
  }

  const locationKey =
    `${formData.location.trim()}, ${formData.state.trim()}`
      .toLowerCase();

  const coordinates = LOCATION_COORDINATES[locationKey];

  const reportData = {
    ...formData,
    lat: coordinates ? coordinates[0] : null,
    lng: coordinates ? coordinates[1] : null
  };

  if (onSubmit) {
    onSubmit(reportData);
  }

  onClose();
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4 py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CloudRain className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Report an Incident
              </h2>

              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Help us improve real-time weather intelligence
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Incident Type + Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Incident Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                <option value="">Select incident type</option>
                <option value="Heavy Rain">Heavy Rain</option>
                <option value="Flash Flood">Flash Flood</option>
                <option value="Flood">Flood</option>
                <option value="Cloudburst">Cloudburst</option>
                <option value="Thunderstorm">Thunderstorm</option>
                <option value="Cyclone">Cyclone</option>
                <option value="Heatwave">Heatwave</option>
                <option value="Landslide">Landslide</option>
                <option value="Dust Storm">Dust Storm</option>
                <option value="Strong Winds">Strong Winds</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Severity
              </label>

              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Location
            </label>

            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter city, district or specific location"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              State
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            >
              <option value="">Select state</option>

              <option>Andhra Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Delhi</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what you observed..."
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Photo / Video Evidence
              <span className="font-medium text-slate-400 ml-1">
                (Optional)
              </span>
            </label>

            <label className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                <Upload className="w-4 h-4 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700">
                  {formData.file
                    ? formData.file.name
                    : 'Upload supporting evidence'}
                </p>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  JPG, PNG or MP4
                </p>
              </div>

              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Info */}
          <div className="flex gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-100">
            <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />

            <p className="text-[11px] text-blue-700 leading-relaxed">
              Reports are analyzed and verified before being used for
              weather intelligence and alerts.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              <Send className="w-4 h-4" />
              Submit Report
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};