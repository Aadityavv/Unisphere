import React from 'react';
import { Clock, Users, Calendar, TrendingUp } from 'lucide-react';

const SmartSchedulingTips: React.FC = () => {
  const tips = [
    {
      icon: Clock,
      title: 'Peak Hours',
      description: 'Schedule events between 2-4 PM for highest attendance',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Optimal Size',
      description: 'Keep workshops under 30 participants for better engagement',
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      title: 'Best Days',
      description: 'Tuesday-Thursday events have 25% higher attendance',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Advance Notice',
      description: 'Post events 2 weeks ahead for maximum registrations',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Scheduling Tips</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Icon className={`w-5 h-5 mt-0.5 ${tip.color}`} />
              <div>
                <h4 className="font-medium text-gray-900">{tip.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartSchedulingTips;