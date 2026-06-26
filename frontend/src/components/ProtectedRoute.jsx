import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, guestAllowed = false }) => {
  const { user, loading, isGuest } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg">
        Yükleniyor...
      </div>
    );
  }

  if (user) return children;

  if (isGuest && guestAllowed) return children;

  // Misafir, hesap gerektiren bir sayfaya gitmeye çalışıyor -> kayıt ekranına yönlendir
  if (isGuest) {
    return <Navigate to="/register" replace state={{ fromGuest: true }} />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
