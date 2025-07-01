import { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import AttendanceTable from '../../components/student/AttendanceTable';
import ParticipationGraph from '../../components/student/ParticipationGraph';
import { getAttendanceByUserId } from '../../utils/api';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')!); // user._id is needed
        const data = await getAttendanceByUserId(user._id);
        const formatted = data.map((record: any) => ({
          eventTitle: record.eventId?.title || 'Untitled',
          date: new Date(record.eventId?.dateTime).toLocaleDateString(),
          status: record.status === 'present' ? 'Attended' : 'Missed',
          rating: record.rating || null,
        }));
        setAttendance(formatted);

      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Attendance History
          </h1>
          <p className="text-slate-600">
            Track your event participation and engagement over time.
          </p>
        </div>

        {/* Participation Graph */}
        <div className="mb-8">
          <ParticipationGraph attendance={attendance} />
        </div>

        {/* Attendance Table */}
        <AttendanceTable attendance={attendance} />
      </main>

      <Footer />
    </div>
  );
};

export default Attendance;