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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  //get params from request bodygetUserByEmail
  const { email, password, ownerName, dogName, city, description } = req.body;

  //check if email already exists
  let userExists = true;

  try {
    userExists = await getUserByEmail(email);
  } catch (error) {
    return next(error);
  }

  if (userExists) {
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
    return next(new HttpError("Something went wrong, please try again.", 500));
  }

  //generate token
  let newUid = uuid.v4();
  let newToken;
  try {
    newToken = webtoken.sign(
      { uid: newUid, email: email },
      "thisSecretIsNotASecret",
      { expiresIn: "12h" }
    );
  } catch (error) {
    console.log("Error in TOKEN generation");
    return next(new HttpError("Something went wrong, please try again.", 500));
  }

  //create a user
  let picturePath = "default";
  if(req.file){
    console.log(req.file);
    picturePath = req.file.path;
  }
  const newUser = new UserModel({
    uid: newUid,
    email,
    password: hashedPassword,
    ownerName,
    dogName,
    city,
    description,
    pictures: picturePath,
    token: newToken,
  });

  //add user to DB
  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
    return next(DBfailedHttpError);
  }

  console.log("New User: " + newUser.email + " is created.");


  //send response
  const response = newUser.toObject();
  //remove password and other unneeded elements from response
  response.password = undefined;
  response._id = undefined;
  response.__v = undefined;
  res.status(201).json(response);
};

const getUserByEmail = async (email) => {
  let user = false;

  try {
    let result = await UserModel.find({ email: email }).exec();
    if (result.length !== 0) {
      user = result[0];
    }
  } catch (error) {
    throw DBfailedHttpError;
  }

  return user;
};

exports.createUser = createUser;
