import React from 'react';
import QRCode from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

const QRDisplay = ({ eventId }) => {
  const qrValue = `QR_EVENT_${eventId}_USER123`;

  const handleDownload = () => {
    console.log('Download QR code for event:', eventId);
  };

  const handleShare = () => {
    console.log('Share QR code for event:', eventId);
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Event QR Code</h3>
      
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 inline-block mb-4">
        <QRCode 
          value={qrValue}
          size={200}
          level="M"
          includeMargin={true}
        />
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        Show this QR code at the event entrance for quick check-in
      </p>
      
      <div className="flex justify-center space-x-3">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default QRDisplay;