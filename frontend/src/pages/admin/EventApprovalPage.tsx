// src/pages/admin/EventApprovalPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import ApprovalTable from '../../components/admin/ApprovalTable';
import API from '../../utils/api';

const EventApprovalPage: React.FC = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingEvents = async () => {
        try {
            const res = await API.get('/admin/events/pending');
            setEvents(res.data);
        } catch (err) {
            console.error('Error fetching pending events:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Pending Event Approvals</h1>

                {loading ? (
                    <div className="text-center text-slate-500">Loading events...</div>
                ) : events.length === 0 ? (
                    <div className="text-center text-slate-500">No pending events found.</div>
                ) : (
                    <ApprovalTable events={events} onAction={fetchPendingEvents} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default EventApprovalPage;
