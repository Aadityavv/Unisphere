import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Event {
    _id: string;
    title: string;
    dateTime: string;
    location: string;
    clubId?: { name: string };
}

interface UpcomingEventsProps {
    events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    const navigate = useNavigate();

    const handleEventClick = (eventId: string) => {
        navigate(`/events/${eventId}`);
    };


    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    View Calendar →
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {events.map((event, index) => (
                    <div
                        key={event._id}
                        className={`p-6 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group ${
                            index !== events.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                        onClick={() => handleEventClick(event._id)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                                    {event.title}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-slate-600">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4 text-emerald-500" />
                                        <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <span>{new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="h-4 w-4 text-orange-500" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className="mt-2">
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                    {event.clubId?.name || 'General'}
                  </span>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UpcomingEvents;
