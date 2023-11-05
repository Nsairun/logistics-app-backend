// const { validationResult } = require('express-validator');
// const User = require('../models/users');

// exports.signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       error: errors.array()[0].msg,
//     });
//   }

//   const { name, email, password, lastname } = req.body;

//   try {
//     const user = await User.create({ name, email, password, lastname });
//     return res.json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({
//       error: "Unable to add user",
//     });
//   }
// };

// exports.signin = (req, res) => {
//     const { email, password } = req.body;
  
//     User.findOne({ email }, (err, user) => {
//       if (err || !user) {
//         return res.status(400).json({
//           error: "Email was not found",
//         });
//       }
  
//       if (!user.authenticate(password)) {
//         return res.status(400).json({
//           error: "Incorrect password",
//         });
//       }
  
//       return res.json({
//         message: "Signin successful",
//         user: {
//           name: user.name,
//           email: user.email,
//           lastname: user.lastname,
//         },
//       });
//     });
//   };


// exports.signout = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({
//         error: "Failed to sign out",
//       });
//     }
    
//     return res.json({
//       message: "Signout successful",
//     });
//   });
// };