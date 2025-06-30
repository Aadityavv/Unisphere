import React from 'react';

const FeedbackTextarea = ({ value, onChange, placeholder = "Share your thoughts about this event..." }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Your Feedback
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
      />
    </div>
  );
};

export default FeedbackTextarea;