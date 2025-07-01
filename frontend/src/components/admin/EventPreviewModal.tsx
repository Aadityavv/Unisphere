// src/components/admin/EventPreviewModal.tsx
import React from 'react';

const EventPreviewModal: React.FC<{ event: any, onClose: () => void }> = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl relative">
                <button className="absolute top-2 right-2 text-slate-400 hover:text-red-500" onClick={onClose}>
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <p className="text-slate-700 mb-2"><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                <p className="text-slate-700 mb-2"><strong>Location:</strong> {event.location}</p>
                <p className="text-slate-700 mb-2"><strong>Organizer:</strong> {event.organizerId?.name}</p>
                <p className="text-slate-700 mb-4"><strong>Category:</strong> {event.category}</p>
                <p className="text-slate-600 whitespace-pre-line">{event.description}</p>
            </div>
        </div>
    );
};

export default EventPreviewModal;
