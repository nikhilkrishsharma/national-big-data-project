import React from 'react';
import { CloudRain, ShieldCheck, Activity, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                <CloudRain className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">National Weather</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              National Weather Intelligence Platform (NWIP) integrates multimodal social data processing, satellite radar imagery, and ground sensor networks for instant disaster prediction.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Platform Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/live-map" className="hover:text-blue-600 transition-colors">Live Map</Link></li>
              <li><Link to="/analytics" className="hover:text-blue-600 transition-colors">Analytics</Link></li>
              <li><Link to="/reports" className="hover:text-blue-600 transition-colors">Reports</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Integrated Feeds</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center justify-between">
                <span>IMD Radar Stream</span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">LIVE API</span>
              </li>
              <li className="flex items-center justify-between">
                <span>ISRO Bhuvan Tiles</span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">INSAT-3DR</span>
              </li>
              <li className="flex items-center justify-between">
                <span>NDRF CAD Desk</span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">ACTIVE</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Emergency Helplines</h4>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">National Emergency</span>
                <span className="text-xs font-bold font-mono text-rose-600 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" /> 112
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Disaster Helpline</span>
                <span className="text-xs font-bold font-mono text-rose-600 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" /> 1078
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>© 2026 National Weather Intelligence Platform. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-emerald-600 font-semibold">● System Operational</span>
            <span>Uptime 99.9%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
