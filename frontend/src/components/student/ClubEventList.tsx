import React from 'react';
import EventCard from './EventCard';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClubEventList = ({ events }) => {
    const navigate = useNavigate();

    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };


  return (
      <section className="py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Club Events</h2>

        {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const dateObj = new Date(event.dateTime);
                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                    <EventCard
                        key={event._id}
                        title={event.title}
                        date={date}
                        time={time}
                        club={event.club?.name || ''}
                        imgSrc={event.imgSrc}
                        location={event.location}
                        attendees={event.attendees}
                        onClick={() => handleEventClick(event._id)}
                    />
                );
              })}
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
