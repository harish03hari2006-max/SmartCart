const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    id: 1,
    name: "Smartphone",
    category: "Electronics",
    price: 24999,
    image: "📱",
    description: "Latest smartphone with powerful features."
  },
  {
    id: 2,
    name: "Laptop",
    category: "Electronics",
    price: 54999,
    image: "💻",
    description: "Powerful laptop for work and entertainment."
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    image: "🎧",
    description: "High quality wireless headphones."
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added Successfully");

    process.exit();
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
}

seedProducts();