// src/components/admin/TimeConflictWarnings.tsx
import React from 'react';

const TimeConflictWarnings: React.FC<{ conflicts: string[] }> = ({ conflicts }) => {
    if (!conflicts.length) return null;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Time Conflict Warnings</h2>
            <ul className="list-disc list-inside text-red-600 space-y-1 text-sm">
                {conflicts.map((warning, index) => (
                    <li key={index}>{warning}</li>
                ))}
            </ul>
        </div>
    );
};

export default TimeConflictWarnings;
