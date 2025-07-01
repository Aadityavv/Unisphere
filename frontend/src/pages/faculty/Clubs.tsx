import React, { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import FacultyClubCard from '../../components/faculty/FacultyClubCard';
import { getFacultyClubs } from '../../utils/api';
import Navbar from '../../components/shared/Navbar.tsx'

const FacultyClubs: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    loadClubs();
  }, []);

  useEffect(() => {
    filterClubs();
  }, [clubs, searchTerm, categoryFilter]);

  const loadClubs = async () => {
    try {
      const data = await getFacultyClubs();
      setClubs(data);
    } catch (error) {
      console.error('Failed to load clubs:', error);
      toast.error('Failed to load clubs');
    } finally {
      setIsLoading(false);
    }
  };

  const filterClubs = () => {
    let filtered = clubs;

    if (searchTerm) {
      filtered = filtered.filter(club =>
          club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(club => club.category?.toLowerCase() === categoryFilter);
    }

    setFilteredClubs(filtered);
  };

  const categories = ['all', 'technical', 'cultural', 'sports', 'academic'];

  return (
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Club Management</h1>
              <p className="text-gray-600 mt-2">Manage clubs and their events</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard icon={<Users className="w-6 h-6 text-blue-600" />} label="Total Clubs" value={clubs.length} bg="bg-blue-100" />
              <StatCard icon={<Users className="w-6 h-6 text-green-600" />} label="Total Members" value={clubs.reduce((sum, c) => sum + (c.memberCount || 0), 0)} bg="bg-green-100" />
              <StatCard icon={<Users className="w-6 h-6 text-purple-600" />} label="Total Events" value={clubs.reduce((sum, c) => sum + (c.eventsCount || 0), 0)} bg="bg-purple-100" />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Clubs Grid */}
            {isLoading ? (
                <div className="text-center text-gray-600">Loading clubs...</div>
            ) : filteredClubs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Clubs Found</h3>
                  <p className="text-gray-600">
                    {clubs.length === 0 ? "No clubs are available." : "No clubs match your current filters."}
                  </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClubs.map(club => (
                      <FacultyClubCard key={club._id || club.id} club={club} />
                  ))}
                </div>
            )}
          </div>
        </div>
  );
};

const StatCard = ({ icon, label, value, bg }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
);

export default FacultyClubs;
