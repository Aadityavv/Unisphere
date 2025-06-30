// Mock API helpers for UniSphere Student UI
const dummyDashboard = {
  stats: {
    eventsAttended: 12,
    clubsJoined: 3,
    engagementScore: 85
  },
  suggestedEvents: [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "2024-03-20",
      time: "2:00 PM",
      club: "Tech Society",
      imgSrc: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      location: "Engineering Building",
      attendees: 45
    },
    {
      id: 2,
      title: "Cultural Night 2024",
      date: "2024-03-25",
      time: "6:00 PM",
      club: "International Club",
      imgSrc: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      location: "Main Auditorium",
      attendees: 200
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2024-03-28",
      time: "10:00 AM",
      club: "Entrepreneurship Club",
      imgSrc: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800",
      location: "Business School",
      attendees: 80
    },
    {
      id: 4,
      title: "Environmental Action Day",
      date: "2024-04-02",
      time: "9:00 AM",
      club: "Green Society",
      imgSrc: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      location: "Campus Grounds",
      attendees: 120
    }
  ],
  upcomingEvents: [
    {
      id: 5,
      title: "Career Fair 2024",
      date: "2024-03-18",
      time: "10:00 AM",
      club: "Career Services",
      location: "Sports Complex"
    },
    {
      id: 6,
      title: "Photography Exhibition",
      date: "2024-03-19",
      time: "3:00 PM",
      club: "Photography Club",
      location: "Art Gallery"
    },
    {
      id: 7,
      title: "Debate Championship",
      date: "2024-03-21",
      time: "4:00 PM",
      club: "Debate Society",
      location: "Law Building"
    }
  ]
};

const dummyEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    date: "2024-03-20",
    time: "2:00 PM",
    club: "Tech Society",
    category: "Technology",
    imgSrc: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Engineering Building",
    attendees: 45,
    description: "Learn the fundamentals of AI and ML with hands-on workshops and expert speakers.",
    organizer: "Dr. Sarah Johnson",
    duration: "3 hours",
    registered: false
  },
  {
    id: 2,
    title: "Cultural Night 2024",
    date: "2024-03-25",
    time: "6:00 PM",
    club: "International Club",
    category: "Culture",
    imgSrc: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Main Auditorium",
    attendees: 200,
    description: "Celebrate diversity with performances, food, and cultural exhibitions from around the world.",
    organizer: "Prof. Maria Rodriguez",
    duration: "4 hours",
    registered: true
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "2024-03-28",
    time: "10:00 AM",
    club: "Entrepreneurship Club",
    category: "Business",
    imgSrc: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Business School",
    attendees: 80,
    description: "Present your startup ideas to industry experts and compete for funding opportunities.",
    organizer: "Mr. David Chen",
    duration: "6 hours",
    registered: false
  },
  {
    id: 4,
    title: "Environmental Action Day",
    date: "2024-04-02",
    time: "9:00 AM",
    club: "Green Society",
    category: "Environment",
    imgSrc: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Campus Grounds",
    attendees: 120,
    description: "Join us for tree planting, campus cleanup, and sustainability workshops.",
    organizer: "Dr. Emily Green",
    duration: "5 hours",
    registered: true
  },
  {
    id: 5,
    title: "Career Fair 2024",
    date: "2024-03-18",
    time: "10:00 AM",
    club: "Career Services",
    category: "Career",
    imgSrc: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Sports Complex",
    attendees: 300,
    description: "Meet with top employers and explore career opportunities across various industries.",
    organizer: "Ms. Jennifer Smith",
    duration: "8 hours",
    registered: false
  },
  {
    id: 6,
    title: "Photography Exhibition",
    date: "2024-03-19",
    time: "3:00 PM",
    club: "Photography Club",
    category: "Arts",
    imgSrc: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Art Gallery",
    attendees: 60,
    description: "Showcase of student photography work with themes of campus life and nature.",
    organizer: "Prof. Michael Brown",
    duration: "2 hours",
    registered: false
  }
];

