// src/components/admin/CategoryPieChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const CategoryPieChart: React.FC<{ data: Record<string, number> }> = ({ data }) => {
    const chartData = Object.entries(data).map(([category, value]) => ({
        name: category,
        value,
    }));

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Event Category Distribution</h2>
            <div className="h-72">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CategoryPieChart;
