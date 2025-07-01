// src/components/admin/EngagementHeatmap.tsx
import React from 'react';

interface HeatmapProps {
    data: {
        department: string;
        engagementScore: number;
    }[];
}

const EngagementHeatmap: React.FC<HeatmapProps> = ({ data }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Engagement Heatmap</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((dept, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-sm border border-gray-100 ${
                            dept.engagementScore > 75
                                ? 'bg-green-100 text-green-800'
                                : dept.engagementScore > 50
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                        }`}
                    >
                        <p className="font-semibold">{dept.department}</p>
                        <p className="text-xl">{dept.engagementScore}%</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EngagementHeatmap;
