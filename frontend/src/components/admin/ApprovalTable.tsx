// src/components/admin/ApprovalTable.tsx
import React, { useState } from 'react';
import EventPreviewModal from './EventPreviewModal';
import ApproveRejectButtons from './ApproveRejectButtons';

const ApprovalTable: React.FC<{ events: any[], onAction: () => void }> = ({ events, onAction }) => {
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    return (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100 bg-white">
            <table className="min-w-full text-sm text-left text-slate-700">
                <thead className="text-xs uppercase bg-slate-100 text-slate-600">
                <tr>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Organizer</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event) => (
                    <tr key={event._id} className="border-t hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{event.title}</td>
                        <td className="px-6 py-4">{event.organizerId?.name || 'Unknown'}</td>
                        <td className="px-6 py-4">
                            {new Date(event.dateTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 space-x-2">
                            <button
                                className="text-emerald-600 hover:underline"
                                onClick={() => setSelectedEvent(event)}
                            >
                                Preview
                            </button>
                            <ApproveRejectButtons eventId={event._id} onAction={onAction} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedEvent && (
                <EventPreviewModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
};

export default ApprovalTable;
