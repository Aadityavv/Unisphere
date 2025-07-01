// src/components/admin/UserTable.tsx
import React from 'react';
import RoleChangeDropdown from './RoleChangeDropdown';
import UserActionMenu from './UserActionMenu';

const UserTable: React.FC<{ users: any[], onRoleUpdate: () => void }> = ({ users, onRoleUpdate }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100 bg-white">
            <table className="min-w-full text-sm text-left text-slate-700">
                <thead className="text-xs uppercase bg-slate-100 text-slate-600">
                <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-t hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                            <RoleChangeDropdown userId={user._id} currentRole={user.role} onSuccess={onRoleUpdate} />
                        </td>
                        <td className="px-6 py-4">{user.department || '—'}</td>
                        <td className="px-6 py-4">
                            <UserActionMenu userId={user._id} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
