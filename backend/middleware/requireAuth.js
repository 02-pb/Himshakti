const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
try {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized: Token is required",
  });
}

const token = authHeader.split(" ")[1];

const decoded = jwt.verify(token, process.env.JWT_SECRET);

const user = await User.findById(decoded.userId).select("-password");

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized: User not found",
  });
}

req.user = user;
next();


}catch (error) {
  console.log("JWT VERIFY ERROR:", error.name, "-", error.message);
  console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);

  return res.status(401).json({
    success: false,
    message: "Unauthorized: " + error.message,
  });
}
}

module.exports = requireAuth;
