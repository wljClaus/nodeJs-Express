var express = require('express');
var router = express.Router();

// 新增
var passport = require('passport'); // 认证oauth2相关的东西
var GitHubStrategy = require('passport-github').Strategy; // 在passport基础上对整个passport协议进行封装，内部有具体的URL具体的跳转。
// var JirenguStrategy = require('passport-jirengu').Strategy;


// 1。以下代码的意思是把用户登录过来的信息，传递到passport之后生成一个session存储到自己的内存当中
passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});
// 2。相当于用户刷新页面时，会再把内存中把对应的session解析，匹配用户
passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
      clientID: 'b7bfd7fcc56fdb76ad7f',
      clientSecret: 'acbbfd5555ded60add3c1069a75d5fd32301b621',
      callbackURL: "http://post.hunger-valley.com/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // });
      done(null, profile);
    }
));

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})


router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      req.session.user = {
        id: req.user._json.uid,
        username: req.user._json.name,
        avatar: req.user._json.avatar,
        provider: req.user.provider
      };
      res.redirect('/');
    });


// router.get('/jirengu',function (req,res,next) {
//   res.render('index',{title:'Express'})
// })

module.exports = router