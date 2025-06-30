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

export default StudentsAlsoAttended;