module.exports = async function(body, res, db) {
  var User = require('../../model/User')(db);
  var Hash = require('../../util/Hash');
  var Salt = require('../../util/Salt');

  /**
   * POST内容
   * id: userのid。required
   * password: 素のパスワード。ハッシュ化前。optional
   * mail: メールアドレス。optional
   * auth: 権限。optional
   * birth_ymd: 誕生日。optional
   * k_lastname: 漢字の姓。optional
   * k_firstname: 漢字の名。optional
   * h_lastname: ひらがなの姓。optional
   * h_firstname: ひらがなの名。optional
   */
  
  /* 入力のバリデーション */
  var err = [];
  var result = [];
  if(body.id === null) {
    res.status(400).json('ユーザが指定されていません')
    return
  }
  
  //更新するユーザの取得
  var target_user = await User.findOne({where: {
    id: body.id
  }})
  if(target_user == null) {
    res.status(400).json('更新対象のユーザが見つかりませんでした')
    return
  }

  if(body.password != null) {
    //パスワードの再設定
    var salt = target_user.salt
    var new_plane_password = body.password
    var mixed = new_plane_password + salt
    var new_hashed_password = Hash.getHashedText(mixed)
    target_user.update({hashed_pw: new_hashed_password})
    result.push('パスワードの変更に成功しました')
  }

  if(body.mail != null) {
    //メールアドレスの再設定
    var new_mail = body.mail
    target_user.update({mail: new_mail})
    result.push('メールアドレスの変更に成功しました')
  }

  if(body.auth != null) {
    //役職の再設定
    var new_auth = body.auth
    target_user.update({auth: new_auth})
    result.push('役職の変更に成功しました')
  }

  if(body.k_lastname != null &&
      body.k_firstname != null &&
      body.h_lastname != null &&
      body.h_firstname != null) {
    //名前の再設定
    var new_k_lastname = body.k_lastname
    var new_k_firstname = body.k_firstname
    var new_h_lastname = body.h_lastname
    var new_h_firstname = body.h_firstname
    target_user.update({
      k_lastname: new_k_lastname,
      k_firstname: new_k_firstname,
      h_lastname: new_h_lastname,
      h_firstname: new_h_firstname
    })
    result.push('名前の変更に成功しました')
  }

  if(body.birth_ymd != null) {
    //役職の再設定
    var new_birth_ymd = body.birth_ymd
    target_user.update({birth_ymd: new_birth_ymd})
    result.push('誕生日の変更に成功しました')
  }

  res.status(200).json(result)

  return;
}