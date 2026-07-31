import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Loader } from "../components/ui";



export default function AIRecommendation() {
  const API_URL = `${import.meta.env.VITE_API_URL}/api`;
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [error, setError] = useState("");

  const handleRecommendation = async () => {
  const finalPrompt = customPrompt.trim() || goal;

  if (!finalPrompt) {
    alert("Please select your goal or type your requirement.");
    return;
  }

  setLoading(true);
setResult(null);
setError("");

  try {
   const res = await fetch(`${API_URL}/ai/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: finalPrompt,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setResult(data.response);
    } else {
      setError(data.message);
    }
  } catch (err) {
    console.log(err);
    setError("Failed to get AI recommendation. Please try again.");
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
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "17px",
    marginBottom: "20px",
  }}
>
  <option value="">Select your goal</option>

  <option value="Healthy Snacks">
    Healthy Snacks
  </option>

  <option value="Weight Loss">
    Weight Loss
  </option>

  <option value="High Protein">
    High Protein
  </option>

  <option value="Immunity Booster">
    Immunity Booster
  </option>

  <option value="Refreshing Drink">
    Refreshing Drink
  </option>

  <option value="Traditional Foods">
    Traditional Foods
  </option>
</select>
<div
  style={{
    textAlign: "center",
    marginBottom: "15px",
    color: "#777",
    fontWeight: "bold",
  }}
>
OR
</div>
<input
  type="text"
  placeholder="Type your own requirement..."
  value={customPrompt}
  onChange={(e) => setCustomPrompt(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "17px",
    marginBottom: "30px",
  }}
/>

          <br />
          <br />

          <button
  className="recommend-btn"
  onClick={handleRecommendation}
>
  🤖 Get AI Recommendation
</button>

<br />
<br />

{loading && <Loader />}

{error && (
  <div
    style={{
      backgroundColor: "#ffe5e5",
      color: "#d32f2f",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "15px",
      fontWeight: "600",
      textAlign: "center",
    }}
  >
    ❌ {error}
  </div>
)}

{result && !loading && (
  <div className="recommendation-card">
    <h2>🤖 AI Recommendation</h2>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        textAlign: "left",
        lineHeight: "1.7",
        fontSize: "16px",
      }}
    >
      {result}
    </pre>
  </div>
)}

        </div>
      </div>

      <Footer />
    </>
  );
}