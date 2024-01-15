// OrderModel.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pointFrom: {
    type: String,
    required: true,
  },
  pointTo: {
    type: String,
    required: true,
  },
  nameOfGood: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "PENDING",
  },
  vehicle: {
    type: String,
    default: "bike",
  },
  timeDeparture: {
    type: String,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;