const dummyClubs = [
  {
    id: 1,
    name: "Tech Society",
    logo: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200",
    memberCount: 245,
    description: "Exploring the latest in technology and innovation",
    joined: true,
    events: [1, 5]
  },
  {
    id: 2,
    name: "International Club",
    logo: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=200",
    memberCount: 180,
    description: "Celebrating cultural diversity and global connections",
    joined: false,
    events: [2]
  },
  {
    id: 3,
    name: "Entrepreneurship Club",
    logo: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=200",
    memberCount: 120,
    description: "Fostering innovation and business development",
    joined: true,
    events: [3]
  },
  {
    id: 4,
    name: "Green Society",
    logo: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=200",
    memberCount: 95,
    description: "Promoting environmental awareness and sustainability",
    joined: false,
    events: [4]
  }
];

const dummyAttendance = [
  {
    id: 1,
    eventTitle: "Tech Innovation Summit",
    date: "2024-02-15",
    status: "Attended",
    rating: 5
  },
  {
    id: 2,
    eventTitle: "Cultural Festival",
    date: "2024-02-20",
    status: "Attended",
    rating: 4
  },
  {
    id: 3,
    eventTitle: "Career Workshop",
    date: "2024-02-25",
    status: "Missed",
    rating: null
  },
  {
    id: 4,
    eventTitle: "Sports Tournament",
    date: "2024-03-01",
    status: "Attended",
    rating: 5
  },
  {
    id: 5,
    eventTitle: "Art Exhibition",
    date: "2024-03-05",
    status: "Attended",
    rating: 3
  }
];

const dummyRegisteredEvents = [
  {
    id: 2,
    title: "Cultural Night 2024",
    date: "2024-03-25",
    time: "6:00 PM",
    status: "Confirmed",
    qrCode: "QR_CULTURAL_2024_USER123"
  },
  {
    id: 4,
    title: "Environmental Action Day",
    date: "2024-04-02",
    time: "9:00 AM",
    status: "Confirmed",
    qrCode: "QR_ENV_2024_USER123"
  }
];

export async function getStudentDashboard() {
  console.log("GET /api/student/dashboard");
  return new Promise(resolve => {
    setTimeout(() => resolve(dummyDashboard), 500);
  });
}

export async function getEvents(params = {}) {
  console.log("GET /api/events", params);
  return new Promise(resolve => {
    setTimeout(() => resolve(dummyEvents), 300);
  });
}

export async function getEventById(id) {
  console.log("GET /api/events/" + id);
  const event = dummyEvents.find(e => e.id === parseInt(id));
  return new Promise(resolve => {
    setTimeout(() => resolve(event), 300);
  });
}

export async function registerEvent(id) {
  console.log("POST /api/events/" + id + "/register");
  return new Promise(resolve => {
    setTimeout(() => resolve({ qr: `QR_EVENT_${id}_USER123`, success: true }), 500);
  });
}

export async function getAttendance(userId) {
  console.log("GET /api/attendance/user/" + userId);
  return new Promise(resolve => {
    setTimeout(() => resolve(dummyAttendance), 400);
  });
}

export async function getClubs() {
  console.log("GET /api/clubs");
  return new Promise(resolve => {
    setTimeout(() => resolve(dummyClubs), 300);
  });
}

export async function getClubById(id) {
  console.log("GET /api/clubs/" + id);
  const club = dummyClubs.find(c => c.id === parseInt(id));
  return new Promise(resolve => {
    setTimeout(() => resolve(club), 300);
  });
}

export async function getRegisteredEvents() {
  console.log("GET /api/student/registered-events");
  return new Promise(resolve => {
    setTimeout(() => resolve(dummyRegisteredEvents), 300);
  });
}

export async function submitFeedback(eventId, feedback) {
  console.log("POST /api/events/" + eventId + "/feedback", feedback);
  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 500);
  });
}