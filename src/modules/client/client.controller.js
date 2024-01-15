const Client = require("../../models/clientModel");
const { createFrombody } = require("../../utils/utils");

// GET all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific client by ID
const getClientById = async (req, res) => {
  res.json(res.client);
};

// POST a new client
const createClient = async (req, res) => {
  const client = new Client(req.body);
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a client by ID
const updateClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const accepted_keys = [
      "name",
      "image",
      "contact",
      "email",
      "from",
      "to",
      "orders",
    ];

    const prev_client = await Client.findById(id).then(res => res._doc || res);

    if (!prev_client) return res.status(401).json({message: "WRONG ID"})

    const modified_fields = createFrombody(body, accepted_keys);
  
    const update = {
      ...prev_client,
      ...modified_fields,
    };

    await Client.updateOne({_id: id}, update)

    res.json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a client by ID
const deleteClientById = async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClientById,
  deleteClientById,
};
