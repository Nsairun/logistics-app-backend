const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    quarter: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
