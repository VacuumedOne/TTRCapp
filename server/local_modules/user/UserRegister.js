module.exports = function(body, res, connection) {
  var Promise = require('promise');

  /**
   * POST内容
   * user_name: ログイン用のアルファベット名
   * hashed_pw: 素のパスワード。ハッシュ化前。
   * mail: メールアドレス。
   * sex: 性別。"male" or "female"
   * auth: 権限。
   * birth_ymd: 誕生日。
   * k_lastname: 漢字の姓。
   * k_firstname: 漢字の名。
   * h_lastname: ひらがなの姓。
   * h_firstname: ひらがなの名。
   */
  
  /* 入力のバリデーション */
  console.log(body);
  var err = [];
  if(!body.user_name) {
    err.push('ユーザ名が入力されていません。');
  }
  if(!body.hashed_pw) {
    err.push('パスワードが入力されていません。');
  }
  if(!body.mail) {
    err.push('メールアドレスが入力されていません。');
  }
  if(!body.sex) {
    err.push('性別が入力されていません。');
  }
  if(!body.auth) {
    err.push('役職が入力されていません。');
  }
  if(!body.k_lastname) {
    err.push('姓が入力されていません。');
  }
  if(!body.k_firstname) {
    err.push('名が入力されていません。');
  }

  //エラーが発生して入ればエラーをJSONで返して終了。
  if(err.length > 0) {
    res.json(err);
    return;
  }

  //SQL発行
  var sql = '';
  sql += 'INSERT INTO User (' +
         'user_name' +
         ', hashed_pw' +
         ', mail' +
         ', sex' +
         ', auth';
  if(!body.birth_ymd) {
    sql += ', birth_ymd';
  }
  sql += ', k_lastname' +
         ', k_firstname';
  if(body.h_lastname) {
    sql += ', h_lastname';
  }
  if(body.h_firstname) {
    sql += ', h_firstname';
  }
  sql += ') VALUES (' +
         ' "' + body.user_name + '"'+ 
         ', "' + body.hashed_pw + '"' +
         ', "' + body.mail + '"' +
         ', "' + body.sex + '"' +
         ', ' + body.auth;
  if(!body.birth_ymd) {
    sql += ', "' + body.birth_ymd + '"';
  }
  sql += ', "' + body.k_lastname + '"' +
         ', "' + body.k_firstname + '"';
  if(body.h_lastname) {
    sql += ', "' + body.h_lastname + '"';
  }
  if(body.h_firstname) {
    sql += ', "' + body.h_firstname + '"';
  }
  sql += ');';
  
  console.log('Query: ' + sql);

  /* DB格納 */
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
  return;
}