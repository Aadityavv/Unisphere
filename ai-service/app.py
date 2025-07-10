from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
from sklearn.neighbors import NearestNeighbors
import pandas as pd
from datetime import datetime

app = Flask(_name_)

# Enable CORS for all routes
CORS(app)  # Allow all domains by default, or you can specify certain origins like CORS(app, resources={r"/api/": {"origins": ""}})

# API URLs (the backend API endpoints on Render)
EVENTS_API = 'https://ai-service-aie5.onrender.com/api/events'  # Get events
ATTENDANCE_API = 'https://ai-service-aie5.onrender.com/api/attendance/user'  # Get user attendance
USERS_API = 'https://ai-service-aie5.onrender.com/api/admin/users'  # Get users

# Fetch events
def fetch_events():
    response = requests.get(EVENTS_API)
    if response.status_code == 200:
        return response.json()
    else:
        print('Error fetching events:', response.status_code)
        return []

# Fetch users
def fetch_users():
    response = requests.get(USERS_API)
    if response.status_code == 200:
        return response.json()
    else:
        print('Error fetching users:', response.status_code)
        return []

# Fetch attendance data for a specific user
def fetch_user_attendance(user_id):
    response = requests.get(f'{ATTENDANCE_API}/{user_id}')
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Error fetching attendance for user {user_id}:', response.status_code)
        return []

# Create user-event matrix
def create_user_event_matrix(events, users, attendance_data):
    event_id_to_index = {event['event_id']: idx for idx, event in enumerate(events)}

    user_event_matrix = pd.DataFrame(0, index=[user['user_id'] for user in users], columns=[event['event_id'] for event in events])

    for record in attendance_data:
        user_id = record['user_id']
        event_id = record['event_id']
        if user_id in user_event_matrix.index and event_id in user_event_matrix.columns:
            user_event_matrix.at[user_id, event_id] = 1 if record['status'] == 'present' else 0

    return user_event_matrix

# Use KNN to recommend events for a user
def recommend_events(user_event_matrix, user_id):
    knn = NearestNeighbors(n_neighbors=3, algorithm='ball_tree')
    knn.fit(user_event_matrix.values.T)  # Fit on events (transpose the matrix)

    distances, indices = knn.kneighbors(user_event_matrix.loc[user_id].values.reshape(1, -1))

    recommended_events = set()
    for idx in indices[0]:
        similar_user_id = user_event_matrix.index[idx]
        attended_events = user_event_matrix.loc[similar_user_id][user_event_matrix.loc[similar_user_id] == 1].index
        recommended_events.update(attended_events)

    return recommended_events

# Engagement score calculation
def calculate_engagement_score(attended_events):
    frequency_score = len(attended_events)
    last_attended = attended_events[-1] if attended_events else None
    recency_score = 1 / (days_since(last_attended['checkInTime']) + 1) if last_attended else 0
    event_categories = set(event['category'] for event in attended_events)
    diversity_score = len(event_categories)
    active_participation_score = sum(1 for event in attended_events if event['status'] == 'speaker')

    total_score = (0.4 * frequency_score) + (0.3 * recency_score) + (0.2 * diversity_score) + (0.1 * active_participation_score)

    return total_score

# Utility function to calculate days since last event attendance
def days_since(last_attended_time):
    if last_attended_time:
        return (datetime.now() - datetime.fromtimestamp(last_attended_time / 1000)).days
    return 0

@app.route('/')
def index():
    return "✅ AI Service is running!"

@app.route('/recommend/<user_id>', methods=['POST'])
def recommend(user_id):
    events = fetch_events()
    users = fetch_users()
    attendance_data = []

    for user in users:
        attendance_data += fetch_user_attendance(user['user_id'])

    user_event_matrix = create_user_event_matrix(events, users, attendance_data)

    recommended_events = recommend_events(user_event_matrix, user_id)

    recommended_event_titles = [event['event_title'] for event in events if event['event_id'] in recommended_events]

    return jsonify({"recommended_events": recommended_event_titles})

@app.route('/engagement-score/<user_id>', methods=['GET'])
def engagement_score(user_id):
    attended_events = fetch_user_attendance(user_id)
    score = calculate_engagement_score(attended_events)

    return jsonify({"user": user_id, "engagement_score": score})

if _name_ == '__main__':
    # Ensure the app runs on Render with the correct host and port
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8000)))