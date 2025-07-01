// src/components/admin/ApproveRejectButtons.tsx
import React, { useState } from 'react';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const ApproveRejectButtons: React.FC<{ eventId: string, onAction: () => void }> = ({ eventId, onAction }) => {
    const [loading, setLoading] = useState(false);

    const handleAction = async (type: 'approve' | 'reject') => {
        setLoading(true);
        try {
            await API.post(`/admin/events/${eventId}/${type}`);
            toast.success(`Event ${type}d successfully`);
            onAction(); // refresh list
        } catch (err) {
            console.error(`Failed to ${type} event:`, err);
            toast.error(`Failed to ${type} event`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                disabled={loading}
                onClick={() => handleAction('approve')}
            >
                Approve
            </button>
            <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                disabled={loading}
                onClick={() => handleAction('reject')}
            >
                Reject
            </button>
        </>
    );
};

export default ApproveRejectButtons;
