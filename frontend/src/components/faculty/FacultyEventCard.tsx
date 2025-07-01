import React from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import StatusTag from './StatusTag';

interface FacultyEvent {
  _id: string; // <-- changed from id: number to _id: string
  title: string;
  description: string;
  dateTime: string;
  location: string;
  category: string;
  club: string;
  status: string;
  registeredCount: number;
  maxCapacity: number;
}

interface FacultyEventCardProps {
  event: FacultyEvent;
  onDelete: (_id: string) => void; // id type changed to string
}

const FacultyEventCard: React.FC<FacultyEventCardProps> = ({ event, onDelete }) => {
  const isUpcoming = dayjs(event.dateTime).isAfter(dayjs());
  const isPast = dayjs(event.dateTime).isBefore(dayjs());

  return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
          </div>
          <StatusTag status={event.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {dayjs(event.dateTime).format('MMM DD, YYYY')}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {dayjs(event.dateTime).format('hh:mm A')}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {event.registeredCount}/{event.maxCapacity}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {event.category}
          </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
            {event.club}
          </span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
                to={`/faculty/events/${event._id}`}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>

            {isUpcoming && (
                <Link
                    to={`/faculty/edit/${event._id}`}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit Event"
                >
                  <Edit className="w-4 h-4" />
                </Link>
            )}

            <button
                onClick={() => onDelete(event._id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Event"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default FacultyEventCard;
