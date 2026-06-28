import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

const defaultProducts = [
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

const imageMap = {
  "Millet Snacks": "https://www.suprally.com/s/67b5c8fa10c17636cc233feb/684ad2493653fc2a2c76ae08/download-id-1m23w9fatlhpthfwtke01waqjaj3_gj13.png",
  "Millet Cookies": "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8292895a.webp",
  "Apple Juice": "https://www.chowhound.com/img/gallery/brands-of-apple-juice-ranked-worst-to-best/intro-1728485822.jpg",
  "Fruit Pickle": "https://honeybazzar.com/wp-content/uploads/2024/12/Mix-Fruit-image-3-scaled.jpg",
  "Ragi Crackers": "https://cdn.grofers.com/da/cms-assets/cms/product/f15b90c2-3288-416c-9164-0df4fb9d583e.jpg",
  "Buransh Squash": "https://tse1.mm.bing.net/th/id/OIP.GVK6hWjtN34nxsDmPsw-HQHaEl?pid=Api&P=0&h=180",
  "Millet Energy Bars": "https://dms.mydukaan.io/original/jpeg/media/24415c3e-1dd2-495a-b9c1-f2f5f14196be.jpg"
};

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all products on mount to initialize
  useEffect(() => {
    const initFetch = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map(p => ({
            id: p.id,
            title: p.name,
            price: p.price,
            category: p.category,
            image: imageMap[p.name] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
          }));
          setAllProducts(mapped);
          setDisplayedProducts(mapped);
        } else {
          setAllProducts(defaultProducts);
          setDisplayedProducts(defaultProducts);
        }
      } catch (err) {
        console.error("Failed to connect to backend, using static fallback:", err);
        setAllProducts(defaultProducts);
        setDisplayedProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };
    initFetch();
  }, []);

  // Fetch from search endpoint when searchQuery changes
  useEffect(() => {
    if (loading && allProducts.length === 0) return;

    const fetchSearch = async () => {
      try {
        const url = searchQuery.trim()
          ? `http://localhost:5000/api/products/search?q=${encodeURIComponent(searchQuery)}`
          : `http://localhost:5000/api/products`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map(p => ({
            id: p.id,
            title: p.name,
            price: p.price,
            category: p.category,
            image: imageMap[p.name] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400"
          }));
          setDisplayedProducts(mapped);
        } else {
          const filtered = allProducts.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setDisplayedProducts(filtered);
        }
      } catch (err) {
        console.error("Search fetch failed, using client-side fallback:", err);
        const filtered = allProducts.filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setDisplayedProducts(filtered);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, allProducts, loading]);

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

  const totalBill = (allProducts.length ? allProducts : defaultProducts).reduce((sum, p) => {
    return sum + (cart[p.id] || 0) * p.price;
  }, 0);

  // WhatsApp full cart order
  const orderAllOnWhatsApp = () => {
    let message = "Hello PahadiKart, I want to order:\n\n";
    const sourceProducts = allProducts.length ? allProducts : defaultProducts;

    sourceProducts.forEach((p) => {
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
      
      {/* SEARCH BAR */}
      <div className="search-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search for Himalayan organic products (e.g. Millet, Squash, Pickle)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              title="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </div>

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
        {displayedProducts.length > 0 ? (
          displayedProducts.map((p) => (
            <Card
              key={p.id}
              title={p.title}
              image={p.image}
              price={p.price}
              quantity={cart[p.id] || 0}
              onIncrease={() => updateQty(p.id, 1)}
              onDecrease={() => updateQty(p.id, -1)}
            />
          ))
        ) : (
          <div className="no-results">
            <p>🌿 No products found matching "{searchQuery}"</p>
            <p style={{ fontSize: "14px", marginTop: "8px", color: "#888" }}>
              Try searching for something else, like "Millet" or "Juice".
            </p>
          </div>
        )}
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
      <p>+91 8218366275</p>
    </div>

    <a
      href="https://wa.me/918218366275"
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