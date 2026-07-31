import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Loader } from "../components/ui";


export default function Home() {
  const API_URL = `${import.meta.env.VITE_API_URL}/api`;
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mapProducts = (data) => {
  return data.map((p) => ({
    id: p._id,
    title: p.name,
    price: p.price,
    category: p.category,
    image: p.image,
  }));
};

  useEffect(() => {
  const initFetch = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);

      if (!res.ok) {
        throw new Error("Backend response was not successful");
      }

      const data = await res.json();
      const mapped = mapProducts(data);

      setAllProducts(mapped);
      setDisplayedProducts(mapped);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load products. Please try again later.");
      setAllProducts([]);
      setDisplayedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  initFetch();
}, []);

  useEffect(() => {
    if (loading) return;

    const fetchSearch = async () => {
      try {
        const url = searchQuery.trim()
  ? `${API_URL}/products/search?q=${encodeURIComponent(searchQuery)}`
  : `${API_URL}/products`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Search API response was not successful");
        }

        const data = await res.json();
        setDisplayedProducts(mapProducts(data));
      } catch (err) {
        console.error("Search fetch failed, using client-side fallback:", err);

        const filtered = allProducts.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setDisplayedProducts(filtered);
      }
    };

    const delayDebounceFn = setTimeout(fetchSearch, 300);

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

  const totalBill = allProducts.reduce((sum, p) => {
  return sum + (cart[p.id] || 0) * p.price;
}, 0);

  const orderAllOnWhatsApp = () => {
    let message = "Hello PahadiKart, I want to order:\n\n";
    const sourceProducts = allProducts;

    sourceProducts.forEach((p) => {
      if (cart[p.id] > 0) {
        message += `• ${p.title} x ${cart[p.id]} = ₹${
          cart[p.id] * p.price
        }\n`;
      }
    });

    message += `\nTotal Items: ${totalItems}`;
    message += `\nTotal Bill: ₹${totalBill}`;

    const url = `https://wa.me/918218366275?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };
  if (loading) {
  return (
    <>
      <Navbar cartCount={0} />
      <Hero />
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Loader />
      </div>
      <Footer />
    </>
  );
}

  return (
    <>
      <Navbar cartCount={totalItems} />

      <Hero />

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
  {error ? (
    <div className="no-results">
      <h3>⚠️ {error}</h3>
    </div>
  ) : displayedProducts.length > 0 ? (
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
            Get support for setting up or understanding the Rural Industrial
            Cluster
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