import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const products = [
  {
    id: 1,
    title: "Millet Snacks",
    price: 40,
    image: "https://www.suprally.com/s/67b5c8fa10c17636cc233feb/684ad2493653fc2a2c76ae08/download-id-1m23w9fatlhpthfwtke01waqjaj3_gj13.png"
  },
  {
    id: 2,
    title: "Millet Cookies",
    price: 60,
    image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8292895a.webp"
  },
  {
    id: 3,
    title: "Apple Juice",
    price: 80,
    image: "https://www.chowhound.com/img/gallery/brands-of-apple-juice-ranked-worst-to-best/intro-1728485822.jpg"
  },
  {
    id: 4,
    title: "Fruit Pickle",
    price: 120,
    image: "https://honeybazzar.com/wp-content/uploads/2024/12/Mix-Fruit-image-3-scaled.jpg"
  },
  {
    id: 5,
    title: "Ragi Crackers",
    price: 50,
    image: "https://cdn.grofers.com/da/cms-assets/cms/product/f15b90c2-3288-416c-9164-0df4fb9d583e.jpg"
  },
  {
    id: 6,
    title: "Buransh Squash",
    price: 180,
    image: "https://tse1.mm.bing.net/th/id/OIP.GVK6hWjtN34nxsDmPsw-HQHaEl?pid=Api&P=0&h=180"
  },
  {
    id: 7,
    title: "Millet Energy Bars",
    price: 90,
    image: "https://dms.mydukaan.io/original/jpeg/media/24415c3e-1dd2-495a-b9c1-f2f5f14196be.jpg"
  }
];

  const [cart, setCart] = useState({});

  const updateQty = (id, change) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + change);

      return {
        ...prev,
        [id]: newQty,
      };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalBill = products.reduce((sum, p) => {
    return sum + (cart[p.id] || 0) * p.price;
  }, 0);

  // WhatsApp full cart order
  const orderAllOnWhatsApp = () => {
    let message = "Hello PahadiKart, I want to order:\n\n";

    products.forEach((p) => {
      if (cart[p.id] > 0) {
        message += `• ${p.title} x ${cart[p.id]} = ₹${cart[p.id] * p.price}\n`;
      }
    });

    message += `\nTotal Items: ${totalItems}`;
    message += `\nTotal Bill: ₹${totalBill}`;

    const url = `https://wa.me/918218366275?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Navbar cartCount={totalItems} />

      <Hero />
      

      {/* CART SUMMARY */}
      {totalItems > 0 && (
        <div className="cart-summary">
          <div>
          <h2>Cart Summary</h2>
          </div>
          <p>🛒 Items: {totalItems}</p>
          <p>💰 Total: ₹{totalBill}</p>

          <button className="whatsapp-btn" onClick={orderAllOnWhatsApp}>
            Order on WhatsApp
          </button>
        </div>
      )}

      <div className="card-grid">
        {products.map((p) => (
          <Card
            key={p.id}
            title={p.title}
            image={p.image}
            price={p.price}
            quantity={cart[p.id] || 0}
            onIncrease={() => updateQty(p.id, 1)}
            onDecrease={() => updateQty(p.id, -1)}
          />
        ))}
      </div>
<section className="help-section">
  <div className="help-card">

    <h2>Connect & Help</h2>

    <p className="subtext">
      Get support for setting up or understanding the Rural Industrial Cluster
    </p>

    <div className="info">
      <h4>📍 Location</h4>
      <p>Rural Industrial Zone, Near Haldwani, Uttarakhand</p>
    </div>

    <div className="info">
      <h4>📞 Contact</h4>
      <p>+91 98765 43210</p>
    </div>

    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noreferrer"
      className="help-btn"
    >
      💬 Connect on WhatsApp
    </a>

  </div>
</section>
      <Footer />
      
    </>
  );
}