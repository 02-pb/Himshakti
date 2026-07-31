const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load .env FIRST
dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("SERVER GEMINI KEY:", process.env.GEMINI_API_KEY);

const session = require("express-session");
const passport = require("passport");

const connectDB = require("./config/db");
require("./config/passport");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://my-project-1-ten-phi.vercel.app",
  "https://my-project-1-git-master-himshakti.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to HimShakti Backend API 🚀",
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});