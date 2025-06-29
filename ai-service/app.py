from flask import Flask, request, jsonify

app = Flask(__name__)

# Test route
@app.route('/')
def index():
    return "✅ AI Service is running!"

# Recommend events based on dummy logic
@app.route('/recommend/<user_id>', methods=['GET'])
def recommend(user_id):
    # Dummy response – later connect to backend DB or API
    dummy_recommendations = [
        {"event": "Tech Talk", "label": "🎯 Based on Your Interests"},
        {"event": "Hackathon", "label": "🔥 Popular in Your Department"},
    ]
    return jsonify({"user": user_id, "recommended": dummy_recommendations})

# Engagement score (dummy)
@app.route('/engagement-score/<user_id>', methods=['GET'])
def engagement_score(user_id):
    # Placeholder logic (can fetch from DB later)
    return jsonify({"user": user_id, "score": 72})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
