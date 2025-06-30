import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const HighlightedEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Auditorium",
      attendees: 250,
      category: "Technology",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Cultural Heritage Festival",
      date: "March 22, 2024",
      time: "2:00 PM - 8:00 PM",
      location: "Main Campus Plaza",
      attendees: 500,
      category: "Culture",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "March 28, 2024",
      time: "1:00 PM - 6:00 PM",
      location: "Business School Hall",
      attendees: 180,
      category: "Business",
      image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      title: "Environmental Action Workshop",
      date: "April 5, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Science Building",
      attendees: 120,
      category: "Environment",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Highlighted Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most exciting upcoming events on campus
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 transform"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-80`}></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 font-medium rounded-lg transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transform transition-all duration-200">
            <span>View All Events</span>
            <div className="ml-1">→</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighlightedEvents;