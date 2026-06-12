import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">
        <div className="about-header">
          <h1>🌿 About PahadiKart</h1>

          <p>
            Bringing the authentic taste of the Himalayas to your doorstep
            while empowering local communities and promoting sustainable living.
          </p>
        </div>

        <div className="about-features">
          <div className="feature-box">
            <div className="feature-icon">🥣</div>

            <h3>Authentic Products</h3>

            <p>
              Discover millet snacks, traditional mixes, herbal beverages,
              and handcrafted Himalayan specialties.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🤝</div>

            <h3>Community Support</h3>

            <p>
              Supporting rural entrepreneurs and creating opportunities
              for local producers in Uttarakhand.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📱</div>

            <h3>Easy Ordering</h3>

            <p>
              Browse products and place orders effortlessly through
              our WhatsApp-enabled platform.
            </p>
          </div>
        </div>

        <div className="contact-card">
          <h2>Get in Touch</h2>

          <div className="contact-info">
            <div>
              <span>📍</span>
              <p>Haldwani, Uttarakhand</p>
            </div>

            <div>
              <span>📞</span>
              <p>+91 8218366275</p>
            </div>

            <div>
              <span>✉️</span>
              <p>support@pahadikart.in</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}