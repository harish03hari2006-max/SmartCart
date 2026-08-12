const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    console.log("Orders found:", orders.length);

    res.status(200).json(orders);
  } catch (error) {
    console.log("GET ORDERS ERROR:", error.message);

    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
});

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    console.log("Order received:", req.body);

    const newOrder = new Order({
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      customerName: req.body.customerName,
      address: req.body.address,
      phone: req.body.phone,
      status: "Placed",
    });

    const savedOrder = await newOrder.save();

    console.log("Order saved:", savedOrder._id);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log("POST ORDER ERROR:", error.message);

    res.status(400).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

module.exports = router;