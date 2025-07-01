import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import EventForm from '../../components/faculty/EventForm';
import axios from '../../utils/api';

interface CreateEditEventProps {
  mode: 'create' | 'edit';
}

const CreateEditEvent: React.FC<CreateEditEventProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(mode === 'edit');
  const [clubs, setClubs] = useState([]);

  // Fetch clubs from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get('/clubs');
        setClubs(res.data);
      } catch (err) {
        toast.error('Failed to load clubs');
      }
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    if (mode === 'edit' && id) {
      loadEventData(id);
    }
  }, [mode, id]);

  const loadEventData = async (eventId: string) => {
    try {
      const res = await axios.get(`/events/${eventId}`);
      const data = res.data;
      setInitialData({
        title: data.title,
        date: data.dateTime.split('T')[0],
        time: new Date(data.dateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        location: data.location,
        category: data.category,
        club: data.clubId?._id || '',
        description: data.description,
        maxCapacity: data.maxCapacity
      });
    } catch (error) {
      toast.error('Failed to load event data');
      navigate('/faculty/events');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const { club, date, time, ...rest } = data;
      const dateTime = new Date(`${date}T${time}`);

      if (mode === 'create') {
        await axios.post('/events/create', { ...rest, clubId: club, dateTime });
        toast.success('Event created successfully!');
      } else if (mode === 'edit' && id) {
        await axios.put(`/events/${id}`, { ...rest, clubId: club, dateTime });
        toast.success('Event updated successfully!');
      }

      navigate('/faculty/events');
    } catch (error) {
      toast.error(`Failed to ${mode} event`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event data...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link
                to="/faculty/events"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Event' : 'Edit Event'}
              </h1>
              <p className="text-gray-600 mt-2">
                {mode === 'create' ? 'Fill in the details to create a new event' : 'Update the event information'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <EventForm
                initialData={initialData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                clubOptions={clubs}
            />
          </div>
        </div>
      </div>
  );
};

export default CreateEditEvent;
