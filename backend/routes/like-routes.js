const express = require('express');

const controller = require('../controllers/like-controller');

const router = express.Router();

//get the list of user's liked users
router.get('/:uid', controller.getListByUser);

//update a user's list
router.patch('/:uid', controller.updateListByUser);

module.exports = router;
