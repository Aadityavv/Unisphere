import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import EventFilterBar from '../../components/student/EventFilterBar';
import EventCard from '../../components/student/EventCard';
import { Calendar } from 'lucide-react';
import { fetchAllEvents } from '../../utils/api';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFiltersChange = (filters: any) => {
    let list = [...events];

    if (filters.search) {
      list = list.filter(
          (e) =>
              e.title.toLowerCase().includes(filters.search.toLowerCase()) ||
              (e.clubId?.name?.toLowerCase().includes(filters.search.toLowerCase()) ?? false)
      );
    }
    if (filters.club) list = list.filter((e) => e.clubId?.name === filters.club);
    if (filters.category) list = list.filter((e) => e.category === filters.category);
    if (filters.date) {
      list = list.filter((e) =>
          new Date(e.dateTime).toLocaleDateString() === new Date(filters.date).toLocaleDateString()
      );
    }
    setFilteredEvents(list);
  };

  const handleEventClick = (id: string) => navigate(`/events/${id}`);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
      setHasMore(false); // just for demo
    }, 1000);
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin h-12 w-12 border-b-2 border-emerald-500 rounded-full" />
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover Events</h1>
            <p className="text-slate-600">Find and join exciting events happening on campus.</p>
          </header>

          <EventFilterBar onFiltersChange={handleFiltersChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredEvents.map((e) => (
                <EventCard
                    key={e._id}
                    title={e.title}
                    date={new Date(e.dateTime).toLocaleDateString()}
                    time={new Date(e.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    club={e.clubId?.name || 'General'}
                    location={e.location}
                    attendees={e.attendees || 0}
                    onClick={() => handleEventClick(e._id)}
                    imgSrc="/event-placeholder.jpg"
                />
            ))}
          </div>

          {hasMore && (
              <div className="text-center">
                <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50"
                >
                  {loadingMore ? 'Loading…' : 'Load More Events'}
                </button>
              </div>
          )}

          {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Events Found</h3>
                <p className="text-slate-600">Try adjusting your filters.</p>
              </div>
          )}
        </main>

        <Footer />
      </div>
  );
};

export default Events;
