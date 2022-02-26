//This is the entry point of the backend

require('dotenv').config();

const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const likeRoutes = require('./routes/like-routes');
const matchRoutes = require('./routes/match-routes');
const authRoutes = require('./routes/auth-routes');
const signupRoutes = require('./routes/signup-routes');
const authenticator = require('./middleware/authenticator');

const DB_URL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@cluster0.hxpf1.mongodb.net/dogDatesDB?retryWrites=true&w=majority';
const app = express();
const upload = multer({ dest: 'upload/'});

//attach headers to responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Origin, X-Requested-With, Content-Type'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

//parse reqest body into JSON object
app.use(bodyParser.json());

//parse multipart/form-data
//app.use(upload.array()); 
app.use('/upload/pictures', express.static(path.join('upload', 'pictures')));

//handle user signup and authentication
app.use('/api/signup', signupRoutes);
app.use('/api/auth',authRoutes);

//validate user's token before proceding to the protected API routes
app.use(authenticator);


/////////////////////////////////////////
// The following routes are protected  //
/////////////////////////////////////////

//handle requestslike
app.use('/api/users', usersRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/match', matchRoutes);

//handle pictures request
app.use('/upload/pictures', express.static(path.join('upload', 'pictures')));

//handle errors
//unsupported route error
app.use((req, res, next)=> {
    const error = new HttpError('This route is undefined!', 400);
    next(error);
});

//other errors
app.use((err, req, res, next) => {
  if(req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
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



