import React, { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import EventFilterBar from '../../components/student/EventFilterBar';
import EventCard from '../../components/student/EventCard';
import { getEvents } from '../../utils/apiMock';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...events];

    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.club.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.club) {
      filtered = filtered.filter(event => event.club === filters.club);
    }

    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters.date) {
      filtered = filtered.filter(event => event.date === filters.date);
    }

    if (filters.recommendedOnly) {
      // Mock recommended logic - in real app this would be based on user preferences
      filtered = filtered.filter(event => event.id % 2 === 0);
    }

    setFilteredEvents(filtered);
  };

  const handleEventClick = (eventId) => {
    console.log('Navigate to event details:', eventId);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate loading more events
    setTimeout(() => {
      setLoadingMore(false);
      setHasMore(false); // For demo purposes
    }, 1000);
  };

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
            Discover Events
          </h1>
          <p className="text-slate-600">
            Find and join exciting events happening around campus.
          </p>
        </div>

        {/* Filters */}
        <EventFilterBar onFiltersChange={handleFiltersChange} />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              club={event.club}
              imgSrc={event.imgSrc}
              location={event.location}
              attendees={event.attendees}
              onClick={() => handleEventClick(event.id)}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loadingMore ? 'Loading...' : 'Load More Events'}
            </button>
          </div>
        )}

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Events Found</h3>
            <p className="text-slate-600">Try adjusting your filters to see more events.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Events;