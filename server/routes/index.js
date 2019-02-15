var express = require('express');
var router = express.Router();

/* ローカルモジュール */
var UserRegister = require('../lib/controller/User/UserRegister');
var UserLogin = require('../lib/controller/User/UserLogin');
var UserList = require('../lib/controller/User/UserList');
var RecordGroupRegister = require('../lib/controller/RecordGroup/RecordGroupRegister');
var RecordGroupList = require('../lib/controller/RecordGroup/RecordGroupList');
var RecordGroupSearch = require('../lib/controller/RecordGroup/RecordGroupSearch');
var RecordItemRegister = require('../lib/controller/RecordItem/RecordItemRegister');
var RecordItemList = require('../lib/controller/RecordItem/RecordItemList');
var RecordRegister = require('../lib/controller/Record/RecordRegister');
var RecordSearch = require('../lib/controller/Record/RecordSearch')

/* ローカルDB関連モジュール */



//DB接続
var Sequelize = require('sequelize').Sequelize;
var db = new Sequelize(
  'tsubakuro',
  'root',
  'password',
  {host: 'localhost',
   dialect: 'mysql',
   port: 3306});
//接続チェック
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//model定義
var User = require('../lib/model/User')(db)
var RecordGroup = require('../lib/model/RecordGroup')(db)
var RecordItem = require('../lib/model/RecordItem')(db)
var Record = require('../lib/model/Record')(db)
db.sync(function(errs){
  console.log('Model definition has been updated.', errs);
})

//passport.jsの設定関連
var passport = require('passport');
require('../lib/controller/User/Passport')(db)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/connect', function(req, res, next) {
  res.json({
    "message": "success"
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
  UserRegister(req.body, res, db);
});
//ユーザ認証からのセッション獲得
router.post('/login/api',
  passport.authenticate('local', {sesssion: true}),
  function(req, res, next) {
    res.status(200).send('Login Successful.')
});
//認証チェック
router.get('/is-authenticated/api', function(req, res, next) {
  if (req.isAuthenticated()) {  //認証チェック
    console.log('hogehoge')
    res.status(200).json({
      user: req.user
    });
  } else {  // 認証されていない
    console.log('fugafuga')
    res.sendStatus(401);
  }
})
//ログアウト
router.get('/logout/api', function(req, res, next) {
  req.logout();
  res.status(200).send('Logout Successful.');
})
//ユーザ全取得
router.post('/user/list/api', function(req, res, next) {
  UserList(res, db);
});
//記録グループの登録
router.post('/record-group/register/api', function(req, res, next) {
  RecordGroupRegister(req.body, res, db);
});
//記録グループの全取得
router.post('/record-group/list/api', function(req, res, next) {
  RecordGroupList(res, db);
})
//記録グループの名前検索
router.post('/record-group/search/api', function(req, res, next) {
  RecordGroupSearch(req.body, res, db);
})
//記録アイテムの登録
router.post('/record-item/register/api', function(req, res, next) {
  RecordItemRegister(req.body, res, db);
})
//記録アイテムの登録
router.post('/record-item/list/api', function(req, res, next) {
  RecordItemList(req.body, res, db);
})
//記録の登録
router.post('/record/register/api', function(req, res, next) {
  RecordRegister(req.body, res, db);
})
//記録の取得
router.post('/record/search/api', function(req, res, next) {
  RecordSearch(req.body, res, db);
})

module.exports = router;
