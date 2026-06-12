import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful (Demo)");
  };

  return (
    <>
      <Navbar />

      <div className="login-section">
        <div className="login-card">

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to PahadiKart</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="login-footer-text">
            Don't have an account? <span>Sign Up</span>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}