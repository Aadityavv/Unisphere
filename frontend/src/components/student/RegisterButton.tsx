import React, { useState } from 'react';
import { Check, Calendar, QrCode } from 'lucide-react';
import QRDisplay from './QRDisplay';

const RegisterButton = ({ event, onRegister }) => {
  const [showQR, setShowQR] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    console.log("Register", event.id);
    
    // Simulate API call
    setTimeout(() => {
      onRegister(event.id);
      setIsRegistering(false);
    }, 1000);
  };

  if (event.registered) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200">
            <Check className="h-5 w-5" />
            <span className="font-medium">Registered</span>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <QrCode className="h-5 w-5" />
            <span>{showQR ? 'Hide QR Code' : 'Show QR Code'}</span>
          </button>
        </div>
        
        {showQR && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <QRDisplay eventId={event.id} />
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleRegister}
      disabled={isRegistering}
      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <Calendar className="h-5 w-5" />
      <span>{isRegistering ? 'Registering...' : 'Register for Event'}</span>
    </button>
  );
};

export default RegisterButton;