const nodemailer = require("nodemailer");
require("dotenv").config();

const APP_EMAIL = process.env.APP_EMAIL || "";

const emailTransmiter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "",
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_TRANSPORT_USERNAME || "",
    pass: process.env.EMAIL_TRANSPORT_PASSWORD || "",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

module.exports = {
  emailTransmiter,
  APP_EMAIL,
};
