import React from 'react';
import { User } from 'lucide-react';

const ClubMemberList = ({ members = [] }) => {
    const dummyMembers = [
        { id: 1, name: 'Alice Johnson', avatar: null, role: 'President' },
        { id: 2, name: 'Bob Smith', avatar: null, role: 'Vice President' },
        { id: 3, name: 'Carol Davis', avatar: null, role: 'Secretary' },
        { id: 4, name: 'David Wilson', avatar: null, role: 'Treasurer' },
        { id: 5, name: 'Emma Brown', avatar: null, role: 'Member' },
        { id: 6, name: 'Frank Miller', avatar: null, role: 'Member' },
        { id: 7, name: 'Grace Lee', avatar: null, role: 'Member' },
        { id: 8, name: 'Henry Taylor', avatar: null, role: 'Member' },
    ];

    const displayMembers = members.length > 0 ? members : dummyMembers;

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Club Members</h2>
                <span className="text-slate-600">{displayMembers.length} members</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {displayMembers.map((member) => (
                    <div key={member._id || member.id} className="text-center group">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-200">
                            {member.avatar ? (
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <User className="h-8 w-8 text-white" />
                            )}
                        </div>
                        <h3 className="font-medium text-slate-900 text-sm mb-1">{member.name}</h3>
                        <p className="text-xs text-slate-600">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ClubMemberList;
