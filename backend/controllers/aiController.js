const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getFallbackRecommendation = (prompt) => {
  const text = prompt.toLowerCase();

  if (text.includes("weight")) {
    return `
Recommended Products:
• Ragi Crackers
• Millet Snacks

Reason:
These products are rich in fiber and help keep you full for longer.

Healthy Tip:
Stay hydrated and include regular exercise in your daily routine.
`;
  }

  if (text.includes("protein")) {
    return `
Recommended Products:
• Millet Energy Bars

Reason:
They provide a good amount of energy and protein for an active lifestyle.

Healthy Tip:
Include protein-rich foods in every meal.
`;
  }

  if (
    text.includes("drink") ||
    text.includes("juice") ||
    text.includes("refresh")
  ) {
    return `
Recommended Products:
• Buransh Squash
• Apple Juice

Reason:
Refreshing Himalayan beverages rich in natural flavor.

Healthy Tip:
Choose natural drinks instead of sugary soft drinks.
`;
  }

  if (
    text.includes("immunity") ||
    text.includes("immune")
  ) {
    return `
Recommended Products:
• Apple Juice
• Buransh Squash

Reason:
Rich in natural nutrients and antioxidants.

Healthy Tip:
Eat seasonal fruits and maintain a balanced diet.
`;
  }

  return `
Recommended Products:
• Millet Snacks
• Millet Cookies

Reason:
Healthy everyday snacks made from Himalayan millets.

Healthy Tip:
Eat balanced meals and stay physically active.
`;
};

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
      model: "gemini-2.0-flash",
      contents: fullPrompt,
    });

    return res.json({
      success: true,
      response: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.json({
      success: true,
      response: getFallbackRecommendation(req.body.prompt),
    });
  }
};

module.exports = {
  getRecommendation,
};