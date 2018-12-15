var express = require('express');
var router = express.Router();

/* ローカルモジュール */
var UserRegister = require('../local_modules/user/UserRegister.js');

//DB接続
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  insecureAuth: true
});
connection.connect();


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
});

/* API */
//そのまま返す
router.post('/test/post/api', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
});
//ユーザを追加するAPI
router.post('/user/register/api', function(req, res, next) {
  result = UserRegister(req.body, res, connection);
});

module.exports = router;
