import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../../utils/api';

interface CreateEditClubProps {
    mode: 'create' | 'edit';
}

const CreateEditClub: React.FC<CreateEditClubProps> = ({ mode }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(mode === 'edit');

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Load existing club data if in edit mode
    useEffect(() => {
        if (mode === 'edit' && id) {
            loadClubData(id);
        }
    }, [mode, id]);

    const loadClubData = async (clubId: string) => {
        try {
            const res = await axios.get(`/clubs/${clubId}`);
            const data = res.data;
            setFormData({
                name: data.name || '',
                description: data.description || '',
            });
        } catch (err) {
            toast.error('Failed to load club data');
            navigate('/faculty/clubs');
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (mode === 'create') {
                await axios.post('/clubs/create', {
                    ...formData,
                    facultyLeadId: user._id,
                });
                toast.success('Club created successfully!');
            } else if (mode === 'edit' && id) {
                await axios.put(`/clubs/${id}`, formData);
                toast.success('Club updated successfully!');
            }

            navigate('/faculty/clubs');
        } catch (error: any) {
            if (error?.response?.data?.message === 'Club name already exists') {
                toast.error('Club name already exists. Choose another.');
            } else {
                toast.error(`Failed to ${mode} club`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading club data...</p>
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
                        to="/faculty/clubs"
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {mode === 'create' ? 'Create New Club' : 'Edit Club'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {mode === 'create'
                                ? 'Fill in the details to create a new club'
                                : 'Update club details'}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Club Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full px-4 py-2 font-semibold text-white rounded-lg ${
                                    isLoading
                                        ? 'bg-blue-400'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } transition`}
                            >
                                {isLoading
                                    ? mode === 'create'
                                        ? 'Creating...'
                                        : 'Updating...'
                                    : mode === 'create'
                                        ? 'Create Club'
                                        : 'Update Club'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEditClub;
