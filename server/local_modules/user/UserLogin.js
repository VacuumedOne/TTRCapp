module.exports = function(body, res, connection) {
  var Promise = require('promise')

  /**
   * POST内容
   * user_name: ログイン用ユーザ名。
   * hashed_pw: ハッシュ化されたパスワード。
   */

   //入力のバリデーション
  console.log(body);

  var sql = '';
  sql += 'SELECT user_id, user_name, k_lastname, k_firstname FROM User ' +
         'WHERE user_name="' + body.user_name + '" ' +
         'AND hashed_pw="' + body.hashed_pw + '" ';

  var promise = new Promise(function(resolve, reject) {
    connection.query(sql, (error, results, fields) => {
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    });
  });

  promise.then((results) => {
    res.json(results);
  }).catch((error) => {
    throw error;
  });
}