const express = require('express');
const router = express.Router();
const { signup, signin, signout, getCurrentUser, getAllUsers, updateUserRoles, getOne } = require('../modules/users/user.controller');
const { check } = require('express-validator');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', [
  check('fullname').isLength({ min: 3 }).withMessage("fullname should be at least 3 characters"),
  check('email').isEmail().withMessage("Email should be valid"),
  check('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters")
], signup);

router.post('/signin', signin);

router.get('/signout', signout);

router.get('/current-user', getCurrentUser);

router.get('/all', getAllUsers);

router.get('/get-one', getOne);

router.put('/update-role', updateUserRoles)


module.exports = router;