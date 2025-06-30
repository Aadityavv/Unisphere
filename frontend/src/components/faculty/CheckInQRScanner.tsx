import React from 'react';
import { QrCode, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CheckInQRScannerProps {
  eventId: number;
  eventTitle: string;
}

const CheckInQRScanner: React.FC<CheckInQRScannerProps> = ({ eventId, eventTitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <QrCode className="w-5 h-5 mr-2" />
            Attendance Management
          </h3>
          <p className="text-gray-600 mt-1">
            Mark attendance for students attending this event
          </p>
        </div>
        <Link
          to={`/faculty/attendance/${eventId}`}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center"
        >
          <Users className="w-4 h-4 mr-2" />
          Manage Attendance
        </Link>
      </div>
    </div>
  );
};

export default CheckInQRScanner;