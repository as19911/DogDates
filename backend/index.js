const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const likeRoutes = require('./routes/like-routes');
const matchRoutes = require('./routes/match-routes');

const app = express();

//parse reqest body into JSON object
app.use(bodyParser.json());

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


//start server
console.log('Server is running...');
app.listen(5000);

