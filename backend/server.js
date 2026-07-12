const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();   // <-- YE SABSE PEHLE HONA CHAHIYE

const session = require("express-session");
const passport = require("passport");

const connectDB = require("./config/db");
require("./config/passport");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

// Product Routes
app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});