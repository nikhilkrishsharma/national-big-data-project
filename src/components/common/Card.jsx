import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  title,
  subtitle,
  headerAction,
  ...props
}) => {
  return (
    <div
      className={`glass-panel ${hoverEffect ? 'glass-panel-hover' : ''} p-5 ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            {title && <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
