const HttpError = require("../models/http-error");
const fs = require("fs");
const { UserModel } = require("../persistence/db-schema");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

/** TODO: Add validations to all the fields */

const getUserList = async (req, res, next) => {
  const users = await UserModel.find().exec();
  res.status(201).json(users);
};

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;

  let user = false;
  try {
    let result = await UserModel.find({ uid: uid }).exec();
    if (result.length !== 0) {
      user = result[0];
    }
  } catch (error) {
    throw DBfailedHttpError;
  }
  //return error if uid is not valid
  if (!user) {
    return next(new HttpError("User does not exist!", 404));
  }

  res.status(201).json(user);
};

const updateUserById = async (req, res, next) => {
  const uid = req.params.uid;

  //get params from request body
  const { userName, dogName, city } = req.body;
  let user = null;

  //update user info
  const result = await UserModel.find({ uid: uid }).exec();
  if (result.length !== 0) user = result[0];

  //return error if uid is not valid
  if (!user) return next(new HttpError("User does not exist!", 404));
  //user exists, replace the fields in the database
  //TODO: allow to change part of the fields fields
  else {
    UserModel.findByIdAndUpdate(
      user._id,
      { userName: userName, city: city, dogName: dogName },
      function (error) {
        if (error) return next(DBfailedHttpError);
      }
    );

    //send response
    res.status(201).json({ msg: "user updated.", user });
  }
};

const deleteUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user = null;

  const result = await UserModel.find({ uid: uid }).exec();
  if (result.length !== 0) user = result[0];

  //return error if uid is not valid
  if (!user) {
    return next(new HttpError("User does not exist!", 404));
  }

  //remove user from fakeDB
  UserModel.findOneAndDelete({ _id: user._id }, function (error) {
    if (error) return next(DBfailedHttpError);
  });

  //send response
  res.status(201).json({ msg: "user deleted.", user });
};

exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.getUserList = getUserList;
