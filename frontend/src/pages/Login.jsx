import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Google Login Callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("Google Token:", token);

      localStorage.setItem("token", token);

      fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Google Profile:", data);

          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Google login successful", {
              duration: 1500,
            });

            // Remove token from URL
            window.history.replaceState({}, document.title, "/login");

            setTimeout(() => {
              navigate("/dashboard", { replace: true });
            }, 1500);
          } else {
            toast.error("Google login failed");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Google login failed");
        });
    }
  }, [navigate]);

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      if (!data.success) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("TOKEN AFTER SAVE:", localStorage.getItem("token"));
      console.log("USER AFTER SAVE:", localStorage.getItem("user"));

      toast.success("Login successful", {
        duration: 1500,
      });

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Could not connect to backend");
    }
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

            <button
              type="button"
              className="login-btn"
              onClick={() => {
                window.location.href =
                  "http://localhost:5000/api/auth/google";
              }}
            >
              Continue with Google
            </button>
          </form>

          <p className="login-footer-text">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}