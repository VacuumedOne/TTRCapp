module.exports = function(body, res, connection) {
  var Promise = require('promise')

  /**
   * POST内容
   * user_name: ログイン用ユーザ名。
   * hashed_pw: ハッシュ化されたパスワード。
   */

   //入力のバリデーション
  console.log(body);
  var err = [];
  if(body.user_name == null) {
    err.push('ユーザ名が入力されていません。');
  }
  if(body.hashed_pw == null) {
    err.push('パスワードが入力されていません。');
  }

  //入力エラーが存在していればエラーを返して操作終了
  if(err.length > 0) {
    res.json(err);
    return;
  }

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