// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/public/Landing';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';

import StudentDashboard from './pages/student/Dashboard';
import Events from './pages/student/Events';
import EventDetails from './pages/student/EventDetails.tsx';
import MyEvents from './pages/student/MyEvents';
import Clubs from './pages/student/Clubs';
import ClubDetails from './pages/student/ClubDetails';
import Attendance from './pages/student/Attendance';
import Feedback from './pages/student/Feedback';

import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyEvents from './pages/faculty/Events';
import FacultyEventDetails from './pages/faculty/EventDetails';
import CreateEditEvent from './pages/faculty/CreateEditEvent';
import AttendanceMarking from './pages/faculty/Attendance';
import FacultyClubs from './pages/faculty/Clubs';
import ClubEventCalendar from './pages/faculty/ClubEventCalendar';
import CreateEditClub from './pages/faculty/CreateEditClub';

import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import EventApprovalPage from './pages/admin/EventApprovalPage.tsx';
import UserManagementPage from './pages/admin/UserManagementPage';
import ClubModerationPage from './pages/admin/ClubModerationPage';
import SystemAnalyticsPage from './pages/admin/SystemAnalyticsPage';

import { setAuthToken } from './utils/api';

const token = localStorage.getItem('token');
setAuthToken(token);

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* --- Student Routes --- */}
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:eventId" element={<EventDetails />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/clubs/:clubId" element={<ClubDetails />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/feedback/:eventId" element={<Feedback />} />

                {/* --- Faculty Routes --- */}
                <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty/events" element={<FacultyEvents />} />
                <Route path="/faculty/events/:id" element={<FacultyEventDetails />} />
                <Route path="/faculty/create-event" element={<CreateEditEvent mode="create" />} />
                <Route path="/faculty/edit/:id" element={<CreateEditEvent mode="edit" />} />
                <Route path="/faculty/attendance/:id" element={<AttendanceMarking />} />
                <Route path="/faculty/clubs" element={<FacultyClubs />} />
                <Route path="/faculty/create-club" element={<CreateEditClub mode="create" />} />
                <Route path="/faculty/clubs/:id/edit" element={<CreateEditClub mode="edit" />} />
                <Route path="/faculty/clubs/:id/events" element={<ClubEventCalendar />} />

                {/* --- Admin Routes --- */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/event-approvals" element={<EventApprovalPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/admin/clubs" element={<ClubModerationPage />} />
                <Route path="/admin/analytics" element={<SystemAnalyticsPage />} />

                {/* --- Fallback Route --- */}
                <Route path="*" element={<h1 className="p-10 text-xl">404 – Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
