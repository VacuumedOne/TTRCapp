module.exports = function(body, res) {
  var validator = require('../util/validator.js');

  /* 入力のバリデーション */
  //express-validatorを使うと良さげ

  /* DB格納 */
  var dbConnect = require('../DataBase/DataBaseConnect.js');
  dbConnect();  //DB接続

  dbConnect.close();

  return "Not Implemented.";
}