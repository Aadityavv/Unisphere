import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface SendReminderButtonProps {
  eventId: number;
  eventTitle: string;
  registeredCount: number;
}

const SendReminderButton: React.FC<SendReminderButtonProps> = ({ 
  eventId, 
  eventTitle, 
  registeredCount 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendReminder = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(`Reminder sent to ${registeredCount} students!`);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Send Event Reminder
          </h3>
          <p className="text-gray-600 mt-1">
            Notify all {registeredCount} registered students about the upcoming event
          </p>
        </div>
        <button
          onClick={handleSendReminder}
          disabled={isLoading || registeredCount === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? 'Sending...' : 'Send Reminder'}
        </button>
      </div>
    </div>
  );
};

export default SendReminderButton;