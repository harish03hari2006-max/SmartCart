const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
});

// GET seed products
router.get("/seed", async (req, res) => {
  try {
    const products = [
      {
        id: 4,
        name: "Gaming Mouse",
        category: "Accessories",
        price: 1499,
        image: "🖱️",
        description: "High precision gaming mouse",
      },
      {
        id: 5,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 2999,
        image: "⌨️",
        description: "RGB mechanical gaming keyboard",
      },
      {
        id: 6,
        name: "Smart Watch",
        category: "Wearables",
        price: 3999,
        image: "⌚",
        description: "Smart watch with fitness tracking",
      },
      {
        id: 7,
        name: "Bluetooth Speaker",
        category: "Audio",
        price: 2499,
        image: "🔊",
        description: "Portable Bluetooth speaker",
      },
      {
        id: 8,
        name: "Power Bank",
        category: "Accessories",
        price: 1299,
        image: "🔋",
        description: "10000mAh fast charging power bank",
      },
      {
        id: 9,
        name: "Tablet",
        category: "Electronics",
        price: 18999,
        image: "📱",
        description: "Powerful tablet for entertainment and work",
      },
      {
        id: 10,
        name: "Monitor",
        category: "Electronics",
        price: 12999,
        image: "🖥️",
        description: "Full HD monitor for work and gaming",
      },
      {
        id: 11,
        name: "Webcam",
        category: "Accessories",
        price: 1999,
        image: "📷",
        description: "HD webcam for online meetings",
      },
      {
        id: 12,
        name: "USB-C Cable",
        category: "Accessories",
        price: 499,
        image: "🔌",
        description: "Fast charging USB-C cable",
      },
      {
        id: 13,
        name: "Wireless Earbuds",
        category: "Audio",
        price: 1999,
        image: "🎧",
        description: "Compact wireless earbuds",
      },
      {
        id: 14,
        name: "Laptop Stand",
        category: "Accessories",
        price: 999,
        image: "💻",
        description: "Adjustable laptop stand",
      },
      {
        id: 15,
        name: "Smart TV",
        category: "Electronics",
        price: 32999,
        image: "📺",
        description: "4K smart television",
      },
    ];

    const savedProducts = await Product.insertMany(products);

    res.json({
      message: "Products added successfully",
      count: savedProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add products",
      error: error.message,
    });
  }
});

// Add one product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});

module.exports = router;