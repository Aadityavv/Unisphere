// src/components/admin/TopDepartmentsList.tsx
import React from 'react';

interface Department {
    name: string;
    participationCount: number;
}

const TopDepartmentsList: React.FC<{ departments: Department[] }> = ({ departments }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Top Participating Departments</h2>
            <ul className="space-y-2">
                {departments.map((dept, index) => (
                    <li key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex justify-between text-sm text-slate-700">
                            <span className="font-medium">{dept.name}</span>
                            <span>{dept.participationCount} participations</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopDepartmentsList;
