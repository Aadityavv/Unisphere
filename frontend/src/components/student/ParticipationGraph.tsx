import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ParticipationGraph = () => {
  const data = [
    { month: 'Jan', events: 2 },
    { month: 'Feb', events: 4 },
    { month: 'Mar', events: 3 },
    { month: 'Apr', events: 6 },
    { month: 'May', events: 5 },
    { month: 'Jun', events: 7 },
    { month: 'Jul', events: 4 },
    { month: 'Aug', events: 8 },
    { month: 'Sep', events: 6 },
    { month: 'Oct', events: 9 },
    { month: 'Nov', events: 7 },
    { month: 'Dec', events: 5 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Participation Trend</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="events" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600">
          Total events attended this year: <span className="font-semibold text-emerald-600">66</span>
        </p>
      </div>
    </div>
  );
};

export default ParticipationGraph;