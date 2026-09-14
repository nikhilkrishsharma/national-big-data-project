import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

export const Badge = ({
  status,
  severity,
  text,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  if (status) {
    const statusMap = {
      "Verified": {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
        label: "Verified"
      },
      "Under Review": {
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
        label: "Under Review"
      },
      "Unverified": {
        bg: "bg-rose-50 text-rose-700 border-rose-200",
        icon: AlertTriangle,
        label: "Unverified"
      }
    };
    const item = statusMap[status] || statusMap["Under Review"];
    const Icon = item.icon;
    return (
      <span className={`inline-flex items-center gap-1 font-semibold border rounded-full ${item.bg} ${sizeClasses} ${className}`}>
        <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{text || item.label}</span>
      </span>
    );
  }

  if (severity) {
    const severityMap = {
      "Critical": "bg-rose-50 text-rose-700 border-rose-200 font-bold",
      "High": "bg-orange-50 text-orange-700 border-orange-200 font-bold",
      "Medium": "bg-amber-50 text-amber-700 border-amber-200 font-semibold",
      "Moderate": "bg-amber-50 text-amber-700 border-amber-200 font-semibold",
      "Low": "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
    };
    return (
      <span className={`inline-flex items-center gap-1 font-semibold border rounded-md uppercase tracking-wider ${severityMap[severity] || severityMap["Moderate"]} ${sizeClasses} ${className}`}>
        <AlertCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>{text || severity}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded-md ${sizeClasses} ${className}`}>
      {text}
    </span>
  );
};
