// OrderModel.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  location: {
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
  status: {
    type: String,
    required: true,
  },
  Vehicule: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;