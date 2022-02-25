//this file defines the schema for MongoDB collections

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, //should be the hash value of the password
    ownerName: { type: String, required: true },
    dogName: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String },
    pictures: [String],
    token: { type: String }
});

const likedListSchema = new Schema({
    email: { type: String, required: true },
    liked: [String] //array of uid
});

const matchedListSchema = new Schema({
    email: { type: String, required: true },
    liked: [String] //array of uid
});

const UserModel = mongoose.model('User', userSchema);
const LikedListModel = mongoose.model('LikedList', likedListSchema);
const MatchedListModel = mongoose.model('MatchedList', matchedListSchema);

module.exports = { 
    UserModel: UserModel,
    LikedListModel: LikedListModel,
    MatchedListModel: MatchedListModel
};