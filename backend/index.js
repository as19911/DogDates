const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const likeRoutes = require('./routes/like-routes');
const matchRoutes = require('./routes/match-routes');
const authRoutes = require('./routes/auth-routes');


const DB_URL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.hxpf1.mongodb.net/dogDatesDB?retryWrites=true&w=majority';
const app = express();
const upload = multer({ dest: 'upload/'});

//parse reqest body into JSON object
app.use(bodyParser.json());

//parse multipart/form-data
app.use(upload.array()); 

//handle user authentication
app.use('/api/auth',authRoutes);

////TO DO
//Add bearer authentication token

//handle requestslike
app.use('/api/users', usersRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/match', matchRoutes);

//handle errors
//unsupported route 
app.use((req, res, next)=> {
    const error = new HttpError('This route is undefined!', 400);
    next(error);
});

//other errors
app.use((err, req, res, next) => {
    if (res.headerSent) {
      return next(err);
    }
    res.status(err.code || 500)
    res.json({error: err.message || 'Something went wrong!'});
  });


//start server only if DB connect successfully
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Server is running...');
    app.listen(5000);    
  })
  .catch( error => {
    console.log('Failed to connect to MongoDB');
    console.log(error);
  });



