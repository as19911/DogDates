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

const createUser = async (req, res, next) => {
    
    //get params from request body
    const {userName, password, ownerName, dogName, city, description} = req.body;

    //TO-DO
    //input validation

    //check if userName already exists
    let userExists = true;

    try{
        userExists = await getUserByUserName(userName);
    }catch (error){
        return next(error);
    }

    if(userExists){
        console.log('User: ' + userName + ' already exists.');
        return next (
            new HttpError('User name already exists, please choose a new user name.',
            400
        ));
    }

    //hash the input password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    }catch (error){
        console.log('Error in HASH password');
        return next(new HttpError('Something went wrong, please try again.', 500));
    }

    //generate token
    let newUid = uuid.v4();
    let newToken;
    try {
        newToken = webtoken.sign(
            {uid: newUid, userName: userName}, 
            'thisSecretIsNotASecret', {expiresIn: '12h'}
        );
    }catch(error){
        console.log('Error in TOKEN generation');
        return next(new HttpError('Something went wrong, please try again.', 500));
    }

    //create a user
    const newUser = new UserModel({
        uid: newUid,
        userName,
        password: hashedPassword,
        ownerName,
        dogName,
        city,
        description,
        pictures: ['test.pic'],
        token: newToken
    });

    //add user to DB
    try{
        await newUser.save();
    } catch (error) {
        console.log(error);
        return next(DBfailedHttpError);
    }

    console.log('New User: ' + newUser.userName + ' is created.')

    //TO-DO 
    //Handle image upload


    //send response
    const response = newUser.toObject();
    //remove password and other unneeded elements from response
    response.password = undefined;
    response._id = undefined;
    response.__v = undefined;
    res.status(201).json(response);
};


const userLogin = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return next(new HttpError('Please provid your user name and password.', 400));
    }

    const {userName, password} = req.body;
    
    //validate input

    //check if the user exists
    let existingUser;

    try{
        existingUser = await getUserByUserName(userName);
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
            {uid: existingUser.uid, userName: existingUser.userName}, 
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
    console.log(response.userName + '  has logged in');
    res.status(200).json(response);
};


const getUserByUserName = async (userName) => {
    
    let user = false;

    try{
        let result = await UserModel.find({ userName: userName }).exec();
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

exports.createUser = createUser;
exports.userLogin = userLogin;