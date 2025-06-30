# UniSphere Backend

A smart campus events & clubs hub backend built with Node.js, Express, and MongoDB.

## Project Description

UniSphere is a campus-focused event management system for students and faculty. It allows users to post, manage, and register for university events, club activities, and workshops. Features include ticket generation, automated reminders, digital passes, attendance tracking, and AI-driven recommendations.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- QR Code Integration

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/unisphere
   JWT_SECRET=supersecretkey
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

**Base URL:** `http://localhost:5000/api`

---

### Auth Routes

#### POST /auth/signup
Create a new user (student, faculty, or admin).
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student", // or "faculty", "admin"
  "department": "CSE"
}
```
Response:
```json
{ "token": "JWT_TOKEN", "user": { ... } }
```

#### POST /auth/login
Login with email and password.
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Response:
```json
{ "token": "JWT_TOKEN", "user": { ... } }
```

#### GET /auth/me
Get current user info (requires `Authorization: Bearer <token>`).

---

### Event Routes

#### POST /events/create
Create a new event (faculty only).
- Headers: `Authorization: Bearer <token>`
```json
{
  "title": "Event Title",
  "description": "Details",
  "dateTime": "2024-07-01T10:00:00Z",
  "duration": 120,
  "location": "Auditorium",
  "clubId": "CLUB_OBJECT_ID"
}
```

#### GET /events
List all events (optionally filter by club, date).
- Query: `?club=CLUB_ID&date=YYYY-MM-DD`

#### GET /events/:id
Get event details by ID.

#### GET /events/student/:userId
Get all events a student is registered for.
- Headers: `Authorization: Bearer <token>`

#### PUT /events/:id
Edit an event (faculty only).
- Headers: `Authorization: Bearer <token>`
- Body: (any event fields to update)

---

### Club Routes

#### GET /clubs
List all clubs.

#### POST /clubs/create
Create a new club (faculty only).
- Headers: `Authorization: Bearer <token>`
```json
{
  "name": "Robotics Club",
  "description": "About the club",
  "facultyLeadId": "USER_OBJECT_ID"
}
```

#### GET /clubs/:id
Get club details by ID.

#### GET /clubs/:id/members
Get all members of a club.

#### POST /clubs/:id/join
Join a club (student only).
- Headers: `Authorization: Bearer <token>`

---

### Registration Routes

#### POST /registration/events/:id/register
Register for an event (student only).
- Headers: `Authorization: Bearer <token>`

#### GET /registration/events/:id/registrations
Get all registrations for an event (faculty only).
- Headers: `Authorization: Bearer <token>`

#### GET /registration/users/:id/registrations
Get all event registrations for a user (student only).
- Headers: `Authorization: Bearer <token>`

---

### Attendance Routes

#### POST /attendance/mark
Mark attendance for a user at an event (faculty only).
- Headers: `Authorization: Bearer <token>`
```json
{
  "eventId": "EVENT_OBJECT_ID",
  "userId": "USER_OBJECT_ID",
  "status": "present" // or "absent", "late"
}
```

#### GET /attendance/event/:eventId
Get attendance records for an event.
- Headers: `Authorization: Bearer <token>`

#### GET /attendance/user/:userId
Get attendance records for a user.
- Headers: `Authorization: Bearer <token>`

---

### Admin Routes

#### GET /admin/events/pending
List all pending (unapproved) events.
- Headers: `Authorization: Bearer <token>`

#### POST /admin/events/:id/approve
Approve an event.
- Headers: `Authorization: Bearer <token>`

#### POST /admin/events/:id/reject
Reject (delete) an event.
- Headers: `Authorization: Bearer <token>`

#### GET /admin/users
List all users.
- Headers: `Authorization: Bearer <token>`

#### PATCH /admin/users/:id/role
Change a user's role.
- Headers: `Authorization: Bearer <token>`
```json
{ "role": "faculty" }
```

#### GET /admin/engagement-heatmap
Get engagement analytics (stub).
- Headers: `Authorization: Bearer <token>`

#### GET /admin/event-stats
Get event stats (stub).
- Headers: `Authorization: Bearer <token>`

---

### Error Handling
All endpoints return errors in the format:
```json
{ "message": "Error description" }
```

### Authentication
All protected routes require `Authorization: Bearer <token>` in the header.

### Status Codes
- 200 OK for successful GET/PUT
- 201 Created for successful POST
- 400 Bad Request for validation errors
- 401 Unauthorized for missing/invalid token
- 403 Forbidden for insufficient role
- 404 Not Found for missing resources
- 500 Internal Server Error for server issues

---

## License
MIT 