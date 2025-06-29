# 🪐 UniSphere – Smart Campus Events & Clubs Hub

UniSphere is a full-stack smart campus event management system designed for universities. It enables students, faculty, and admins to post, manage, and attend events — with features like QR-based attendance, digital passes, AI-powered recommendations, and analytics dashboards.

---

## 🧠 Project Overview

**Tech Stack**

| Layer        | Tech                                  |
|--------------|----------------------------------------|
| Frontend     | React.js, Vite, TailwindCSS            |
| Backend      | Node.js, Express, MongoDB, JWT         |
| AI Module    | Python, Flask, scikit-learn            |
| CI/CD        | Docker, Docker Compose, GitHub Actions |
| DB Hosting   | MongoDB Atlas (Free Tier)              |
| Dev Hosting  | Localhost (port 3000, 5000, 8000)       |

---

## 📁 Project Structure

```bash
UniSphere/
├── frontend/        # React + Tailwind client
├── backend/         # Node.js + Express + MongoDB API
├── ai-service/      # Flask-based AI microservice
├── .github/         # GitHub Actions workflows
├── docker-compose.yml
└── README.md
```

---

## 🧑‍💻 Developer Setup Guide

### ⚠️ Requirements

* Node.js v18 or v20 (recommended via `nvm`)
* Python 3.10+
* Docker + Docker Compose
* MongoDB Atlas free cluster (or shared URI)

---

### ✅ 1. Clone the Project

```bash
git clone https://github.com/Panshul-Saxena/UniSphere.git
cd UniSphere
```

---

### ✅ 2. Create `.env` Files

#### 🔐 For Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unisphere?retryWrites=true&w=majority
JWT_SECRET=super_secret_key
```

> ✅ Never commit this file. Use `.env.example` as a reference.

---

## 🐳 Docker Build Instructions

### ✅ A. Build All Services Together (Full Stack)

From the root `/UniSphere`:

```bash
docker-compose up --build
```

This will:

* Build all 3 services: frontend, backend, ai-service
* Run them on:
    * Frontend: [http://localhost:3000](http://localhost:3000)
    * Backend: [http://localhost:5000](http://localhost:5000)
    * AI Service: [http://localhost:8000](http://localhost:8000)

---

### ✅ B. Build and Run a Single Service

#### 🔹 Only Frontend (React)

```bash
docker build -t unisphere-frontend ./frontend
docker run -p 3000:3000 unisphere-frontend
```

#### 🔹 Only Backend (Node.js API)

```bash
docker build -t unisphere-backend ./backend
docker run -p 5000:5000 --env-file backend/.env unisphere-backend
```

#### 🔹 Only AI Service (Flask)

```bash
docker build -t unisphere-ai ./ai-service
docker run -p 8000:8000 unisphere-ai
```

---

## 👥 Developer Roles

| Developer | Role                       | Folder(s) Responsible             |
| --------- | -------------------------- | --------------------------------- |
| Panshul   | Frontend Lead              | `/frontend`                       |
| Aaditya   | Backend + API Developer    | `/backend`                        |
| Anurag    | AI Module + DevOps & CI/CD | `/ai-service`, `.github/`, Docker |

---

## 🔄 Running Locally Without Docker

### 🧪 Backend

```bash
cd backend
npm install
node server.js
```

### 🧪 Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🧪 AI Service

```bash
cd ai-service
python -m venv venv
.\venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app.py
```

---

## 🚀 Production Readiness

* Add `.dockerignore` to all 3 services
* Set up GitHub Actions in `.github/workflows/` (CI/CD coming soon)
* Connect Render/Vercel/Fly.io for deployments

---

## 🤝 Contributing & Collaboration

* Use feature branches and PRs for major changes
* Keep `.env` secrets local
* Commit early, commit often

---

## 📬 Contact & Support

For questions or onboarding:

* 📧 Panshul: Frontend Queries
* 📧 Aaditya: API + DB Design
* 📧 Anurag: AI Logic + DevOps

---

© 2024 UniSphere Project — Built with ❤️ by Team PS-A-A