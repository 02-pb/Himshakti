const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to HimShakti Backend API 🚀",
  });
});

// Product Routes
app.use("/api/products", productRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});