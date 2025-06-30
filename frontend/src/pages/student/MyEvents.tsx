import React, { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import RegisteredEventCard from '../../components/student/RegisteredEventCard';
import { getRegisteredEvents } from '../../utils/apiMock';

const MyEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const data = await getRegisteredEvents();
        setRegisteredEvents(data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
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
            My Events
          </h1>
          <p className="text-slate-600">
            Manage your registered events and access your QR codes.
          </p>
        </div>

        {/* Registered Events */}
        {registeredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((event) => (
              <RegisteredEventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Registered Events</h3>
            <p className="text-slate-600 mb-6">
              You haven't registered for any events yet. Discover exciting events happening on campus!
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
              Browse Events
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyEvents;