const { validationResult } = require("express-validator");
const User = require("../../models/users");
const { BCRYPT, JWT } = require("../../utils/utils");
const { roles, API_BASE_URL } = require("../../utils/constants");
const { sendVerificationEmail } = require("../../services/email/send-email");

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    const { fullname, email, password, quarter } = req.body;
    const prev_user = await User.findOne({ email });

    if (prev_user) {
      return res.status(409).json({
        status: 409,
        message: "USER ALREADY EXISTS",
        data: null,
      });
    }

    const hash = BCRYPT.hash(password);
    const user = await User.create({
      fullname,
      email,
      password: hash,
      quarter,
    });
    const token = JWT.sign(user);

    const url = `${API_BASE_URL}/api/users/verify/${user.id}`;

    await sendVerificationEmail({
      url,
      email_to: user.email,
    });

    return res.json({
      message: "User created successfully, verification link sent to email",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Unable to add user",
      err,
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

exports.getOne = async (req, res) => {
  try {
    const user = await User.find(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const authorization = req.headers.authorization;

    const token = authorization.split(" ").pop();

    const _res = JWT.verify(token);

    const current_user = _res?._doc || _res;

    if (!current_user) {
      res.status(401).json({
        message: "token expired",
        user: null,
      });
    }

    return res.json({
      message: "success",
      user: current_user,
    });
  } catch (error) {
    return res.json({
      message: "and error occured",
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    console.log({ allUsers });

    return res.json({
      message: "Retrieved all users successfully",
      users: allUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Unable to retrieve users",
      message: error.message,
    });
  }
};

exports.updateUserRoles = async (req, res) => {
  try {
    const { newRole, arrIds } = req.body;

    console.log({ newRole, arrIds });

    const arr_roles = ["ADMIN", "USER", "PERSONNEL"];

    if (!arr_roles.includes(newRole)) {
      return res.status(401).json({
        message: "unknown role",
        data: null,
      });
    }

    const updated_users = await User.updateMany(
      { _id: { $in: arrIds } },
      { role: newRole }
    );

    return res.status(200).json({
      message: "User role updated successfully",
      data: updated_users,
    });
  } catch (error) {
    console.error("Failed to update user role:", error);
    return res.status(500).json({ message: "Failed to update user role" });
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
