const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const uuid = require("uuid");

const HttpError = require("../models/http-error");
const { UserModel } = require("../persistence/db-schema");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

const createUser = async (req, res, next) => {
  //get params from request bodyfgetUserByUserName
  const { userName, password, ownerName, dogName, city, description } =
    req.body;
console.log("here");
  //TO-DO
  //input validation

  //check if userName already exists
  let userExists = true;

  try {
    userExists = await getUserByUserName(userName);
  } catch (error) {
    return next(error);
  }

  if (userExists) {
    console.log("User: " + userName + " already exists.");
    return next(
      new HttpError(
        "User name already exists, please choose a new user name.",
        400
      )
    );
  }

  //hash the input password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("Error in HASH password");
    return next(new HttpError("Something went wrong, please try again.", 500));
  }

  //generate token
  let newUid = uuid.v4();
  let newToken;
  try {
    newToken = webtoken.sign(
      { uid: newUid, userName: userName },
      "thisSecretIsNotASecret",
      { expiresIn: "12h" }
    );
  } catch (error) {
    console.log("Error in TOKEN generation");
    return next(new HttpError("Something went wrong, please try again.", 500));
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
    pictures: ["test.pic"],
    token: newToken,
  });

  //add user to DB
  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
    return next(DBfailedHttpError);
  }

  console.log("New User: " + newUser.userName + " is created.");

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

const getUserByUserName = async (userName) => {
  let user = false;

  try {
    let result = await UserModel.find({ userName: userName }).exec();
    if (result.length !== 0) {
      user = result[0];
    }
  } catch (error) {
    throw DBfailedHttpError;
  }

  return user;
};

exports.createUser = createUser;
