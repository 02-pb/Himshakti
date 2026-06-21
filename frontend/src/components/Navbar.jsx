import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="navbar">
      <h2>PahadiKart 🌿</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/ai">AI</Link>

        <button
  className="theme-toggle"
  onClick={toggleTheme}
  aria-label="Toggle Theme"
>
  {darkMode ? "☀️" : "🌙"}
</button>

        <span>🛒 {cartCount}</span>
      </div>
    </nav>
  );
}