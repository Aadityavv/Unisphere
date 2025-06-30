import React from 'react';
import EventCard from './EventCard';

const ClubEventList = ({ events }) => {
  const handleEventClick = (eventId) => {
    console.log('Navigate to event:', eventId);
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Club Events</h2>
      
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      ) : (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No Events Yet</h3>
          <p className="text-slate-600">This club hasn't organized any events recently.</p>
        </div>
      )}
    </section>
  );
};

export default ClubEventList;