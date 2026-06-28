const products = require("../models/products");

// GET All Products
const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

// GET Single Product
const getProductById = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json(product);
};

// POST Product
const addProduct = (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product: newProduct,
  });
};

// PUT Product
const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.category = req.body.category || product.category;

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

// DELETE Product
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  products.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

// SEARCH Products
const searchProducts = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  res.status(200).json(filtered);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};