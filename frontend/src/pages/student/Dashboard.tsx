import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import StatsCard from '../../components/student/StatsCard';
import SuggestedEvents from '../../components/student/SuggestedEvents';
import UpcomingEvents from '../../components/student/UpcomingEvents';
import { getStudentDashboard } from '../../utils/apiMock';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getStudentDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-slate-600">
            Here's what's happening in your university community today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatsCard
            title="Events Attended"
            value={dashboardData?.stats.eventsAttended || 0}
            icon={Calendar}
            trend="up"
            trendValue="+3"
          />
          <StatsCard
            title="Clubs Joined"
            value={dashboardData?.stats.clubsJoined || 0}
            icon={Users}
            trend="up"
            trendValue="+1"
          />
          <StatsCard
            title="Engagement Score"
            value={`${dashboardData?.stats.engagementScore || 0}%`}
            icon={TrendingUp}
            trend="up"
            trendValue="+5%"
          />
        </div>

        {/* Suggested Events */}
        {dashboardData?.suggestedEvents && (
          <SuggestedEvents events={dashboardData.suggestedEvents} />
        )}

        {/* Upcoming Events */}
        {dashboardData?.upcomingEvents && (
          <UpcomingEvents events={dashboardData.upcomingEvents} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;