import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
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

  const handleSearchClick = () => {
    navigate("/");
    setTimeout(() => {
      const searchInput = document.querySelector(".search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <h2>PahadiKart 🌿</h2>

      <div className="nav-links">
        <span 
          className="nav-search-icon" 
          onClick={handleSearchClick} 
          style={{ cursor: "pointer", marginRight: "2px" }}
          aria-label="Search"
        >
          🔍
        </span>
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