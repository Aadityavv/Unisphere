import React from 'react';
import { Check, X, Clock, Download } from 'lucide-react';
import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';

interface AttendanceStudent {
  id: number;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late';
  checkedInAt?: string;
}

interface AttendanceTableProps {
  students: AttendanceStudent[];
  eventTitle: string;
  onExport: () => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ students, eventTitle, onExport }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <X className="w-4 h-4 text-red-600" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <X className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const attendanceRate = students.length > 0 ? (presentCount / students.length) * 100 : 0;

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Attendance Summary</h3>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <span className="text-green-600">Present: {presentCount}</span>
              <span className="text-red-600">Absent: {absentCount}</span>
              <span className="text-blue-600">Rate: {attendanceRate.toFixed(1)}%</span>
            </div>
          </div>
          <button
              onClick={onExport}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Roll Number</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Check-in Time</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">QR Code</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      </div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{student.rollNumber}</td>
                  <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center w-fit ${getStatusColor(student.status)}`}>
                    {getStatusIcon(student.status)}
                    <span className="ml-1 capitalize">{student.status}</span>
                  </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {student.checkedInAt ? dayjs(student.checkedInAt).format('HH:mm:ss') : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-12 h-12">
                      <QRCodeSVG
                          value={`student-${student.id}-${student.rollNumber}`}
                          size={48}
                          level="M"
                          includeMargin={false}
                      />
                    </div>
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