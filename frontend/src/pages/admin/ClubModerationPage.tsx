// src/pages/admin/ClubModerationPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import AllClubsTable from '../../components/admin/AllClubsTable';
import API from '../../utils/api';

const ClubModerationPage: React.FC = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClubs = async () => {
        try {
            const res = await API.get('/clubs');
            setClubs(res.data);
        } catch (err) {
            console.error('Error fetching clubs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Club Moderation</h1>
                {loading ? (
                    <div className="text-center text-slate-500">Loading clubs...</div>
                ) : clubs.length === 0 ? (
                    <div className="text-center text-slate-500">No clubs found.</div>
                ) : (
                    <AllClubsTable clubs={clubs} onUpdate={fetchClubs} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ClubModerationPage;
