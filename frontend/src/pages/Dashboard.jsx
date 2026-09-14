import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { 
  LayoutDashboard, 
  Radio, 
  Send, 
  Users, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INCIDENTS } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();
  const criticalIncidents = INCIDENTS.filter((i) => i.severity === 'Critical' || i.severity === 'High');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-7 h-7 text-blue-600" />
            Operational Command Monitor
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Real-time disaster response status, system health, and high-severity queue</p>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={Send}
          onClick={() => alert("Broadcasting SOS Siren Alert...")}
        >
          Trigger Red Alert
        </Button>
      </div>

      {/* System Node Cluster Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">INSAT-3DR Satellite Sync</span>
            <p className="text-sm font-bold font-mono text-emerald-700">ONLINE (0.4s delay)</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">AI Vision Model Engine</span>
            <p className="text-sm font-bold font-mono text-blue-700">99.8% ACCURACY</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">NDRF Response Teams</span>
            <p className="text-sm font-bold font-mono text-slate-900">18 Units Active</p>
          </div>
        </Card>
      </div>

      {/* Critical Active Incidents Queue */}
      <Card 
        title="High-Priority Disaster Queue" 
        subtitle="Critical events requiring immediate field verification"
        headerAction={
          <Button variant="ghost" size="sm" onClick={() => navigate('/live-map')}>
            View Live Map <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        }
      >
        <div className="space-y-3">
          {criticalIncidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-blue-600 font-bold">{incident.id}</span>
                  <Badge severity={incident.severity} size="sm" />
                  <Badge status={incident.status} size="sm" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{incident.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">{incident.nlpSummary}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-emerald-700 font-bold">
                  AI Conf: {incident.aiConfidence}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/live-map')}
                >
                  Inspect Event
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
