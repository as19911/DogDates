const HttpError = require('../models/http-error');
const UserDB = require('../persistence/db-user');

const createUser = async (req, res, next) => {

    //get params from request body
    const {userName, password, ownerName, dogName, city, description} = req.body;


    //create a user
    let newUser = {
        userName,
        password,
        ownerName,
        dogName,
        city,
        description,
        pictures: ['test.pic']
    };

    //add user to the fake DB
    try{
        await UserDB.addUser(newUser);
    }catch(error){
        return next(error);
    }

    //TO-DO Handle image upload

    res.status(201).json(newUser);
}

exports.createUser = createUser;