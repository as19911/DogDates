const HttpError = require('../models/http-error');
const fakeMatchList = require('../testingDatabase/fake-match.json');

const getListByUser = (req, res, next) => {
    const uid = req.params.uid;

    //check if the uid valid
    const matchedList = fakeMatchList.find(list =>{
        return list.id === uid;
    });

    //return error if uid is not valid
    if(!matchedList){
        return next(new HttpError('User does not exist!', 404));
    }

    res.status(201).json({matchedList});
}


const updateListByUser = (req, res, next) => {
    const uid = req.params.uid;

    //check if the uid valid
    const matchedList = fakeMatchList.find(list =>{
        return list.id === uid;
    });

    //return error if uid is not valid
    if(!matchedList){
        return next(new HttpError('User does not exist!', 404));
    }

    //TO-DO update user's matched list


    res.status(201).json({msg: 'User list updated', matchedList});
}


exports.getListByUser = getListByUser;
exports.updateListByUser = updateListByUser;