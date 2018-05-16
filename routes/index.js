var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.session)
  var LoginData;
  if (req.session.user) {
    LoginData = {
      isLogin : true,
      user:{
        avatar:req.session.user.avatar,
        username:req.session.user.name
      }
    }
  } else {
    LoginData = {
      isLogin:false
    }
  }
  res.render('index', LoginData);
});

module.exports = router;
