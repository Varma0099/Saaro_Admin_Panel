import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'teal' | 'blue' | 'purple' | 'emerald' | 'orange' | 'rose' | 'indigo' | 'amber';
  onClick?: () => void;
}


const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'teal',
  onClick
}) => {
  // Define color variants using modern gradients and professional colors
  const colorVariants = {
    teal: {
      bg: 'bg-gradient-to-br from-slate-50 via-white to-[#49A097]/5',
      iconBg: 'bg-gradient-to-br from-[#49A097] to-[#49A097]/80',
      iconColor: 'text-white',
      border: 'border-[#49A097]/20',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-[#49A097]/10',
      hoverShadow: 'hover:shadow-[#49A097]/20',
      accent: 'bg-[#49A097]/10'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 via-white to-blue-100/30',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconColor: 'text-white',
      border: 'border-blue-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-blue-500/10',
      hoverShadow: 'hover:shadow-blue-500/20',
      accent: 'bg-blue-500/10'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 via-white to-purple-100/30',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconColor: 'text-white',
      border: 'border-purple-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-purple-500/10',
      hoverShadow: 'hover:shadow-purple-500/20',
      accent: 'bg-purple-500/10'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100/30',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      iconColor: 'text-white',
      border: 'border-emerald-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-emerald-500/10',
      hoverShadow: 'hover:shadow-emerald-500/20',
      accent: 'bg-emerald-500/10'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 via-white to-orange-100/30',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      iconColor: 'text-white',
      border: 'border-orange-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-orange-500/10',
      hoverShadow: 'hover:shadow-orange-500/20',
      accent: 'bg-orange-500/10'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 via-white to-rose-100/30',
      iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
      iconColor: 'text-white',
      border: 'border-rose-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-rose-500/10',
      hoverShadow: 'hover:shadow-rose-500/20',
      accent: 'bg-rose-500/10'
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-50 via-white to-indigo-100/30',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      iconColor: 'text-white',
      border: 'border-indigo-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-indigo-500/10',
      hoverShadow: 'hover:shadow-indigo-500/20',
      accent: 'bg-indigo-500/10'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 via-white to-amber-100/30',
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      iconColor: 'text-white',
      border: 'border-amber-200',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-600',
      shadow: 'shadow-amber-500/10',
      hoverShadow: 'hover:shadow-amber-500/20',
      accent: 'bg-amber-500/10'
    }
  };

  const colors = colorVariants[color];

  return (
    <div
      className={`
        group relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden backdrop-blur-sm
        ${colors.bg} ${colors.border} ${colors.shadow} ${colors.hoverShadow}
        hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/40 to-transparent -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
      <div className={`absolute bottom-0 left-0 w-20 h-20 rounded-full ${colors.accent} -translate-y-10 -translate-x-10 group-hover:scale-125 transition-transform duration-500`}></div>
      
      {/* Header with icon and trend */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className={`
          p-3 rounded-xl shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl
          ${colors.iconBg}
        `}>
          <Icon className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
        
        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center space-x-2">
            <div className={`
              flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm
              ${trend.isPositive 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-rose-100 text-rose-700 border border-rose-200'
              }
            `}>
              <div className={`w-2 h-2 rounded-full ${
                trend.isPositive ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></div>
              <span>{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 space-y-2">
        <h3 className={`text-sm font-semibold uppercase tracking-wider ${colors.textSecondary}`}>
          {title}
        </h3>
        <p className={`text-3xl font-bold ${colors.textPrimary} group-hover:scale-105 transition-transform duration-300`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default StatCard;