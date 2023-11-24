const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// GET all clients
router.get('/clients', clientController.getAllClients);

// GET a specific client by ID
router.get('/clients/:id', clientController.getClientById);

// POST a new client
router.post('/clients', clientController.createClient);

// UPDATE a client by ID
router.patch('/clients/:id', clientController.updateClientById);

// DELETE a client by ID
router.delete('/clients/:id', clientController.deleteClientById);

module.exports = router;
