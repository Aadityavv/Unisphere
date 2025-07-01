import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import RegisteredEventCard from '../../components/student/RegisteredEventCard';
import API from '../../utils/api';

const MyEvents: React.FC = () => {
    const navigate = useNavigate();
    const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (!user || !user._id) {
                    console.error('User not found in localStorage');
                    return;
                }

                const response = await API.get(`/events/student/${user._id}`);
                const events = response.data || [];

                setRegisteredEvents(events);
            } catch (e) {
                console.error('Failed to fetch registered events:', e);
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">My Events</h1>
                    <p className="text-slate-600">Manage your registrations and QR passes.</p>
                </header>

                {registeredEvents.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {registeredEvents.map((e) => (
                            <RegisteredEventCard key={e._id} event={e} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Calendar className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No Registered Events</h3>
                        <p className="text-slate-600 mb-6">
                            You haven’t registered for any events yet. Explore what’s happening!
                        </p>
                        <button
                            onClick={() => navigate('/events')}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
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
