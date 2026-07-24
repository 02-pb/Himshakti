const Product = require("../models/Product");

// GET All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// GET Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST Product
const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const imageMap = {
      "Millet Snacks":
        "https://www.suprally.com/s/67b5c8fa10c17636cc233feb/684ad2493653fc2a2c76ae08/download-id-1m23w9fatlhpthfwtke01waqjaj3_gj13.png",

      "Millet Cookies":
        "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8292895a.webp",

      "Apple Juice":
        "https://www.chowhound.com/img/gallery/brands-of-apple-juice-ranked-worst-to-best/intro-1728485822.jpg",

      "Fruit Pickle":
        "https://honeybazzar.com/wp-content/uploads/2024/12/Mix-Fruit-image-3-scaled.jpg",

      "Ragi Crackers":
        "https://cdn.grofers.com/da/cms-assets/cms/product/f15b90c2-3288-416c-9164-0df4fb9d583e.jpg",

      "Buransh Squash":
        "https://tse1.mm.bing.net/th/id/OIP.GVK6hWjtN34nxsDmPsw-HQHaEl?pid=Api&P=0&h=180",

      "Millet Energy Bars":
        "https://dms.mydukaan.io/original/jpeg/media/24415c3e-1dd2-495a-b9c1-f2f5f14196be.jpg",
    };

    const product = await Product.create({
      name,
      price,
      category,
      image:
        imageMap[name] ||
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// PUT Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH Products
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q || "";

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};