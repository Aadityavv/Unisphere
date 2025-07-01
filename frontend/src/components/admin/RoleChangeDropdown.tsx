// src/components/admin/RoleChangeDropdown.tsx
import React, { useState } from 'react';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const RoleChangeDropdown: React.FC<{
    userId: string;
    currentRole: string;
    onSuccess: () => void;
}> = ({ userId, currentRole, onSuccess }) => {
    const [selectedRole, setSelectedRole] = useState(currentRole);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        setSelectedRole(newRole);
        setLoading(true);
        try {
            await API.patch(`/admin/users/${userId}/role`, { role: newRole });
            toast.success('Role updated');
            onSuccess();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update role');
            setSelectedRole(currentRole);
        } finally {
            setLoading(false);
        }
    };

    return (
        <select
            value={selectedRole}
            onChange={handleChange}
            disabled={loading}
            className="px-2 py-1 border border-slate-300 rounded text-sm"
        >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
        </select>
    );
};

export default RoleChangeDropdown;
