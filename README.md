# 🌐 UniSphere: Full Stack Platform with CI/CD

Welcome to the UniSphere project! This is a full-stack smart campus event management system designed for universities with **CI/CD fully automated** via **GitHub Actions**. It enables students, faculty, and admins to post, manage, and attend events — with features like QR-based attendance, digital passes, AI-powered recommendations, and analytics dashboards.

**Deployment Stack:**
- Frontend: React + Tailwind CSS → Deployed to **Vercel**
- Backend: Node.js + Express → Deployed to **Render**
- AI Service: Python + Flask → Deployed to **Render**

> ✅ CI/CD handles everything from building Docker images → pushing to DockerHub → deploying to hosting platforms automatically.

---

## 🔗 Live Links

| Service       | Link                                         |
|---------------|----------------------------------------------|
| Frontend      | https://uni-sphere-psi.vercel.app/           |
| Backend API   | https://unisphere-backend-b327.onrender.com/ |
| AI Service    | https://ai-service-aie5.onrender.com/        |

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

## 👷‍♀️ What You **Don't** Need to Do as a Developer

| ❌ Task                            | ✅ Why You Don't Need It                      |
| --------------------------------- | -------------------------------------------- |
| Build Docker Images manually      | CI/CD does this automatically on every push  |
| Deploy manually to Vercel/Render  | CI/CD redeploys live sites via Webhooks      |
| Push images to DockerHub yourself | GitHub Actions handles DockerHub pushes      |
| Manage `.env` secrets in repo     | Use `.env.example` and set real envs locally |

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

## 📦 How CI/CD Works (GitHub Actions)

We have **3 GitHub Action workflows** under `.github/workflows/`:

| Workflow File  | Triggered When Files Are Pushed In | Deploys To |
| -------------- | ---------------------------------- | ---------- |
| `frontend.yml` | `frontend/**`                      | Vercel     |
| `backend.yml`  | `backend/**`                       | Render     |
| `ai.yml`       | `ai-service/**`                    | Render     |

---

## 🔁 Typical Workflow for Making Changes

1. **Pull latest code**:
   ```bash
   git pull origin main
   ```

2. **Make your edits** in your assigned service folder.

3. **Commit & push**:
   ```bash
   git add .
   git commit -m "feat: updated feature in backend"
   git push origin main
   ```

4. ✅ CI/CD will automatically:
  * Build Docker image
  * Push to DockerHub
  * Deploy to hosting service (Vercel or Render)

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

## 📦 DockerHub Images

| Service    | DockerHub Tag                      |
|------------|------------------------------------|
| Frontend   | `samaltman07/unisphere-frontend`   |
| Backend    | `samaltman07/unisphere-backend`    |
| AI Service | `samaltman07/unisphere-ai-service` |

These images are auto-pushed via CI/CD.

---

## 🔄 Running Locally Without Docker

### 🧪 Backend

```bash
cd backend
npm install
node server.js  # runs on localhost:5000
```

* Configure `.env` using `.env.example`
* For shared DB, use the MongoDB URI from team

### 🧪 Frontend

```bash
cd frontend
npm install
npm run dev  # runs on localhost:5173
```

### 🧪 AI Service

```bash
cd ai-service
python -m venv venv
.\venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app.py  # runs on localhost:8000
```

---

## 🛠 Useful Dev Commands

| Task                                | Command                            |
| ----------------------------------- | ---------------------------------- |
| Run frontend locally                | `npm run dev` (in `frontend/`)     |
| Run backend locally                 | `node server.js` (in `backend/`)   |
| Run AI service locally              | `python app.py` (in `ai-service/`) |
| Run all services via Docker Compose | `docker-compose up --build`        |


---

## 🤝 Contributing & Collaboration

* Use feature branches and PRs for major changes
* Keep `.env` secrets local
* Commit early, commit often

---

© 2025 UniSphere Project — Built with ❤️ by Team PS-AK-AV