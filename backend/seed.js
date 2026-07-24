const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const Product = require("./models/Product");

dotenv.config();
async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const products = [
      {
        name: "Millet Snacks",
        price: 40,
        category: "Healthy Snacks",
        image:
          "https://www.suprally.com/s/67b5c8fa10c17636cc233feb/684ad2493653fc2a2c76ae08/download-id-1m23w9fatlhpthfwtke01waqjaj3_gj13.png",
      },
      {
        name: "Millet Cookies",
        price: 60,
        category: "Healthy Snacks",
        image:
          "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8292895a.webp",
      },
      {
        name: "Apple Juice",
        price: 80,
        category: "Drinks",
        image:
          "https://www.chowhound.com/img/gallery/brands-of-apple-juice-ranked-worst-to-best/intro-1728485822.jpg",
      },
      {
        name: "Fruit Pickle",
        price: 120,
        category: "Traditional",
        image:
          "https://honeybazzar.com/wp-content/uploads/2024/12/Mix-Fruit-image-3-scaled.jpg",
      },
      {
        name: "Ragi Crackers",
        price: 50,
        category: "Healthy Snacks",
        image:
          "https://cdn.grofers.com/da/cms-assets/cms/product/f15b90c2-3288-416c-9164-0df4fb9d583e.jpg",
      },
      {
        name: "Buransh Squash",
        price: 180,
        category: "Drinks",
        image:
          "https://tse1.mm.bing.net/th/id/OIP.GVK6hWjtN34nxsDmPsw-HQHaEl?pid=Api&P=0&h=180",
      },
      {
        name: "Millet Energy Bars",
        price: 90,
        category: "High Protein",
        image:
          "https://dms.mydukaan.io/original/jpeg/media/24415c3e-1dd2-495a-b9c1-f2f5f14196be.jpg",
      },
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ Products Seeded Successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();