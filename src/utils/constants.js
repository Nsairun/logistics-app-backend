const { config } = require("dotenv");

config();

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const JWT_PRIVATEKEY = process.env.JWT_PRIVATEKEY || "";

const API_BASE_URL = process.env.API_BASE_URL || "";

const roles = {
  ADMIN: "admin",
  MODERATOR: "personnel",
  USER: "user",
};

module.exports = { SALT_ROUNDS, JWT_PRIVATEKEY, roles, API_BASE_URL };
