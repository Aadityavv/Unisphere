import React from 'react';
import EventCard from './EventCard';

const SuggestedEvents = ({ events }) => {
  const handleEventClick = (eventId) => {
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
    </section>
  );
};

export default SuggestedEvents;