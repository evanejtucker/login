
// dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

// require routers
var users = require('./routes/users')

// user schema
var User = require("./models/User.js");

// users router
app.use('/users', users)

    // middleware
    app.use(express.cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    app.use(morgan('tiny'));
    app.use(express.static('public'));
    app.use(session({ secret: "cats" }));
    app.use(passport.initialize());
    app.use(passport.session());


// connect to mongo
mongoose.connect('mongodb://localhost/users', { useMongoClient: true });
// mongoose.Promise = global.Promise;
// mongoose.Promise = Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db");
});


// main page
app.get('/', (req, res) => {
    res.sendFile('public/index.html')
});

// start server
app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});