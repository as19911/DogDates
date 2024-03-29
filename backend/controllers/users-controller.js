const HttpError = require('../models/http-error');
let fakeUsersDB = require('../testingDatabase/fake-users.json');

const getUserList = (req, res, next) => {
    res.status(201).json({fakeUsersDB});
}


const getUserById = (req, res, next) => {
    const uid = req.params.uid;

    //check if the uid valid
    const user = fakeUsersDB.find(usr =>{
        return usr.id === uid;
    });

    //return error if uid is not valid
    if(!user){
        return next(new HttpError('User does not exist!', 404));
    }

    res.status(201).json(user);
}


const createUser = (req, res, next) => {
    const newId = fakeUsersDB.length+1;

    //get params from request body
    const {userName, dogName, city} = req.body;

    //create a user
    const newUser = {
        id: newId,
        userName,
        dogName,
        city
    };

    //add user to the fake DB
    fakeUsersDB.push(newUser);


    res.status(201).json(newUser);
}


const updateUserById = (req, res, next) => {
    const uid = req.params.uid;

    //get params from request body
    const {userName, dogName, city} = req.body;

    //update user info
    const user = { ...fakeUsersDB.find(usr => usr.id === uid)};
    const userIndex = fakeUsersDB.find(usr => usr.id === uid);

    user.userName = userName;
    user.city = city;
    user.dogName = dogName;

    fakeUsersDB[userIndex] = user;

    //send response
    res.status(201).json({msg:'user updated.', user});
}

const deleteUserById = (req, res, next) => {
    const uid = req.params.uid;
    const user = { ...fakeUsersDB.find(usr => usr.id === uid)};

    //return error if uid is not valid
    if(!user){
        return next(new HttpError('User does not exist!', 404));
    }

    //remove user from fakeDB
    fakeUsersDB = fakeUsersDB.filter(usr => usr.id !== uid);

    //send response
    res.status(201).json({msg:'user deleted.', user});
}


exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.getUserList = getUserList;
