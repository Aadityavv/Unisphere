// src/components/admin/AllClubsTable.tsx
import React from 'react';
import ModerationActions from './ModerationActions';

const AllClubsTable: React.FC<{ clubs: any[], onUpdate: () => void }> = ({ clubs, onUpdate }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100 bg-white">
            <table className="min-w-full text-sm text-left text-slate-700">
                <thead className="text-xs uppercase bg-slate-100 text-slate-600">
                <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Faculty Lead</th>
                    <th className="px-6 py-3">Created By</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {clubs.map((club) => (
                    <tr key={club._id} className="border-t hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{club.name}</td>
                        <td className="px-6 py-4">{club.facultyLeadId?.name || '—'}</td>
                        <td className="px-6 py-4">{club.createdBy?.name || '—'}</td>
                        <td className="px-6 py-4">
                            <ModerationActions clubId={club._id} onUpdate={onUpdate} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllClubsTable;
