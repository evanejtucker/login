
// dependencies
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// require routers
var users = require('./routes/users')

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