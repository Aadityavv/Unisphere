import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import EventBanner from '../../components/student/EventBanner';
import EventMeta from '../../components/student/EventMeta';
import RegisterButton from '../../components/student/RegisterButton';
import StudentsAlsoAttended from '../../components/student/StudentsAlsoAttended';
import API, { fetchEventById, fetchAllEvents } from '../../utils/api';

const EventDetails: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const id = eventId!;

  const [event, setEvent] = useState<any | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const [eventData, allEvents] = await Promise.all([
          fetchEventById(id),
          fetchAllEvents(),
        ]);

        setEvent(eventData);
        const related = allEvents.filter((e: any) => e._id !== id).slice(0, 3);
        setRelatedEvents(related);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    try {
      // Update this line to use '/api/registration/events/:id/register'
      const res = await API.post(`/registration/events/${id}/register`);  // Corrected URL path
      if (res.status === 201) {
        setEvent((prev: any) => ({ ...prev, registered: true }));
      }
    } catch (e) {
      console.error('Error registering:', e);
    }
  };



  const handleBack = () => navigate('/events');

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

  if (!event) {
    return (
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Event Not Found</h1>
            <p className="text-slate-600">The event you’re looking for doesn’t exist.</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <EventBanner event={event} onBack={handleBack} />
          <EventMeta event={event} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Join This Event</h2>
                <p className="text-slate-600">
                  {event.registered
                      ? "You're registered! Show your QR code at the entrance."
                      : 'Register now to secure your spot and receive updates.'}
                </p>
              </div>
              {event.registered ? (
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold">
    Already Registered
  </span>
              ) : (
                  <RegisterButton event={event} onRegister={handleRegister} />
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About This Event</h2>
            <p className="text-slate-600 leading-relaxed">{event.description}</p>
          </div>

          {relatedEvents.length > 0 && <StudentsAlsoAttended events={relatedEvents} />}
        </main>

        <Footer />
      </div>
  );
};

export default EventDetails;
