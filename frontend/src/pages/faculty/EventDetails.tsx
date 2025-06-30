import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import EventMetaEditable from '../../components/faculty/EventMetaEditable';
import RegisteredList from '../../components/faculty/RegisteredList';
import SendReminderButton from '../../components/faculty/SendReminderButton';
import CheckInQRScanner from '../../components/faculty/CheckInQRScanner';
import { getFacultyEventById, updateFacultyEvent } from '../../utils/apiMock';

const FacultyEventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      loadEvent(parseInt(id));
    }
  }, [id]);

  const loadEvent = async (eventId: number) => {
    try {
      const data = await getFacultyEventById(eventId);
      if (data) {
        setEvent(data);
      } else {
        toast.error('Event not found');
      }
    } catch (error) {
      console.error('Failed to load event:', error);
      toast.error('Failed to load event details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEvent = async (updatedData: any) => {
    if (!event) return;
    
    setIsUpdating(true);
    try {
      const updated = await updateFacultyEvent(event.id, updatedData);
      setEvent({ ...event, ...updated });
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Failed to update event:', error);
      toast.error('Failed to update event');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Link
            to="/faculty/events"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/faculty/events"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Details</h1>
              <p className="text-gray-600 mt-2">Manage event information and attendance</p>
            </div>
          </div>
          <Link
            to={`/faculty/edit/${event.id}`}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
          >
            <Edit className="w-5 h-5 mr-2" />
            Edit Event
          </Link>
        </div>

        <div className="space-y-6">
          {/* Event Meta */}
          <EventMetaEditable
            event={event}
            onUpdate={handleUpdateEvent}
            isLoading={isUpdating}
          />

          {/* Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SendReminderButton
              eventId={event.id}
              eventTitle={event.title}
              registeredCount={event.registeredCount}
            />
            <CheckInQRScanner
              eventId={event.id}
              eventTitle={event.title}
            />
          </div>

          {/* Registered Students */}
          <RegisteredList
            students={event.registeredStudentsList || []}
            eventTitle={event.title}
          />
        </div>
      </div>
    </div>
  );
};

export default FacultyEventDetails;