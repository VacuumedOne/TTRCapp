var express = require('express');
var router = express.Router();

/* ローカルモジュール */
var UserRegister = require('../local_modules/user/UserRegister.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/login/register', function(req, res, next) {
  res.render('index', { title: 'UserRegister' });
});

router.get('/test/json', function(req, res, next) {
  res.json({
    "message": "やったぜ。"
  })
})

/* POST API */
router.post('/test/post/api', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
})

router.post('/user/register/api', function(req, res, next) {
  UserRegister(req.body, res);
})

module.exports = router;
