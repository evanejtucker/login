var express = require('express')
var router = express.Router()


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

router.post('/submit', (req, res, next) => {
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


module.exports = router