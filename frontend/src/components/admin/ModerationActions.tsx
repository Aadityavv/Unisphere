// src/components/admin/ModerationActions.tsx
import React from 'react';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const ModerationActions: React.FC<{ clubId: string; onUpdate: () => void }> = ({ clubId, onUpdate }) => {
    const handleDeactivate = async () => {
        if (!window.confirm('Are you sure you want to deactivate this club?')) return;
        try {
            await API.patch(`/clubs/${clubId}`, { active: false });
            toast.success('Club deactivated');
            onUpdate();
        } catch (err) {
            console.error('Deactivate error:', err);
            toast.error('Failed to deactivate');
        }
    };

    return (
        <button
            className="text-red-500 hover:underline text-sm"
            onClick={handleDeactivate}
        >
            Deactivate
        </button>
    );
};

export default ModerationActions;
