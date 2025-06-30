import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

const SubmitFeedbackButton = ({ onSubmit, disabled = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await onSubmit();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <button
        disabled
        className="flex items-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium"
      >
        <Check className="h-5 w-5" />
        <span>Feedback Submitted!</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={disabled || isSubmitting}
      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <Send className="h-5 w-5" />
      <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
    </button>
  );
};

export default SubmitFeedbackButton;