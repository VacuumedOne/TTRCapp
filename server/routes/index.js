var express = require('express');
var router = express.Router();

/* ローカルモジュール */
var UserRegister = require('../local_modules/User/UserRegister.js');
var UserLogin = require('../local_modules/User/UserLogin.js');
var UserList = require('../local_modules/User/UserList.js');
var RecordGroupRegister = require('../local_modules/RecordGroup/RecordGroupRegister.js');
var RecordGroupList = require('../local_modules/RecordGroup/RecordGroupList.js');
var RecordRegister = require('../local_modules/Record/RecordRegister.js');


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
  UserList(res, connection);
});
//記録グループの登録
router.post('/record-group/register/api', function(req, res, next) {
  RecordGroupRegister(req.body, res, connection);
});
//記録グループの全取得
router.post('/record-group/list/api', function(req, res, next) {
  RecordGroupList(req.body, res, connection);
})
//記録アイテムの登録
router.post('/record-item/register/api', function(req, res, next) {
  RecordItemRegister(req.body, res, connection);
})
//記録アイテムの登録
router.post('/record-item/list/api', function(req, res, next) {
  RecordItemList(req.body, res, connection);
})
//記録の登録
router.post('/record/register/api', function(req, res, next) {
  RecordRegister(req.body, res, connection);
})

module.exports = router;
