const express = require('express');

const controller = require('../controllers/users-controller');

const router = express.Router();

//get user list
router.get('/', controller.getUserList);

//get the user by id
router.get('/:uid', controller.getUserById);

//create a user
router.post('/register',
[
    check('userName')
    .not().isEmpty(),
    check('dogName')
    .not().isEmpty(),
    check('city')
    .not().isEmpty(),
    check('profileImage')
    .not().isEmpty(),
    check('email')
    .normalizerEmail().isEmail(),
    check('password').isLength( {min:6})
],
 controller.createUser);

//update user's info
router.patch('/:uid', controller.updateUserById);

//delete the user
router.delete('/:uid', controller.deleteUserById);

module.exports = router;