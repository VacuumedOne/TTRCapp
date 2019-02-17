module.exports = function(body, res, db) {
  var User = require('../../model/User')(db);
  var Hash = require('../../util/Hash');
  var Salt = require('../../util/Salt');

  /**
   * POST内容
   * password: 素のパスワード。ハッシュ化前。
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
    res.status(400).json(err);
    return;
  }

  //ソルトの発行
  let salt = Salt.getSalt(30);

  //パスワードのハッシュ化
  body.hashed_pw = Hash.getHashedText(body.password + salt);

  let new_user = new User({
    'hashed_pw': body.hashed_pw,
    'salt': salt,
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
      console.log(err)
      res.status(500).end()
    })
  
  return;
}