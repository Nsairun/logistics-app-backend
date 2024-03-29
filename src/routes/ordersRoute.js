const express = require('express');
const router = express.Router();
const OrderController = require('../modules/order/order.controller');

// GET all order
router.get('/order', OrderController.getAllOrders);

router.get('/user/:userId', OrderController.getUserOrders);

// GET a specific Order by ID
router.get('/order/:id', OrderController.getOrderById);

// POST a new Order
router.post('/order', OrderController.createOrder);

// UPDATE a Order by ID
router.patch('/order/:id', OrderController.updateOrderById);

// DELETE a Order by ID
router.delete('/order/:id', OrderController.deleteOrderById);

module.exports = router;
