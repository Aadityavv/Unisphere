import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MapPin, Tag, Users, FileText } from 'lucide-react';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
  club: z.string().min(1, 'Club is required'),
  description: z.string().min(30, 'Description must be at least 30 characters'),
  maxCapacity: z.number().min(1, 'Capacity must be at least 1')
});

type EventFormData = z.infer<typeof eventSchema>;

interface ClubOption {
  _id: string;
  name: string;
}

interface EventFormProps {
  initialData?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
  isLoading?: boolean;
  clubOptions: ClubOption[];
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit, isLoading = false, clubOptions }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      maxCapacity: 30,
      ...initialData
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const categories = ['Technical', 'Cultural', 'Sports', 'Academic', 'Social'];

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Event Title
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                {...register('title')}
                type="text"
                id="title"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter event title"
            />
          </div>
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                  {...register('date')}
                  type="date"
                  id="date"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                  {...register('time')}
                  type="time"
                  id="time"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.time ? 'border-red-300' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                {...register('location')}
                type="text"
                id="location"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter event location"
            />
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>

        {/* Category & Club */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                  {...register('category')}
                  id="category"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          <div>
            <label htmlFor="club" className="block text-sm font-medium text-gray-700 mb-2">Club</label>
            <select
                {...register('club')}
                id="club"
                className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.club ? 'border-red-300' : 'border-gray-300'
                }`}
            >
              <option value="">Select club</option>
              {clubOptions.map((club) => (
                  <option key={club._id} value={club._id}>{club.name}</option>
              ))}
            </select>
            {errors.club && <p className="mt-1 text-sm text-red-600">{errors.club.message}</p>}
          </div>
        </div>

        {/* Max Capacity */}
        <div>
          <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700 mb-2">Maximum Capacity</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                {...register('maxCapacity', { valueAsNumber: true })}
                type="number"
                id="maxCapacity"
                min="1"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.maxCapacity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter maximum capacity"
            />
          </div>
          {errors.maxCapacity && <p className="mt-1 text-sm text-red-600">{errors.maxCapacity.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
              {...register('description')}
              id="description"
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter event description (minimum 30 characters)"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? 'Saving...' : 'Save Event'}
        </button>
      </form>
  );
};

export default EventForm;
