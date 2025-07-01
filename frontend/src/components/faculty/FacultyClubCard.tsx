import React from 'react';
import { Users, Calendar, Eye, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Club {
  _id: string;
  name: string;
  description: string;
  memberCount: number;
  eventsCount: number;
  category?: string;
  coordinator?: string;
  established?: string;
}

interface FacultyClubCardProps {
  club: Club;
}

const FacultyClubCard: React.FC<FacultyClubCardProps> = ({ club }) => {
  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-100 text-gray-800';

    switch (category.toLowerCase()) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'cultural': return 'bg-purple-100 text-purple-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{club.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{club.description}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(club.category)}`}>
          {club.category || 'Uncategorized'}
        </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {club.memberCount} members
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {club.eventsCount > 0 ? `${club.eventsCount} events` : 'No events yet'}
          </div>
        </div>

        <div className="border-t pt-4 text-sm text-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div><span className="font-medium">Coordinator:</span> {club.coordinator || '—'}</div>
            <div>Est. {club.established || '—'}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
                to={`/faculty/clubs/${club._id}/events`}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Events
            </Link>

            <Link
                to={`/faculty/clubs/${club._id}/manage`}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
  );
};

export default FacultyClubCard;
