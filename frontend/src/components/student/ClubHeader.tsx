import React, { useState, useEffect } from 'react';
import { Users, Calendar, Check } from 'lucide-react';
import API from '../../utils/api'; // For API calls

const ClubHeader = ({ club }) => {
    const [isJoined, setIsJoined] = useState(false); // Track club membership status

    // Check if the student has already joined the club
    useEffect(() => {
        const checkMembership = async () => {
            try {
                const response = await API.get(`/clubs/${club._id}/joined`);
                setIsJoined(response.data.joined); // Update state based on response
            } catch (e) {
                console.error('Error checking membership:', e);
            }
        };

        checkMembership();
    }, [club._id]); // Run only when club._id changes

    // Handle joining the club
    const handleJoinClub = async () => {
        try {
            const response = await API.post(`/clubs/${club._id}/join`);
            if (response.status === 201) {
                setIsJoined(true); // Update button to "Already Joined"
            }
        } catch (e) {
            console.error('Error joining club:', e);
        }
    };

    return (
        <div className="relative h-64 overflow-hidden rounded-2xl mb-8">
            <img
                src={club.logo}
                alt={club.name}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{club.name}</h1>
                        <p className="text-xl text-white/90 mb-4">{club.description}</p>
                        <div className="flex items-center space-x-4 text-white/80">
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5" />
                                <span>{club.memberCount || 0} members</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>{club.events?.length || 0} events</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {isJoined ? (
                            <div className="flex items-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-xl">
                                <Check className="h-5 w-5" />
                                <span className="font-medium">Joined</span>
                            </div>
                        ) : (
                            <button
                                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
                                onClick={handleJoinClub}
                            >
                                Join Club
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubHeader;
