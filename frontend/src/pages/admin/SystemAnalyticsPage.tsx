// src/pages/admin/SystemAnalyticsPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import CategoryPieChart from '../../components/admin/CategoryPieChart';
import TopDepartmentsList from '../../components/admin/TopDepartmentsList';
import TimeConflictWarnings from '../../components/admin/TimeConflictWarnings';
import API from '../../utils/api';

const SystemAnalyticsPage: React.FC = () => {
    const [categoryStats, setCategoryStats] = useState({});
    const [topDepartments, setTopDepartments] = useState([]);
    const [timeConflicts, setTimeConflicts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/admin/event-stats');
                setCategoryStats(res.data.categoryStats || {});
                setTopDepartments(res.data.topDepartments || []);
                setTimeConflicts(res.data.timeConflicts || []);
            } catch (err) {
                console.error('Error fetching analytics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-slate-900 mb-10">System Analytics</h1>

                {loading ? (
                    <div className="text-center text-slate-500">Loading analytics...</div>
                ) : (
                    <div className="grid gap-10">
                        <CategoryPieChart data={categoryStats} />
                        <TopDepartmentsList departments={topDepartments} />
                        <TimeConflictWarnings conflicts={timeConflicts} />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SystemAnalyticsPage;
