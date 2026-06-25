<div align="center">

# 🎬 Movia

### Movie & TV show recommendations based on your **mood**, **taste**, and **viewing habits**

🇹🇷 [Bu dosyayı Türkçe okuyun](./README.tr.md)

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TMDB](https://img.shields.io/badge/Powered%20by-TMDB-01B4E4?style=for-the-badge&logo=themoviedb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

## 📖 Table of Contents

- [✨ What is Movia?](#-what-is-movia)
- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started Locally](#-getting-started-locally)
- [🔑 Getting a TMDB API Key](#-getting-a-tmdb-api-key)
- [🗄️ Setting up MongoDB Atlas (Free)](#️-setting-up-mongodb-atlas-free)
- [☁️ Deploying to Production](#️-deploying-to-production)
- [🧭 API Reference](#-api-reference)
- [🗂️ 4–5 Day Build Plan](#️-45-day-build-plan)
- [🐞 Troubleshooting](#-troubleshooting)
- [📜 License](#-license)

---

## ✨ What is Movia?

**Movia** is a modern web platform that recommends movies and TV shows tailored to:

- 🎭 **How you feel today** — happy, sad, tired, excited, romantic, or thoughtful
- 🧠 **Your personality quiz results** — favorite genres, movie vs. TV preference, animation/anime interest, ideal duration, and binge style
- 📊 **Your viewing history** — Movia learns your taste over time and visualizes it as your personal **"Film DNA"** 🧬

After answering a quick mood check-in and a short quiz, you instantly get **3 personalized recommendations** with posters, ratings, runtime, genre, director, cast, and synopsis — ready to favorite ⭐, save to watch later 🔖, or mark as watched ✅.

---

## 🌟 Features

| Category | Description |
|---|---|
| 👤 **Profiles** | Sign up with first/last name, username & avatar |
| 😄 **Mood Check-in** | "How are you feeling today?" — 6 mood options |
| 🧪 **Personality Quiz** | 5-step quiz: genres, movie/TV, animation/anime, duration, binge style |
| 🎯 **Smart Recommendations** | 3 curated picks per session via the TMDB API, combining mood + quiz data |
| 🃏 **Rich Recommendation Cards** | Poster, rating, runtime, genre, director, cast, synopsis |
| ⭐ **Favorites** | Save movies/shows you love |
| 🔖 **Watch Later** | Build a personal watchlist |
| ✅ **Watched + Ratings** | Mark as watched, rate (0–10), and add personal notes |
| 📈 **Profile Page** | Favorite genres, favorite titles, watched history, ratings, stats |
| 🧬 **Film DNA** | Pie chart breakdown of your favorite genres based on what you watch |
| 📊 **Statistics Dashboard** | Total watched, total watch time, top genres, weekly summary charts |
| 🏆 **Achievements & Badges** | Unlock badges like "Cinephile", "Marathoner", "Genre Explorer" |
| 🌙 **Dark Mode** | Beautiful light/dark theme toggle |
| 📱 **Responsive Design** | Fully mobile-friendly, modern UI |

---

## 🛠️ Tech Stack

**Frontend**
- ⚛️ React 18 + Vite
- 🎨 Tailwind CSS (custom purple/pink gradient theme)
- 🧭 React Router v6
- 📊 Recharts (Film DNA & weekly charts)
- 🌐 Axios

**Backend**
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose (MongoDB Atlas — free tier)
- 🔐 JWT authentication + bcrypt password hashing
- 🎬 [TMDB API](https://www.themoviedb.org/) for movie/TV metadata (posters, ratings, cast, director, runtime, genres)

**Deployment**
- ▲ Vercel (frontend)
- 🚀 Render (backend)
- ☁️ MongoDB Atlas (database)

---

## 📁 Project Structure

```
movia/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/                   # User.js, WatchItem.js
│   ├── middleware/auth.js        # JWT protect middleware
│   ├── controllers/              # auth, user, recommendation, watch logic
│   ├── routes/                   # Express routes
│   ├── utils/                    # tmdb.js, moodMap.js, badges.js
│   ├── server.js                 # App entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js          # API client
│   │   ├── context/              # AuthContext, ThemeContext
│   │   ├── components/           # Navbar, MovieCard, BadgeToast, ProtectedRoute
│   │   ├── pages/                # Home, Login, Register, Mood, Quiz,
│   │   │                         # Recommendations, Profile, Stats,
│   │   │                         # Favorites, Watchlist, History, Badges
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── README.md                     # You are here 🇬🇧
├── README.tr.md                  # Türkçe versiyon 🇹🇷
└── LICENSE
```

---

## 🚀 Getting Started Locally

### 0️⃣ Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
- A free [TMDB](https://www.themoviedb.org/signup) account & API key
- [Git](https://git-scm.com/) installed

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/movia.git
cd movia
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:

```env
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random string>
TMDB_API_KEY=<your TMDB API key>
TMDB_BASE_URL=https://api.themoviedb.org/3
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected: ...
🚀 Movia API listening on port 5000
```

### 3️⃣ Frontend setup

Open a **new terminal**:

```bash
cd frontend
npm install
cp .env.example .env
```

Open `.env` and make sure it points to your local backend:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Visit **http://localhost:5173** 🎉 — Movia is now running locally!

---

## 🔑 Getting a TMDB API Key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings → API** → [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
3. Click **"Create"** under "Request an API Key" → choose **Developer**
4. Fill the short form (app name: `Movia`, app URL: your repo or `http://localhost`, summary: "Personal mood-based movie recommendation app")
5. Copy your **API Key (v3 auth)** and paste it into `backend/.env` as `TMDB_API_KEY`

> 💡 TMDB's API is completely free for non-commercial/personal projects like this one.

---

## 🗄️ Setting up MongoDB Atlas (Free)

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) and sign up
2. Create a **free shared (M0) cluster** (pick any region close to you)
3. Under **Database Access**, create a database user with a username & password
4. Under **Network Access**, click **"Add IP Address" → "Allow access from anywhere"** (`0.0.0.0/0`) — needed so Render can connect
5. Click **"Connect" → "Drivers"**, copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/movia?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your real credentials and paste it into `MONGO_URI` in your `.env`

---

## ☁️ Deploying to Production

Movia is designed to run **fully live** using three free services: **Vercel** (frontend), **Render** (backend), and **MongoDB Atlas** (database).

### Step 1 — Push your code to GitHub

```bash
cd movia
git init
git add .
git commit -m "Initial commit - Movia 🎬"
git branch -M main
git remote add origin https://github.com/<your-username>/movia.git
git push -u origin main
```

> 📝 You can keep both `frontend` and `backend` in a single repo (as set up here) — both Render and Vercel support deploying from a **subfolder**.

### Step 2 — Deploy the Backend on Render

1. Go to [render.com](https://render.com) and sign up / log in with GitHub
2. Click **"New +" → "Web Service"**
3. Select your `movia` repository
4. Configure:
   - **Name:** `movia-backend`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Under **Environment Variables**, add all the values from your `backend/.env`:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `TMDB_API_KEY`
   - `TMDB_BASE_URL`
   - `CLIENT_URL` → *(you'll update this after deploying the frontend, see Step 4)*
6. Click **"Create Web Service"** and wait for the build to finish
7. Copy your live backend URL, e.g. `https://movia-backend.onrender.com`

> ⚠️ Render's free tier "spins down" after 15 minutes of inactivity, so the first request after idling may take ~30 seconds to wake up. This is normal for free hosting.

### Step 3 — Deploy the Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in with GitHub
2. Click **"Add New..." → "Project"**
3. Import your `movia` repository
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://movia-backend.onrender.com/api` *(your Render URL + `/api`)*
6. Click **"Deploy"**
7. Once done, you'll get a live URL like `https://movia.vercel.app` 🎉

### Step 4 — Connect them together (CORS)

1. Go back to your **Render** dashboard → `movia-backend` → **Environment**
2. Update `CLIENT_URL` to your Vercel URL, e.g. `https://movia.vercel.app`
3. Save — Render will automatically redeploy
4. Open your Vercel URL — Movia is now **fully live** on the internet! 🌍🎬

---

## 🧭 API Reference

Base URL: `/api`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Create a new account |
| `POST` | `/auth/login` | ❌ | Log in, returns JWT |
| `GET`  | `/auth/me` | ✅ | Get current user |
| `POST` | `/users/quiz` | ✅ | Save personality quiz results |
| `POST` | `/users/mood` | ✅ | Save today's mood |
| `PUT`  | `/users/profile` | ✅ | Update profile info |
| `GET`  | `/users/profile` | ✅ | Get full profile overview |
| `GET`  | `/users/stats` | ✅ | Get stats + Film DNA |
| `POST` | `/recommendations` | ✅ | Get 3 recommendations for a mood |
| `POST` | `/watch` | ✅ | Add/update favorite, watchlist, or watched item |
| `PUT`  | `/watch/:id` | ✅ | Update rating/note |
| `DELETE` | `/watch/:id` | ✅ | Remove an item |
| `GET`  | `/watch/:status` | ✅ | Get list by status (`favorite`/`watchlist`/`watched`) |
| `GET`  | `/watch/badges` | ✅ | Get earned badges |

✅ = requires `Authorization: Bearer <token>` header

---



---

## 🐞 Troubleshooting

<details>
<summary><strong>❌ "Öneriler alınırken hata oluştu" / recommendations fail</strong></summary>

- Double-check `TMDB_API_KEY` in your backend `.env`
- Make sure there's no extra space/quote around the key
- TMDB sometimes needs a few minutes to activate a brand-new key
</details>

<details>
<summary><strong>❌ CORS errors in the browser console</strong></summary>

- Make sure `CLIENT_URL` in the backend matches your frontend's exact URL (no trailing slash)
- Restart/redeploy the backend after changing environment variables
</details>

<details>
<summary><strong>❌ MongoDB connection fails on Render</strong></summary>

- Confirm Network Access in Atlas allows `0.0.0.0/0`
- Double check username/password don't contain unescaped special characters
</details>

<details>
<summary><strong>❌ Render backend is slow on first request</strong></summary>

- This is expected on the free tier (cold start after inactivity). Consider a paid plan or a cron-ping service if this matters for your demo.
</details>

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE) — free to use, modify, and learn from. 💜

<div align="center">

Made with 💜  — **Movia**



</div>
