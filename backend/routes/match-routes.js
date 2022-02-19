const express = require('express');

const controller = require('../controllers/match-controller');

const router = express.Router();

//get the list of user's matched users
router.get('/:uid', controller.getListByUser);

//update a user's matched list
router.patch('/:uid', controller.updateListByUser);

module.exports = router;