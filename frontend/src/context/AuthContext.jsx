import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem("movia_guest") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("movia_user");
    const token = localStorage.getItem("movia_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("movia_token", data.token);
    localStorage.setItem("movia_user", JSON.stringify(data));
    endGuestTrial();
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("movia_token", data.token);
    localStorage.setItem("movia_user", JSON.stringify(data));
    endGuestTrial();
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("movia_token");
    localStorage.removeItem("movia_user");
    setUser(null);
  };

  const updateUser = (partial) => {
    const updated = { ...user, ...partial };
    setUser(updated);
    localStorage.setItem("movia_user", JSON.stringify(updated));
  };

  // Misafir/deneme modu: hesap oluşturmadan uygulamayı denemeye izin verir.
  const startGuestTrial = () => {
    localStorage.setItem("movia_guest", "true");
    setIsGuest(true);
  };

  const endGuestTrial = () => {
    localStorage.removeItem("movia_guest");
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isGuest,
        startGuestTrial,
        endGuestTrial,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
