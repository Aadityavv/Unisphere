// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import StatsCard from '../../components/student/StatsCard';
import EngagementHeatmap from '../../components/admin/EngagementHeatmap';
import AlertsBanner from '../../components/admin/AlertsBanner';
import API from '../../utils/api';
import { Users, Calendar, ShieldCheck } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const [userCount, setUserCount] = useState(0);
    const [clubCount, setClubCount] = useState(0);
    const [pendingEvents, setPendingEvents] = useState(0);
    const [heatmapData, setHeatmapData] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersRes, clubsRes, pendingRes, heatmapRes] = await Promise.all([
                    API.get('/admin/users'),
                    API.get('/clubs'),
                    API.get('/admin/events/pending'),
                    API.get('/admin/engagement-heatmap'),
                ]);

                setUserCount(usersRes.data.length);
                setClubCount(clubsRes.data.length);
                setPendingEvents(pendingRes.data.length);
                setHeatmapData(heatmapRes.data.heatmap || []);
                setAlerts(heatmapRes.data.alerts || []);
            } catch (err) {
                console.error('Admin dashboard error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatsCard title="Total Users" value={userCount} icon={Users} trend="up" trendValue="+2%" />
                    <StatsCard title="Clubs" value={clubCount} icon={Calendar} trend="up" trendValue="+1" />
                    <StatsCard title="Pending Events" value={pendingEvents} icon={ShieldCheck} trend="down" trendValue="-1" />
                </div>

                <AlertsBanner alerts={alerts} />

                <div className="mt-10">
                    {heatmapData.length > 0 ? (
                        <EngagementHeatmap data={heatmapData} />
                    ) : (
                        <p className="text-center text-slate-500 mt-6">
                            Engagement heatmap analytics coming soon.
                        </p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
