
// dependencies
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// require routers
var users = require('./routes/users')

// user schema
mongoose.Promise = Promise;
var User = require("./models/User.js");

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// use morgan logging middleware
app.use(morgan('tiny'));

// use static file 'public'
app.use(express.static('public'));

// main page
app.get('/', (req, res) => {
    res.sendFile('public/index.html')
});

app.post('/submit', (req, res, next) => {
    let userInfo = req.body;
    res.status(200).send(userInfo);
    let newUser = new User({
        firstname: userInfo.firstname, 
        lastname: userInfo.lastname, 
        username: userInfo.username, 
        password: userInfo.password, 
        email: userInfo.email
    });
    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
      });
    console.log(newUser);
});

app.get('/findall', (req, res, next)=> {
    User.find(function(err, user) {
        if (err) return console.error(err);
        res.send(user);
        console.log(user);
    });
});

// users route
app.use('/users', users)


// connect to mongo
mongoose.connect('mongodb://localhost/users', { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db");
});


// start server
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});