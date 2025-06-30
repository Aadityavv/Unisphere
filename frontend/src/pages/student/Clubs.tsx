import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import ClubCard from '../../components/student/ClubCard';
import { getClubs } from '../../utils/apiMock';

const Clubs: React.FC = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setClubs(await getClubs());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClubClick = (id: number) => navigate(`/clubs/${id}`);

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

  return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Clubs</h1>
            <p className="text-slate-600">Discover and join clubs that match your interests.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubs.map((c) => (
                <ClubCard key={c.id} club={c} onClick={() => handleClubClick(c.id)} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Clubs;
