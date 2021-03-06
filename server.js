
// dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;


const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// require routers
var users = require('./routes/users')

// user schema
var User = require("./models/User.js");


    // middleware
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
    app.use(morgan('tiny'));
    app.use(express.static('public'));
    // app.use(session({ secret: "cats" }));
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    // users router
    app.use('/users', users)


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

// passport stuff
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  app.post('/login', passport.authenticate('local', { 
        successRedirect: '/users',
        failureRedirect: '/',
        failureFlash: true
    })
);

app.post('/submit', (req, res, next) => {
    let userInfo = req.body;
    res.status(200).send(userInfo);
    let newUser = new User({
        username: userInfo.username, 
        password: userInfo.password, 
    });
    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
      });
    console.log(newUser);
  });

// start server
app.listen(port, () => {
    console.log('Example app listening on port ' + port)
});