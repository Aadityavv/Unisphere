import React from 'react';
import { Calendar, Clock, MapPin, User, Users } from 'lucide-react';

const EventMeta = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Event Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start space-x-3">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Calendar className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Date</p>
            <p className="text-slate-600">{event.date}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Time & Duration</p>
            <p className="text-slate-600">{event.time}</p>
            <p className="text-sm text-slate-500">{event.duration}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Location</p>
            <p className="text-slate-600">{event.location}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Attendees</p>
            <p className="text-slate-600">{event.attendees} registered</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Organized by</p>
              <p className="text-slate-600">{event.club}</p>
              <p className="text-sm text-slate-500">Faculty Organizer: {event.organizer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMeta;