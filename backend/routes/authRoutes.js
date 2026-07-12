const authLimiter = require("../middleware/authLimiter");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");
const passport = require("passport");

const router = express.Router();

const createToken = (userId) => {
return jwt.sign({ userId }, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || "7d",
});
};

// POST /api/auth/register
router.post(
"/register",
authLimiter,
[
body("name").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
body("password")
.isLength({ min: 6 })
.withMessage("Password must be at least 6 characters"),
],
async (req, res, next) => {
try {
const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = createToken(user._id);

  return res.status(201).json({
    success: true,
    message: "Registration successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
} catch (error) {
  next(error);
}

}
);

// POST /api/auth/login
router.post(
"/login",
authLimiter,
[
body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
body("password").notEmpty().withMessage("Password is required"),
],
async (req, res, next) => {
try {
const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = createToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
} catch (error) {
  next(error);
}


}
);

// GET /api/auth/profile (Protected API)
router.get("/profile", requireAuth, async (req, res) => {
return res.status(200).json({
success: true,
message: "Protected profile data accessed successfully",
user: req.user,
});
});
// ================= GOOGLE OAUTH =================

// Start Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    const token = createToken(req.user._id);

    res.redirect(
      `${process.env.FRONTEND_URL}/login?token=${token}`
    );
  }
);
module.exports = router;
