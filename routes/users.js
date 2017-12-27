var express = require('express')
var router = express.Router()
// user schema
var User = require("../models/User.js");

// define the home page route
router.get('/', function (req, res) {
  res.send('users page')
});

// define the about route
router.get('/about', function (req, res) {
  res.send('about users')
});

router.get('/findall', (req, res, next)=> {
  User.find(function(err, user) {
      if (err) return console.error(err);
      res.send(user);
      console.log(user);
  });
});


module.exports = router