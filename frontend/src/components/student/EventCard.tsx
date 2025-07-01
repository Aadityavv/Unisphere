import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import placeholderImg from '../../assets/images/event-placeholder.jpg'

const EventCard = ({
                     title = 'Untitled Event',
                     date = '',
                     time = '',
                     club = 'General Club',
                     imgSrc = '/event-placeholder.jpg',
                     location = '',
                     attendees,
                     onClick,
                     className = ''
                   }) => {
  return (
      <div
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group ${className}`}
          onClick={onClick}
      >
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img
              src={imgSrc}
              alt={title}
              onError={(e) => { e.currentTarget.src = placeholderImg }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-800">
            {club}
          </span>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          <div className="space-y-2 mb-4 text-sm text-slate-600">
            {date && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span>{date}</span>
                </div>
            )}
            {time && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>{time}</span>
                </div>
            )}
            {location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span>{location}</span>
                </div>
            )}
            {typeof attendees === 'number' && (
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>{attendees} attending</span>
                </div>
            )}
          </div>

          <button className="w-full py-2 px-4 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-medium rounded-lg transition-all duration-200">
            View Details
          </button>
        </div>
      </div>
  );
};

export default EventCard;
