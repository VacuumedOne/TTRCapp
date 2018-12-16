var express = require('express');
var router = express.Router();

/* ローカルモジュール */
var UserRegister = require('../local_modules/User/UserRegister.js');
var UserLogin = require('../local_modules/User/UserLogin.js');
var UserList = require('../local_modules/User/UserList.js');
var RecordGroupRegister = require('../local_modules/RecordGroup/RecordGroupRegister.js');
var RecordGroupList = require('../local_modules/RecordGroup/RecordGroupList.js');


//DB接続
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'ttrc_app',
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
//そのまま返すテストAPI
router.post('/test/post/api', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
});
//ユーザ追加
router.post('/user/register/api', function(req, res, next) {
  UserRegister(req.body, res, connection);
});
//ユーザ認証
router.post('/user/login/api', function(req, res, next) {
  UserLogin(req.body, res, connection);
});
//ユーザ全取得
router.post('/user/list/api', function(req, res, next) {
  UserList(req.body, res, connection);
});

//記録グループの登録
router.post('/recordgroup/register/api', function(req, res, next) {
  RecordGroupRegister(req.body, res, connection);
});
//記録グループの全取得
router.post('/recordgroup/list/api', function(req, res, next) {
  RecordGroupList(req.body, res, connection);
})


//記録アイテムの登録

module.exports = router;
