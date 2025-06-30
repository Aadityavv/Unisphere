import React, { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import ClubHeader from '../../components/student/ClubHeader';
import ClubEventList from '../../components/student/ClubEventList';
import ClubMemberList from '../../components/student/ClubMemberList';
import { getClubById, getEvents } from '../../utils/apiMock';

const ClubDetails = ({ clubId = 1 }) => {
  const [club, setClub] = useState(null);
  const [clubEvents, setClubEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const [clubData, allEvents] = await Promise.all([
          getClubById(clubId),
          getEvents()
        ]);
        
        setClub(clubData);
        // Filter events by club
        const events = allEvents.filter(event => event.club === clubData.name);
        setClubEvents(events);
      } catch (error) {
        console.error('Error fetching club details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);

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

  if (!club) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Club Not Found</h1>
            <p className="text-slate-600">The club you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Club Header */}
        <ClubHeader club={club} />

        {/* Club Events */}
        <ClubEventList events={clubEvents} />

        {/* Club Members */}
        <ClubMemberList />
      </main>

      <Footer />
    </div>
  );
};

export default ClubDetails;