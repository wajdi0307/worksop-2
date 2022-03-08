var express = require('express');
const user = require('../model/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('auth.twig');
});

router.post('/login', function (req, res, next) {
  var login = req.body.Login;
  var password = req.body.password;
  user.find(function (err, data) {
    if (err) throw err;
    console.log(data);
  data.forEach(element => {
    if (element.Login == login && element.Password == password) {
      res.redirect('/');
    } else {
      res.redirect('/user')
    }
  });
  });
});
/* GET users listing. */
router.post('/add', function (req, res, next) {
  var newuser = new user({
    Login: "wajdi",
    Password: "12345"
  });
  newuser.save();
  res.send('respond with a resource');
});
module.exports = router;
