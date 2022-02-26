//This middleware valid the token from request header: [authorization] 

const webtoken = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    
    try {
        //get token from request header
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Not token is provided.');
        }

        //validate the token
        const decodedToken = webtoken.verify(token, 'thisSecretIsNotASecret');

        //append decoded data to request and pass it to the next handler
        req.userData = {uid: decodedToken.uid, email: decodedToken.email};
        next();

    }catch(err){
        const error = new HttpError('Authentication failed: Token is not valid or expired.',401);
        return next(error);
    }
};