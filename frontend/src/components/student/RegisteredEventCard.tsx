import React, { useState } from 'react';
import { Calendar, MapPin, QrCode, Clock } from 'lucide-react';
import QRDisplay from './QRDisplay';

const RegisteredEventCard = ({ event }) => {
  const [showQRModal, setShowQRModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const dateObj = new Date(event.dateTime);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
      <>
        <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => setShowQRModal(true)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 text-lg">{event.title}</h3>
            <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(event.status || 'Confirmed')}`}>
              {event.status || 'Confirmed'}
            </span>
              <QrCode className="h-5 w-5 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-emerald-500" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{time}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-slate-500">Click to view QR code</p>
          </div>
        </div>

        {/* QR Modal */}
        {showQRModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                  <button
                      onClick={() => setShowQRModal(false)}
                      className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
                <QRDisplay eventId={event._id} />
              </div>
            </div>
        )}
      </>
  );
};

export default RegisteredEventCard;
