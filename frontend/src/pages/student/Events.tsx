import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import EventFilterBar from '../../components/student/EventFilterBar';
import EventCard from '../../components/student/EventCard';
import { Calendar } from 'lucide-react';
import { getEvents } from '../../utils/apiMock';

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
        const data = await getEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* -------- Filters -------- */
  const handleFiltersChange = (filters: any) => {
    let list = [...events];

    if (filters.search) {
      list = list.filter(
          (e) =>
              e.title.toLowerCase().includes(filters.search.toLowerCase()) ||
              e.club.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }
    if (filters.club) list = list.filter((e) => e.club === filters.club);
    if (filters.category) list = list.filter((e) => e.category === filters.category);
    if (filters.date) list = list.filter((e) => e.date === filters.date);
    if (filters.recommendedOnly) list = list.filter((e) => e.id % 2 === 0);

    setFilteredEvents(list);
  };

  const handleEventClick = (id: number) => navigate(`/events/${id}`);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
      setHasMore(false); // demo
    }, 1000);
  };

  /* -------- Loading -------- */
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

  /* -------- Page -------- */
  return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover Events</h1>
            <p className="text-slate-600">Find and join exciting events happening on campus.</p>
          </header>

          <EventFilterBar onFiltersChange={handleFiltersChange} />

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredEvents.map((e) => (
                <EventCard key={e.id} {...e} onClick={() => handleEventClick(e.id)} />
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
