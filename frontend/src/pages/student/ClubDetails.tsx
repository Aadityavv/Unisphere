import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import ClubHeader from '../../components/student/ClubHeader';
import ClubEventList from '../../components/student/ClubEventList';
import ClubMemberList from '../../components/student/ClubMemberList';
import API from '../../utils/api';

const ClubDetails: React.FC = () => {
    const { clubId } = useParams();
    const [club, setClub] = useState<any | null>(null);
    const [clubEvents, setClubEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const [clubRes, eventsRes] = await Promise.all([
                    API.get(`/clubs/${clubId}`),
                    API.get(`/clubs/club/${clubId}`),
                ]);

                setClub(clubRes.data);
                setClubEvents(eventsRes.data || []);
            } catch (e) {
                console.error('Error fetching club:', e);
            } finally {
                setLoading(false);
            }
        };

        if (clubId) fetchClubDetails();
    }, [clubId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin h-12 w-12 border-b-2 border-emerald-500 rounded-full" />
                </div>
            </div>
        );
    }

    if (!club) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Club Not Found</h1>
                    <p className="text-slate-600">This club does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ClubHeader club={club} />
                <ClubEventList events={clubEvents} />
                <ClubMemberList members={club.members || []} />
            </main>
            <Footer />
        </div>
    );
};

export default ClubDetails;
