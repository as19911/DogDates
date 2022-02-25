const express = require('express');
const { check } = require('express-validator');

const controller = require('../controllers/auth-controller');

const router = express.Router();


//user login
router.post('/login', [
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
], controller.userLogin);

module.exports = router;