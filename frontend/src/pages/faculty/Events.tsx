// src/pages/faculty/Events.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import FacultyEventCard from '../../components/faculty/FacultyEventCard';
import DeletePrompt from '../../components/faculty/DeletePrompt';
import Navbar from '../../components/shared/Navbar';
import axios from '../../utils/api';

const FacultyEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletePrompt, setDeletePrompt] = useState<{ isOpen: boolean; event: any }>({
    isOpen: false,
    event: null
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, statusFilter]);

  const loadEvents = async () => {
    try {
      const res = await axios.get('/events');
      // Filter events created by the logged-in faculty
      const createdEvents = res.data.filter((e: any) => e.organizerId?._id === JSON.parse(localStorage.getItem('user') || '{}')._id);

      const enriched = createdEvents.map((event: any) => ({
        _id: event._id,
        title: event.title,
        description: event.description,
        date: dayjs(event.dateTime).format('YYYY-MM-DD'),
        time: dayjs(event.dateTime).format('hh:mm A'),
        dateTime: event.dateTime,
        location: event.location || 'Campus',
        category: event.category || 'General',
        club: event.clubId?.name || 'N/A',
        status: dayjs(event.dateTime).isAfter(dayjs()) ? 'upcoming' : 'completed',
        registeredCount: event.registrationCount || 0,
        maxCapacity: 50 // or dynamic if available
      }));

      setEvents(enriched);
    } catch (error) {
      console.error('Failed to load events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await axios.delete(`/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully');
      setDeletePrompt({ isOpen: false, event: null });
    } catch (error) {
      console.error('Failed to delete event:', error);
      toast.error('Failed to delete event');
    }
  };

  const openDeletePrompt = (event: any) => {
    setDeletePrompt({ isOpen: true, event });
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100">
        {/* ✅ Faculty Navbar */}
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
              <p className="text-gray-600 mt-2">Manage your created events</p>
            </div>
            <Link
                to="/faculty/create-event"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
                <p className="text-gray-600 mb-4">
                  {events.length === 0
                      ? "You haven't created any events yet."
                      : "No events match your current filters."
                  }
                </p>
                {events.length === 0 && (
                    <Link
                        to="/faculty/create-event"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Event
                    </Link>
                )}
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <FacultyEventCard event={{ ...event, _id: event.id }} onDelete={openDeletePrompt} />
                ))}
              </div>
          )}

          {/* Delete Confirmation */}
          <DeletePrompt
              isOpen={deletePrompt.isOpen}
              onClose={() => setDeletePrompt({ isOpen: false, event: null })}
              onConfirm={() => handleDeleteEvent(deletePrompt.event?.id)}
              eventTitle={deletePrompt.event?.title || ''}
          />
        </div>
      </div>
  );
};

export default FacultyEvents;
