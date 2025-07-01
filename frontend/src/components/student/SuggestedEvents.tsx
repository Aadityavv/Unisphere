import React from 'react';
import EventCard from './EventCard';

interface Event {
    _id: string;
    title: string;
    dateTime: string;
    location: string;
    clubId?: { name: string }; // if populated
    attendees?: number;
}

interface SuggestedEventsProps {
    events: Event[];
}

const SuggestedEvents: React.FC<SuggestedEventsProps> = ({ events }) => {
    const handleEventClick = (eventId: string) => {
        console.log('Navigate to event:', eventId);
    };

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Suggested Events</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    View All →
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        title={event.title}
                        date={new Date(event.dateTime).toLocaleDateString()}
                        time={new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        club={event.clubId?.name || 'General'}
                        location={event.location}
                        attendees={event.attendees || 0}
                        imgSrc="/event-placeholder.jpg"
                        onClick={() => handleEventClick(event._id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default SuggestedEvents;
