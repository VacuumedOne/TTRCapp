module.exports = function(body, res) {
  var validator = require('../util/validator.js');

  /* 入力のバリデーション */
  //express-validatorを使うと良さげ

  /* DB格納 */
  const mongodbClient = require('mongodb').MongoClient;
  const connectUrl = 'mongodb://127.0.0.1:27017';
  
  mongodbClient.connect(connectUrl, (err, db) => {
    if(err) throw err;
    console.log('MongoDBに接続中');
    db.close();
  });

  res.send("Not Implemented.");
}