// src/components/admin/UserActionMenu.tsx
import React from 'react';
// Later: use API.delete(`/admin/users/${userId}`)

const UserActionMenu: React.FC<{ userId: string }> = ({ userId }) => {
    return (
        <button
            className="text-red-500 hover:underline text-sm"
            onClick={() => alert(`Coming soon: ban user ${userId}`)}
        >
            Ban
        </button>
    );
};

export default UserActionMenu;
