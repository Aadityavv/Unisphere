// src/components/admin/AlertsBanner.tsx
import React from 'react';

interface AlertsBannerProps {
    alerts: string[];
}

const AlertsBanner: React.FC<AlertsBannerProps> = ({ alerts }) => {
    if (!alerts.length) return null;

    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg">
            <h3 className="text-red-800 font-semibold mb-2">⚠️ Alerts</h3>
            <ul className="list-disc list-inside text-red-700">
                {alerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                ))}
            </ul>
        </div>
    );
};

export default AlertsBanner;
