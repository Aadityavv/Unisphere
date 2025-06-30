import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AttendanceTable = ({ attendance }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Attended':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'Missed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Attended':
        return 'text-emerald-700 bg-emerald-50';
      case 'Missed':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-yellow-700 bg-yellow-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-slate-900">Attendance History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Event</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {attendance.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{record.eventTitle}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span>{record.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(record.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {record.rating ? (
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < record.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;