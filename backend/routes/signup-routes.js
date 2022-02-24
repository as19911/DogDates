const express = require('express');

const controller = require('../controllers/signup-controller');

const router = express.Router();

//new user sign up
router.post('/', controller.createUser);

module.exports = router;