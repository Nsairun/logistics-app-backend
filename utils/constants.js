const { config } = require("dotenv");

config();

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const JWT_PRIVATEKEY = process.env.JWT_PRIVATEKEY || "";

module.exports = { SALT_ROUNDS, JWT_PRIVATEKEY };
