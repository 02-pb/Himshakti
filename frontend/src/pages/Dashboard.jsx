import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        <div className="dashboard-header">
          <h1>Welcome to PahadiKart 🌿</h1>

          <p>
            Explore authentic Himalayan products crafted by local
            communities across Uttarakhand.
          </p>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>10+</h2>
            <p>Local Products</p>
          </div>

          <div className="stat-card">
            <h2>100%</h2>
            <p>Natural Ingredients</p>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <p>Customer Support</p>
          </div>
        </div>

        {/* Categories */}
        <div className="dashboard-section">
          <h2>Product Categories</h2>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <span>🥣</span>
              <h3>Millet Snacks</h3>
              <p>
                Healthy roasted millet snacks and traditional mixes.
              </p>
            </div>

            <div className="dashboard-card">
              <span>🍪</span>
              <h3>Millet Cookies</h3>
              <p>
                Nutritious cookies prepared from Himalayan millets.
              </p>
            </div>

            <div className="dashboard-card">
              <span>🥤</span>
              <h3>Juices & Squash</h3>
              <p>
                Apple juice and refreshing Buransh squash.
              </p>
            </div>

            <div className="dashboard-card">
              <span>🥒</span>
              <h3>Traditional Pickles</h3>
              <p>
                Authentic Himalayan pickles made with local recipes.
              </p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="dashboard-banner">
          <h2>Need Assistance?</h2>

          <p>
            Contact our team for bulk orders, product details,
            or any support related to PahadiKart.
          </p>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-btn"
          >
            Contact on WhatsApp
          </a>
        </div>

      </div>

      <Footer />
    </>
  );
}