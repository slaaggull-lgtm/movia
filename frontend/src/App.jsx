import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mood from "./pages/Mood";
import Quiz from "./pages/Quiz";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import History from "./pages/History";
import Badges from "./pages/Badges";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/mood" element={<ProtectedRoute guestAllowed><Mood /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute guestAllowed><Quiz /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute guestAllowed><Recommendations /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/badges" element={<ProtectedRoute><Badges /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="text-center text-sm text-gray-400 py-6">
        🎬 Movia — Ruh haline göre film & dizi önerileri © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
