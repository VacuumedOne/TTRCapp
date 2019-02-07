module.exports = function(body, res, db) {
  var User = require('../../model/User')(db);

  /**
   * POST内容
   * email: ログイン用メールアドレス。
   * hashed_pw: ハッシュ化されたパスワード。
   */

   //入力のバリデーション
  console.log(body);
  var err = [];
  if(body.email == null) {
    err.push('メールアドレスが入力されていません。');
  }
  if(body.password == null) {
    err.push('パスワードが入力されていません。');
  }

  //入力エラーが存在していればエラーを返して操作終了
  if(err.length > 0) {
    res.json(err);
    return;
  }

  //パスワードのハッシュ化
  body.hashed_pw = Hash.getHashedText(body.password);

  User.findOne({
    where: {
      email: body.email,
      hashed_pw: body.hashed_pw
    }
  }).then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).end()
  })
}