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
router.post("/", addProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;