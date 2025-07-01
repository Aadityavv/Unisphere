import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

const ParticipationGraph = ({ attendance }) => {
    // Step 1: Initialize monthly count
    const monthMap = Array(12).fill(0);

    // Step 2: Count attended events by month
    attendance.forEach((a) => {
        const date = new Date(a.date);
        const monthIndex = date.getMonth(); // 0-based: Jan=0
        if (a.status === 'Attended') {
            monthMap[monthIndex]++;
        }
    });

    // Step 3: Prepare data for chart
    const data = monthMap.map((count, i) => ({
        month: dayjs().month(i).format('MMM'),
        events: count
    }));

    const total = monthMap.reduce((sum, val) => sum + val, 0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Participation Trend</h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
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
                    Total events attended this year:{' '}
                    <span className="font-semibold text-emerald-600">{total}</span>
                </p>
            </div>
        </div>
    );
};

export default ParticipationGraph;
