import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Loader } from "../components/ui";

const recommendations = {
  "Healthy Snacks": {
    product: "Millet Cookies",
    reason:
      "Rich in fibre and made from healthy millets. Perfect for everyday snacking.",
    confidence: "98%",
  },

  "Weight Loss": {
    product: "Ragi Crackers",
    reason:
      "Low in calories and high in fibre, making them a great choice for weight management.",
    confidence: "96%",
  },

  "High Protein": {
    product: "Millet Energy Bars",
    reason:
      "Packed with protein and natural energy for an active lifestyle.",
    confidence: "99%",
  },

  "Refreshing Drink": {
    product: "Buransh Squash",
    reason:
      "Natural Himalayan drink that helps keep you refreshed and hydrated.",
    confidence: "94%",
  },

  "Traditional Taste": {
    product: "Fruit Pickle",
    reason:
      "Authentic homemade Himalayan pickle prepared using traditional methods.",
    confidence: "97%",
  },
};

export default function AIRecommendation() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  

  const handleRecommendation = async () => {
    if (!goal) {
      alert("Please select your goal.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/products/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data.recommendation);
      } else {
        setResult(recommendations[goal]);
      }
    } catch (err) {
      console.error("Failed to fetch recommendation, using static fallback:", err);
      setResult(recommendations[goal]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <div className="ai-container">
        <div className="ai-card">

          <h1>🤖 AI Product Recommendation</h1>

          <p>
            Tell us your goal and our AI will recommend the best
            Himalayan product for you.
          </p>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select your goal</option>
            <option>Healthy Snacks</option>
            <option>Weight Loss</option>
            <option>High Protein</option>
            <option>Refreshing Drink</option>
            <option>Traditional Taste</option>
          </select>

          <br />
          <br />

          <button
  className="recommend-btn"
  onClick={handleRecommendation}
>
  🤖 Get Recommendation
</button>

          <br />
          <br />

          {loading && <Loader />}

          {result && !loading && (
            <div className="recommendation-card">
              <h2>✨ Recommended Product</h2>

              <h3>{result.product}</h3>

              <p>{result.reason}</p>

              <p className="confidence">
  🎯 AI Confidence: <strong>{result.confidence}</strong>
</p>

              <Button>
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
