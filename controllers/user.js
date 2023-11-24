const { validationResult } = require("express-validator");
const User = require("../models/users");
const { BCRYPT, JWT } = require("../utils/utils");

exports.signup = async (req, res) => {
  console.log("gghjchvg", req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const { fullname, email, password, quarter } = req.body;

  try {
    const hash = BCRYPT.hash(password);
    const user = await User.create({
      fullname,
      email,
      password: hash,
      quarter,
    });
    const token = JWT.sign(user);

    return res.json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Unable to add user",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log({ user });

    const match = BCRYPT.compare(password, user.password);

    if (!match) {
      res.json({
        message: "Incorrect password",
        user: null,
      });
    }

    const token = JWT.sign(user);

    return res.json({
      message: "Signin successful",
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        quarter: user.quarter,
      },
    });
  } catch (error) {
    return res.json({
      message: "and error occured",
      error,
    });
  }
};

exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to sign out",
      });
    }

    return res.json({
      message: "Signout successful",
    });
  });
};
