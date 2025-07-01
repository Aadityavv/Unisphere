// src/pages/admin/UserManagementPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import UserTable from '../../components/admin/UserTable';
import API from '../../utils/api';

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await API.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">User Management</h1>
                {loading ? (
                    <div className="text-center text-slate-500">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="text-center text-slate-500">No users found.</div>
                ) : (
                    <UserTable users={users} onRoleUpdate={fetchUsers} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default UserManagementPage;
