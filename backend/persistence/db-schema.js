//this file defines the schema for MongoDB collections

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid:{ type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true, minlength: 6 }, //should be the hash value of the password
    ownerName: { type: String, required: true },
    dogName: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String },
    pictures: [String],
    token: { type: String }
});

const likedListSchema = new Schema({
    uid: { type: String, required: true },
    liked: [String] //array of uid
});

const matchedListSchema = new Schema({
    uid: { type: String, required: true },
    liked: [String] //array of uid
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', userSchema);
const LikedListModel = mongoose.model('LikedList', likedListSchema);
const MatchedListModel = mongoose.model('MatchedList', matchedListSchema);

module.exports = { 
    UserModel: UserModel,
    LikedListModel: LikedListModel,
    MatchedListModel: MatchedListModel
};