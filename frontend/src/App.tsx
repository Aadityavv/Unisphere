// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/public/Landing';
import StudentDashboard from './pages/student/Dashboard';   // stub exists
import Events from './pages/student/Events';                // list view
// (add more imports as you scaffold pages)

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* --- Public routes --- */}
                <Route path="/" element={<Landing />} />

                {/* --- Student routes (no auth guard yet) --- */}
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/events" element={<Events />} />
                {/* <Route path="/events/:id" element={<EventDetails />} />   etc. */}

                {/* TODO: /login, /signup, faculty, admin routes */}
            </Routes>
        </BrowserRouter>
    );
}
