"use client";

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const getThemeFromLS = () => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (theme) {
        return theme;
      } else {
        return "dark";
      }
    } else {
      return "dark"; // Default theme if localStorage is not accessible
    }
  };

  const [selectedTheme, setSelectedTheme] = useState(getThemeFromLS());

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", selectedTheme);
    }
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
