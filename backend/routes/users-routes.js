const express = require('express');

const controller = require('../controllers/users-controller');

const router = express.Router();

//get user list
router.get('/', controller.getUserList);

//get the user by id
router.get('/:uid', controller.getUserById);

//create a user
router.post('/', controller.createUser);

//update user's info
router.patch('/:uid', controller.updateUserById);

//delete the user
router.delete('/:uid', controller.deleteUserById);

module.exports = router;
