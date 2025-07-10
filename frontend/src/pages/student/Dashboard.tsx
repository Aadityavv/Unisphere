import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import StatsCard from '../../components/student/StatsCard';
import SuggestedEvents from '../../components/student/SuggestedEvents';
import UpcomingEvents from '../../components/student/UpcomingEvents';
import API from '../../utils/api';

// ------------------------------
// ✅ Type definitions
// ------------------------------
interface EventType {
  _id: string;
  title: string;
  dateTime: string;
  location: string;
  clubId?: { name: string };
}

interface DashboardStats {
  eventsAttended: number;
  clubsJoined: number;
  engagementScore: number;
}

interface DashboardData {
  stats: DashboardStats;
  upcomingEvents: EventType[];
  suggestedEvents: EventType[];
}

// ------------------------------
// ✅ API Function
// ------------------------------
export const getStudentDashboardData = async (userId: string): Promise<DashboardData> => {
  try {
    const [eventRes, attendanceRes, clubsRes] = await Promise.all([
      API.get(`/events/student/${userId}`),
      API.get(`/attendance/user/${userId}`),
      API.get(`/clubs/user/${userId}`),  // ✅ Get real joined clubs
    ]);

    const registeredEvents = eventRes.data;
    const attendanceHistory = attendanceRes.data;
    const joinedClubs = clubsRes.data;

    const eventsAttended = attendanceHistory.filter((a: any) => a.status === 'present').length;
    const clubsJoined = joinedClubs.length;

    // Temporary engagementScore logic until CORS fix
    const engagementScore = Math.min(100, eventsAttended * 10 + clubsJoined * 5);

    return {
      stats: {
        eventsAttended,
        clubsJoined,
        engagementScore,
      },
      upcomingEvents: registeredEvents.filter((e: any) => new Date(e.dateTime) > new Date()),
      suggestedEvents: registeredEvents.slice(0, 2),
    };
  } catch (error) {
    console.error("❌ Error in getStudentDashboardData:", error);
    throw error;
  }
};


// ------------------------------
// ✅ Main Component
// ------------------------------
const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user || !user._id) {
          console.error('No logged-in user found.');
          return;
        }
        setUserName(user.name || 'User');

        const data = await getStudentDashboardData(user._id);
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
          {/* ✅ Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-slate-600">
              Here's what's happening in your university community today.
            </p>
          </div>

          {/* ✅ Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
                title="Events Attended"
                value={dashboardData?.stats.eventsAttended || 0}
                icon={Calendar}
                trend="up"
                trendValue={`+${dashboardData?.stats.eventsAttended || 0}`}
            />
            <StatsCard
                title="Clubs Joined"
                value={dashboardData?.stats.clubsJoined || 0}
                icon={Users}
                trend="up"
                trendValue={`+${dashboardData?.stats.clubsJoined || 0}`}
            />
            <StatsCard
                title="Engagement Score"
                value={`${dashboardData?.stats.engagementScore || 0}%`}
                icon={TrendingUp}
                trend="up"
                trendValue={`+${dashboardData?.stats.engagementScore || 0}%`}
            />
          </div>

          {/* ✅ Suggested Events */}
          {dashboardData?.suggestedEvents && (
              <SuggestedEvents events={dashboardData.suggestedEvents} />
          )}

          {/* ✅ Upcoming Events */}
          {dashboardData?.upcomingEvents && (
              <UpcomingEvents events={dashboardData.upcomingEvents} />
          )}
        </main>

        <Footer />
      </div>
  );
};

export default Dashboard;
