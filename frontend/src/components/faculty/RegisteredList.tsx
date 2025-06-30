import React from 'react';
import { Users, Mail, GraduationCap } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  year: string;
}

interface RegisteredListProps {
  students: Student[];
  eventTitle: string;
}

const RegisteredList: React.FC<RegisteredListProps> = ({ students, eventTitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Registered Students ({students.length})
        </h3>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No students registered yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {student.email}
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {student.rollNumber} - {student.year} Year
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredList;