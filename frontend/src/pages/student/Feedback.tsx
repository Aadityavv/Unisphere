import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import StarRating from '../../components/student/StarRating';
import FeedbackTextarea from '../../components/student/FeedbackTextarea';
import SubmitFeedbackButton from '../../components/student/SubmitFeedbackButton';
import { getEventById, submitFeedback } from '../../utils/apiMock';

const Feedback: React.FC = () => {
  const { eventId } = useParams();
  const id = Number(eventId);

  const [event, setEvent] = useState<any | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const evt = await getEventById(id);
        setEvent(evt);
      } catch (e) {
        console.error('Error fetching event:', e);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(id)) fetchEvent();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await submitFeedback(id, { rating, comment });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setRating(0);
      setComment('');
    } catch (e) {
      console.error('Error submitting feedback:', e);
    }
  };

  /* Loading + Not-found states */
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

  if (!event) {
    return (
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Event Not Found</h1>
            <p className="text-slate-600">The event you’re trying to review doesn’t exist.</p>
          </div>
        </div>
    );
  }

  /* Page */
  return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Event Feedback</h1>
            <p className="text-slate-600">Help us improve by sharing your experience.</p>
          </header>

          {/* Event Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center space-x-4">
            <img src={event.imgSrc} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
              <p className="text-slate-600">
                {event.club} • {event.date}
              </p>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                How would you rate this event?
              </label>
              <div className="flex items-center space-x-4">
                <StarRating rating={rating} onRatingChange={setRating} />
                <span className="text-slate-600">
                {rating > 0 && ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1]}
              </span>
              </div>
            </div>

            <FeedbackTextarea
                value={comment}
                onChange={setComment}
                placeholder="Tell us what you liked or what could be improved…"
            />

            <div className="flex justify-end">
              <SubmitFeedbackButton onSubmit={handleSubmit} disabled={rating === 0} />
            </div>
          </div>

          {/* Toast */}
          {showSuccess && (
              <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
                Feedback submitted successfully!
              </div>
          )}
        </main>

        <Footer />
      </div>
  );
};

export default Feedback;
