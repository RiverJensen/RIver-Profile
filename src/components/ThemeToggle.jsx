import { useEffect, useState } from "react";
import "../css/themetoggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check system preference
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = systemPrefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="theme-toggle-container" onClick={toggleTheme}>
      <div className={`celestial-body sun ${theme === "light" ? "visible" : "hidden"}`}></div>
      <div className={`celestial-body moon ${theme === "dark" ? "visible" : "hidden"}`}></div>
    </div>
  );
};

export default ThemeToggle;
