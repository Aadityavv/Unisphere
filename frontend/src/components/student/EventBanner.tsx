import React from 'react';
import { ArrowLeft } from 'lucide-react';

const EventBanner = ({ event, onBack }) => {
  return (
    <div className="relative h-96 overflow-hidden rounded-2xl mb-8">
      <img
        src={event.imgSrc}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-medium">Back to Events</span>
      </button>

      {/* Event Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-4xl">
          <div className="mb-4">
            <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {event.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;