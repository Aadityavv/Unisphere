import React from 'react';
import EventCard from './EventCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StudentsAlsoAttended = ({ events }) => {
    const handleEventClick = (eventId) => {
        console.log('Navigate to event:', eventId);
    };

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Students Also Attended</h2>
                <div className="flex space-x-2">
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                        <ChevronLeft className="h-5 w-5 text-slate-600" />
                    </button>
                    <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                        <ChevronRight className="h-5 w-5 text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, 3).map((event) => (
                    <EventCard
                        key={event._id}
                        title={event.title}
                        date={new Date(event.dateTime).toLocaleDateString()}
                        time={new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        club={event.clubId?.name || 'General Club'}
                        imgSrc={event.imgSrc || '/event-placeholder.jpg'}
                        location={event.location}
                        attendees={event.attendees || 0}
                        onClick={() => handleEventClick(event._id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default StudentsAlsoAttended;
