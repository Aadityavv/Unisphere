import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';
import dayjs from 'dayjs';

interface PastEvent {
  id: number;
  title: string;
  date: string;
  attendees: number;
  status: string;
}

interface PastEventListProps {
  events: PastEvent[];
}

const PastEventList: React.FC<PastEventListProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {dayjs(event.date).format('MMM DD, YYYY')}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {event.attendees} attendees
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                event.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEventList;