// src/pages/faculty/Attendance.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import QRScannerComponent from '../../components/faculty/QRScannerComponent';
import ManualAttendanceToggler from '../../components/faculty/ManualAttendanceToggler';
import AttendanceTable from '../../components/faculty/AttendanceTable';
import axios from '../../utils/api';

interface Student {
    _id: string;
    name: string;
    rollNumber: string;
    status: 'present' | 'absent' | 'late';
    checkedInAt?: string | null;
}

interface AttendanceData {
    eventId: string;
    eventTitle: string;
    students: Student[];
}

const AttendanceMarking: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isScannerActive, setIsScannerActive] = useState(false);

    useEffect(() => {
        if (id) loadAttendanceData(id);
    }, [id]);

    const loadAttendanceData = async (eventId: string) => {
        setIsLoading(true);
        try {
            const attendanceRes = await axios.get(`/attendance/event/${eventId}`);
            const registrationsRes = await axios.get(`/registration/events/${eventId}/registrations`);

            const attendanceStudents = attendanceRes.data.students;

            const registeredStudents = registrationsRes.data.map((reg: any) => ({
                _id: reg.userId._id,
                name: reg.userId.name,
                rollNumber: reg.userId.rollNumber,
            }));

            const mergedStudents = registeredStudents.map((regStudent: any) => {
                const attendance = attendanceStudents.find((a: any) => a._id === regStudent._id);
                return attendance ? attendance : { ...regStudent, status: 'absent', checkedInAt: null };
            });

            setAttendanceData({
                eventId: attendanceRes.data.eventId,
                eventTitle: attendanceRes.data.eventTitle,
                students: mergedStudents,
            });
        } catch (error) {
            console.error('Failed to load attendance data:', error);
            toast.error('Failed to load attendance data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQRScan = async (studentIdRaw: string) => {
        if (!attendanceData) return;

        const studentId = studentIdRaw.trim();
        const student =
            attendanceData.students.find((s) => s._id === studentId) ||
            attendanceData.students.find((s) => s.rollNumber === studentId);

        if (!student) {
            toast.error('Student not registered for event');
            return;
        }

        try {
            await axios.put(
                `/attendance/event/${attendanceData.eventId}/student/${student._id}`,
                { status: 'present' }
            );

            const updatedStudents = attendanceData.students.map((s) =>
                s._id === student._id
                    ? { ...s, status: 'present', checkedInAt: new Date().toISOString() }
                    : s
            );

            setAttendanceData({ ...attendanceData, students: updatedStudents });
            toast.success(`${student.name} marked present`);
        } catch (err) {
            console.error(err);
            toast.error('Failed to mark attendance');
        }
    };

    const handleToggleAttendance = async (
        studentId: string,
        status: 'present' | 'absent' | 'late'
    ) => {
        if (!attendanceData) return;

        try {
            await axios.put(
                `/attendance/event/${attendanceData.eventId}/student/${studentId}`,
                { status }
            );

            const updatedStudents = attendanceData.students.map((s) =>
                s._id === studentId
                    ? {
                        ...s,
                        status,
                        checkedInAt: status === 'present' ? new Date().toISOString() : undefined,
                    }
                    : s
            );

            setAttendanceData({ ...attendanceData, students: updatedStudents });

            const student = updatedStudents.find((s) => s._id === studentId);
            toast.success(`${student?.name} marked as ${status}`);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update attendance');
        }
    };

    const handleExportAttendance = () => {
        if (!attendanceData) return;

        const csvContent = [
            ['Name', 'Roll Number', 'Status', 'Check-in Time'],
            ...attendanceData.students.map((s) => [
                s.name,
                s.rollNumber,
                s.status,
                s.checkedInAt ?? '-',
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${attendanceData.eventTitle}-attendance.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success('Attendance exported');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading attendance data...</p>
                </div>
            </div>
        );
    }

    if (!attendanceData) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
                    <p className="text-gray-600 mb-4">
                        The event you're looking for doesn't exist.
                    </p>
                    <Link
                        to="/faculty/events"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                        Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center mb-8">
                    <Link
                        to={`/faculty/events/${attendanceData.eventId}`}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Attendance Marking</h1>
                        <p className="text-gray-600 mt-2">{attendanceData.eventTitle}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <QRScannerComponent
                        onScan={handleQRScan}
                        isActive={isScannerActive}
                        onToggle={() => setIsScannerActive(!isScannerActive)}
                    />

                    <ManualAttendanceToggler
                        students={attendanceData.students}
                        eventId={attendanceData.eventId}
                        onUpdate={(updatedStudent) => {
                            const updatedList = attendanceData.students.map((s) =>
                                s._id === updatedStudent._id ? { ...s, status: updatedStudent.status } : s
                            );
                            setAttendanceData({ ...attendanceData, students: updatedList });
                        }}
                    />


                    <AttendanceTable
                        students={attendanceData?.students || []}
                        eventTitle={attendanceData?.eventTitle || ''}
                        onExport={handleExportAttendance}
                    />
                </div>
            </div>
        </div>
    );
};

export default AttendanceMarking;
