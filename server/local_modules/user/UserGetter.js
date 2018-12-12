module.exports = function () {
  /* DB接続 */
  var dbConnect = require('../DataBase/DataBaseConnect.js');
  dbConnect();

  dbConnect.close();
}