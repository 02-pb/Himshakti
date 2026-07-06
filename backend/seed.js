const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");

const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

// Tumhare Wi-Fi DNS issue ke liye
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Purane products hata dega, duplicate nahi banenge
    await Product.deleteMany();

    // id field hata kar MongoDB ke automatic _id use honge
    const productsForDB = products.map(({ id, ...product }) => product);

    await Product.insertMany(productsForDB);

    console.log("✅ 7 products MongoDB me successfully insert ho gaye");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();