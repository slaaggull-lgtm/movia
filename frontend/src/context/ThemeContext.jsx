import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("movia_theme");
    if (stored) return stored === "dark";
    // Movia varsayılan olarak karanlık temayla açılır.
    // Kullanıcı değiştirirse tercihi yukarıdaki localStorage'da saklanır.
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("movia_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("movia_theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
