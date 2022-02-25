const bcrypt = require('bcryptjs');
const webtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const uuid = require('uuid');

const HttpError = require('../models/http-error');
const {UserModel} = require('../persistence/db-schema');

const DBfailedHttpError = new HttpError(
    'Database operation failed, please try again',
    500
);


const userLogin = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return next(new HttpError('Please provide your user name and password.', 400));
    }

    const {email, password} = req.body;
    
    //validate input

    //check if the user exists
    let existingUser;

    try{
        existingUser = await getUserByEmail(email);
    }catch (error){
        return next(error);
    }

    if(!existingUser){
        return next(new HttpError('Wrong user name or password!', 400));
    }

    //hash the input password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    }catch (error){
        console.log('Error in HASH password');
        return next(new HttpError('Something went wrong, please try again.', 500));
    }

    //check the password against the one in DB
    let passwordCorrect = false;
    try {
        passwordCorrect = await bcrypt.compare(password, existingUser.password);
    }catch (error){
        console.log('Error in COMPARE password');
        return next(new HttpError('Something went wrong, please try again.', 500));
    }

    if (!passwordCorrect){
        return next(new HttpError('Wrong user name or password!', 400));
    }

    //generate token
    let newToken;

    try {
        newToken = webtoken.sign(
            {uid: existingUser.uid, email: existingUser.email}, 
            'thisSecretIsNotASecret', {expiresIn: '12h'}
        );
    }catch(error){
        console.log('Error in TOKEN generation');
        return next(new HttpError('Something went wrong, please try again.', 500));
    }

    //update token in DB
    existingUser.token = newToken;
    try{
        await existingUser.save();
    }catch(error){
        return next(error);
    }

    //send response
    const response = existingUser.toObject();
    //remove password and other unneeded elements from response
    response.password = undefined;
    response._id = undefined;
    response.__v = undefined;
    console.log(response.email + '  has logged in');
    res.status(200).json(response);
};


const getUserByEmail = async (email) => {
    
    let user = false;

    try{
        let result = await UserModel.find({ email: email }).exec();
        if(result.length !== 0){
            user = result[0];
        }
    } catch (error) {
        console.log('Error in DB FIND operation');
        console.log(error);
        throw DBfailedHttpError;
    }

    return user;
};

exports.userLogin = userLogin;