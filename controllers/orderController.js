const Order = require("../models/order");
const { createFrombody } = require("../utils/utils");

// GET all Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific Order by ID
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};

// POST a new Order
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE an Order by ID
const updateOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const accepted_keys = [
      "client_id",
      "productName",
      "location",
      "pointFrom",
      "pointTo",
      "pending",
      "vehicule",
    ];

    const prev_Order = await Order.findById(id).then(res => res._doc || res);

    if (!prev_Order) return res.status(404).json({ message: "Order not found" });

    const modified_fields = createFrombody(body, accepted_keys);

    const update = {
      ...prev_Order,
      ...modified_fields,
    };

    await Order.updateOne({ _id: id }, update);

    res.json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an Order by ID
const deleteOrderById = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};