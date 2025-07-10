import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import dayjs from 'dayjs';
import StatusTag from './StatusTag';

interface CalendarEvent {
  _id: string;
  title: string;
  dateTime: string; // from backend
  status?: string;
  attendees?: number;
}

interface EventCalendarProps {
  events: CalendarEvent[];
  clubName: string;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, clubName }) => {
  const sortedEvents = [...events].sort((a, b) =>
      dayjs(a.dateTime).diff(dayjs(b.dateTime))
  );

  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const month = dayjs(event.dateTime).format('MMMM YYYY');
    if (!groups[month]) groups[month] = [];
    groups[month].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);

  return (
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <div key={month} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {month}
              </h3>

              <div className="space-y-3">
                {monthEvents.map((event) => (
                    <div
                        key={event._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <StatusTag status={event.status || 'pending'} />
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {dayjs(event.dateTime).format('MMM DD, YYYY')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {dayjs(event.dateTime).format('hh:mm A')}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.attendees || 0} attendees
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        ))}

        {events.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Scheduled</h3>
              <p className="text-gray-600">No events have been scheduled for {clubName} yet.</p>
            </div>
        )}
      </div>
  );
};

export default EventCalendar;
