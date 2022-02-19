const HttpError = require('../models/http-error');
const fakeLikedList = require('../testingDatabase/fake-liked.json');

const getListByUser = (req, res, next) => {
    const uid = req.params.uid;

    //check if the uid valid
    const likedList = fakeLikedList.find(list =>{
        return list.id = uid;
    });

    //return error if uid is not valid
    if(!likedList){
        return next(new HttpError('User does not exist!', 404));
    }

    res.status(201).json(likedList);
}


const updateListByUser = (req, res, next) => {
    const uid = req.params.uid;

    //check if the uid valid
    const likedList = fakeLikedList.find(list =>{
        return list.id = uid;
    });

    //return error if uid is not valid
    if(!likedList){
        return next(new HttpError('User does not exist!', 404));
    }

    //TO-DO update user's liked list


    res.status(201).json({msg:'User list updated', likedList});
}


exports.getListByUser = getListByUser;
exports.updateListByUser = updateListByUser;