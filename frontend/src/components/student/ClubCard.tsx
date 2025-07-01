import React from 'react';
import { Users } from 'lucide-react';

const ClubCard = ({ club, onClick }) => {
  return (
      <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group"
          onClick={onClick}
      >
        <div className="relative h-48 overflow-hidden">
          <img
              src={club.logo}
              alt={club.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          {club.joined && (
              <div className="absolute top-4 right-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Joined
            </span>
              </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
            {club.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{club.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Users className="h-4 w-4 text-emerald-500" />
              <span>{club.memberCount || 0} members</span>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View Details →
            </button>
          </div>
        </div>
      </div>
  );
};

export default ClubCard;
