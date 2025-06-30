import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import EventCalendar from '../../components/faculty/EventCalendar';
import { getClubEventsForFaculty, getFacultyClubs } from '../../utils/apiMock';

const ClubEventCalendar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [events, setEvents] = useState<any[]>([]);
  const [club, setClub] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadClubData(parseInt(id));
    }
  }, [id]);

  const loadClubData = async (clubId: number) => {
    try {
      const [clubsData, eventsData] = await Promise.all([
        getFacultyClubs(),
        getClubEventsForFaculty(clubId)
      ]);
      
      const clubInfo = clubsData.find(c => c.id === clubId);
      setClub(clubInfo);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to load club data:', error);
      toast.error('Failed to load club information');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading club events...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Club Not Found</h2>
          <p className="text-gray-600 mb-4">The club you're looking for doesn't exist.</p>
          <Link
            to="/faculty/clubs"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/faculty/clubs"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{club.name} Events</h1>
              <p className="text-gray-600 mt-2">{club.description}</p>
            </div>
          </div>
          <Link
            to="/faculty/create-event"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </Link>
        </div>

        {/* Club Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{club.memberCount}</p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{club.eventsCount}</p>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{events.length}</p>
              <p className="text-sm text-gray-600">Scheduled Events</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{club.coordinator}</p>
              <p className="text-sm text-gray-600">Coordinator</p>
            </div>
          </div>
        </div>

        {/* Event Calendar */}
        <EventCalendar events={events} clubName={club.name} />
      </div>
    </div>
  );
};

export default ClubEventCalendar;