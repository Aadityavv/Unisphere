import React from 'react';
import { Check, X, Clock } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late';
}

interface ManualAttendanceTogglerProps {
  students: Student[];
  onToggleAttendance: (studentId: number, status: 'present' | 'absent') => void;
}

const ManualAttendanceToggler: React.FC<ManualAttendanceTogglerProps> = ({ 
  students, 
  onToggleAttendance 
}) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Attendance</h3>
      
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.rollNumber}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${getStatusColor(student.status)}`}>
                {getStatusIcon(student.status)}
                <span className="ml-1 capitalize">{student.status}</span>
              </span>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => onToggleAttendance(student.id, 'present')}
                  className={`p-1 rounded ${
                    student.status === 'present' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                  }`}
                  title="Mark Present"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleAttendance(student.id, 'absent')}
                  className={`p-1 rounded ${
                    student.status === 'absent' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                  }`}
                  title="Mark Absent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualAttendanceToggler;