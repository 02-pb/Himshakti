const requireAuth = require("../middleware/requireAuth");
const express = require("express");

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

// Search Products
router.get("/search", searchProducts);

// Get All Products
router.get("/", getAllProducts);

// Get Single Product
router.get("/:id", getProductById);

// Add Product
router.post("/", requireAuth, addProduct);

router.put("/:id", requireAuth, updateProduct);

router.delete("/:id", requireAuth, deleteProduct);

module.exports = router;