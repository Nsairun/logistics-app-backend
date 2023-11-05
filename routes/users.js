const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/user');
const { check } = require('express-validator');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', [
  check('name').isLength({ min: 3 }).withMessage("Name should be at least 3 characters"),
  check('email').isEmail().withMessage("Email should be valid"),
  check('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters")
], signup);

router.post('/signin', signin);

router.get('/signout', signout);

module.exports = router;