module.exports = function(body, res, db) {
  var User = require('../../model/User')
  var Hash = require('../../util/Hash');

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
  if(body.user_name == null) {
    err.push('ユーザ名が入力されていません。');
  }
  if(body.password == null) {
    err.push('パスワードが入力されていません。');
  }
  if(body.mail == null) {
    err.push('メールアドレスが入力されていません。');
  }
  if(body.sex == null) {
    err.push('性別が入力されていません。');
  }
  if(body.auth == null) {
    err.push('役職が入力されていません。');
  }
  if(body.k_lastname == null) {
    err.push('姓が入力されていません。');
  }
  if(body.k_firstname == null) {
    err.push('名が入力されていません。');
  }
  if(body.h_lastname == null) {
    err.push('姓(ひらがな)が入力されていません。');
  }
  if(body.h_firstname == null) {
    err.push('名(ひらがな)が入力されていません。');
  }
  if(body.birth_ymd == null) {
    err.push('生年月日が入力されていません。')
  }

  //エラーが発生して入ればエラーをJSONで返して終了。
  if(err.length > 0) {
    res.state(400).json(err);
    return;
  }

  //パスワードのハッシュ化
  body.hashed_pw = Hash.getHashedText(body.password);

  let new_user = new User({
    'user_name': body.user_name,
    'hashed_pw': body.hashed_pw,
    'mail': body.mail,
    'sex': body.sex,
    'auth': body.auth,
    'birth_ymd': body.birth_ymd,
    'k_lastname': body.k_lastname,
    'k_firstname': body.k_firstname,
    'h_lastname': body.h_lastname,
    'h_firstname': body.h_firstname,
  })

  new_user
    .save()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.state(500).json(err)
    })

  //SQL発行
  // var sql = '';
  // sql += 'INSERT INTO User (' +
  //        'user_name' +
  //        ', hashed_pw' +
  //        ', mail' +
  //        ', sex' +
  //        ', auth' +
  //        ', birth_ymd';
  // if(!body.birth_ymd) {
  //   sql += ', birth_ymd';
  // }
  // sql += ', k_lastname' +
  //        ', k_firstname';
  // if(body.h_lastname) {
  //   sql += ', h_lastname';
  // }
  // if(body.h_firstname) {
  //   sql += ', h_firstname';
  // }
  // sql += ') VALUES (' +
  //        ' "' + body.user_name + '"'+ 
  //        ', "' + body.hashed_pw + '"' +
  //        ', "' + body.mail + '"' +
  //        ', "' + body.sex + '"' +
  //        ', ' + body.auth +
  //        ', "' + body.birth_ymd + '"';
  // if(!body.birth_ymd) {
  //   sql += ', "' + body.birth_ymd + '"';
  // }
  // sql += ', "' + body.k_lastname + '"' +
  //        ', "' + body.k_firstname + '"';
  // if(body.h_lastname) {
  //   sql += ', "' + body.h_lastname + '"';
  // }
  // if(body.h_firstname) {
  //   sql += ', "' + body.h_firstname + '"';
  // }
  // sql += ');';
  
  // console.log('Query: ¥n' + sql);

  /* DB格納 */
  // var promise = new Promise(function(resolve, reject) {
  //   connection.query(sql, (error, results, fields) => {
  //     if(error){
  //       reject(error);
  //     }else{
  //       resolve(results);
  //     }
  //   });
  // });

  // promise.then((results) => {
  //   res.json(results);
  // }).catch((error) => {
  //   throw error;
  // });
  return;
}