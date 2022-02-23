const express = require('express');

const controller = require('../controllers/auth-controller');

const router = express.Router();

//new user sign up
router.post('/signup', controller.createUser);

//get the user by id
//router.post('/login', controller.userLogin);

module.exports = router;