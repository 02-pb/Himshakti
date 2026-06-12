import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>PahadiKart</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>

        <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
          🛒 {cartCount}
        </span>
      </div>
    </nav>
  );
}