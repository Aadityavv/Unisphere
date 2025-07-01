import React from 'react';
import { AlertTriangle, X, Loader } from 'lucide-react';

interface DeletePromptProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
  isLoading?: boolean;
}

const DeletePrompt: React.FC<DeletePromptProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  eventTitle, 
  isLoading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Delete Event</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "<strong>{eventTitle}</strong>"? This action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrompt;