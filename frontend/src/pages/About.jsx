import React from 'react';
import { Card } from '../components/common/Card';
import { 
  CloudRain, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Layers 
} from 'lucide-react';

export const About = () => {
  const steps = [
    { step: "01", title: "Multi-Source Data Ingestion", desc: "Streams IMD radar, satellite INSAT-3DR tiles, APIs, news feeds, and social posts.", icon: Radio },
    { step: "02", title: "AI-Powered NLP & Vision Analysis", desc: "Computer vision CNNs detect flood levels while NLP models classify disaster sentiment.", icon: Cpu },
    { step: "03", title: "Interactive GIS Mapping", desc: "Layers precipitation intensity heatmaps over high-resolution state maps.", icon: Layers },
    { step: "04", title: "Real-Time Emergency Alerts", desc: "Automated alert dispatch to disaster operation centers and citizen apps.", icon: ShieldCheck }
  ];

  return (
    <div className="space-y-10 pb-12 max-w-5xl mx-auto">
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
          <CloudRain className="w-4 h-4" />
          <span>Technology Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          About National Weather Intelligence Platform
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Integrating high-resolution satellite remote sensing with deep NLP social stream analysis for instant disaster prediction and response across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.step} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono text-blue-200">{s.step}</span>
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{s.desc}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
