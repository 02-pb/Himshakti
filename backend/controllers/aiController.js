const { GoogleGenAI } = require("@google/genai");
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  
});

const getRecommendation = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const fullPrompt = `
You are an AI assistant for PahadiKart.

Based on the user's requirement, recommend suitable Himalayan food products.

Products available:
- Millet Snacks
- Millet Cookies
- Apple Juice
- Fruit Pickle
- Ragi Crackers
- Buransh Squash
- Millet Energy Bars

User Requirement:
${prompt}

Reply in this format:

Recommended Products:
Reason:
Healthy Tip:
`;

    const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: fullPrompt,
});

    res.json({
      success: true,
      response: response.text,
    });
  } catch (error) {
  console.error("Gemini Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

module.exports = {
  getRecommendation,
};