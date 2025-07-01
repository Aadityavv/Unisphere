import React, { useState } from 'react';
import { Filter, Search, Calendar, Tag, Users } from 'lucide-react';

const EventFilterBar = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    club: '',
    category: '',
    date: '',
    recommendedOnly: false,
  });

  const clubs = [
    { label: 'All Clubs', value: '' },
    { label: 'Tech Society', value: 'Tech Society' },
    { label: 'International Club', value: 'International Club' },
    { label: 'Entrepreneurship Club', value: 'Entrepreneurship Club' },
    { label: 'Green Society', value: 'Green Society' },
    { label: 'Photography Club', value: 'Photography Club' },
  ];

  const categories = [
    { label: 'All Categories', value: '' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Culture', value: 'Culture' },
    { label: 'Business', value: 'Business' },
    { label: 'Environment', value: 'Environment' },
    { label: 'Arts', value: 'Arts' },
    { label: 'Career', value: 'Career' },
    { label: 'Sports', value: 'Sports' },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    console.log('Filters changed:', newFilters);
  };

  return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 sticky top-20 z-40">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-900">Filter Events</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Club Filter */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
                value={filters.club}
                onChange={(e) => handleFilterChange('club', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
            >
              {clubs.map(({ label, value }) => (
                  <option key={label} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(({ label, value }) => (
                  <option key={label} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Recommended Only */}
          <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="recommended"
                checked={filters.recommendedOnly}
                onChange={(e) => handleFilterChange('recommendedOnly', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="recommended" className="text-sm font-medium text-slate-700">
              Recommended Only
            </label>
          </div>
        </div>
      </div>
  );
};

export default EventFilterBar;
