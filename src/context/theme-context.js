"use client";

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

  const getThemeFromLS = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    } else {
      return "dark";
    }
  };

  const [selectedTheme, setSelectedTheme] = useState(getThemeFromLS());

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
