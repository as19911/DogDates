// this file performs the DB operations related to the User collection

const {UserModel} = require('./db-schema');
const HttpError = require('../models/http-error');

const httpError = new HttpError(
    'Database operation failed, please try again',
    500
);

//check if a user with userName is already exists in the collection
const hasUser = async (userName) => {

    let result = false;

    try{
        result = await UserModel.find({ userName: userName });
    } catch (error) {
        console.log('Error in DB FIND operation');
        console.log(error);
        return httpError;
    }

    console.log('find user result ' + result);
    return result;
};


const addUser = async (userInfo) => {

    userExists = hasUser(userInfo.userName);


    if(userExists){
        console.log('User exists');
        throw new HttpError(
            'User name already exists, please choose a new user name.',
            400
        );
    }

    console.log(userInfo);

    const newUser = new UserModel({
        userName: userInfo.userName,
        password: userInfo.password,
        ownerName: userInfo.ownerName,
        dogName: userInfo.dogName,
        city: userInfo.city,
        description: userInfo.description,
        pictures: userInfo.pictures
    });

    try{
        //await newUser.save();
        console.log('New User Added');
    } catch (error) {
        console.log(error);
        throw httpError;
    }

    console.log('New User ' + newUser.userName + ' is created.')
    return newUser;
};

exports.addUser = addUser;