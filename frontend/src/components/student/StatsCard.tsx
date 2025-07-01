import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, trendValue }) => {
  return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
                <div className={`flex items-center mt-2 text-sm ${
                    trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  <span className="font-medium">{trendValue}</span>
                  <span className="ml-1 text-slate-500">vs last month</span>
                </div>
            )}
          </div>
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl">
            <Icon className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
      </div>
  );
};

export default StatsCard;
