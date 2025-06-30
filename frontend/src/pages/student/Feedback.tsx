import React, { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import StarRating from '../../components/student/StarRating';
import FeedbackTextarea from '../../components/student/FeedbackTextarea';
import SubmitFeedbackButton from '../../components/student/SubmitFeedbackButton';
import { getEventById, submitFeedback } from '../../utils/apiMock';

const Feedback = ({ eventId = 1 }) => {
  const [event, setEvent] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async () => {
    const feedbackData = { rating, comment };
    console.log('Submitting feedback:', feedbackData);
    
    try {
      await submitFeedback(eventId, feedbackData);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Event Not Found</h1>
            <p className="text-slate-600">The event you're trying to provide feedback for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Event Feedback
          </h1>
          <p className="text-slate-600">
            Help us improve by sharing your experience at this event.
          </p>
        </div>

        {/* Event Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={event.imgSrc}
              alt={event.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
              <p className="text-slate-600">{event.club} • {event.date}</p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                How would you rate this event?
              </label>
              <div className="flex items-center space-x-4">
                <StarRating rating={rating} onRatingChange={setRating} />
                <span className="text-slate-600">
                  {rating > 0 && (
                    <>
                      {rating === 1 && 'Poor'}
                      {rating === 2 && 'Fair'}
                      {rating === 3 && 'Good'}
                      {rating === 4 && 'Very Good'}
                      {rating === 5 && 'Excellent'}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Comment */}
            <FeedbackTextarea
              value={comment}
              onChange={setComment}
              placeholder="Tell us what you liked about the event, what could be improved, or any other feedback you'd like to share..."
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <SubmitFeedbackButton
                onSubmit={handleSubmit}
                disabled={rating === 0}
              />
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-emerald-500 text-sm">✓</span>
              </div>
              <span>Feedback submitted successfully!</span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;