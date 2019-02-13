
module.exports = function (db) {

  var passport = require('passport');
  var localStrategy = require('passport-local').Strategy;
  var User = require('../../model/User')(db);
  var Hash = require('../../util/Hash');

  /**
   * /login/apiで受けて認証を行うところ。
   * postでemailとpasswordを受け取る
   */
  passport.use(new localStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, callback) => {
      User.findOne({
        attributes: [
          'id'
        ],
        where: {
          'mail': email,
          'hashed_pw': Hash.getHashedText(password)
        }
      }).then(result => {
        if(result === null){
          return callback(result, false, {'message': 'Incorrect User'})
        }else{
          console.log(result.user)
          return callback(result)
        }
      }).catch(err => {
        return callback(err)
      })
    }
  ));

  /**
   * 上記のpasport.useにおける成功のコールバック
   * ログインしたユーザの情報を受けて、そのidをセッションに保存する
   */
  passport.serializeUser((user, done) => {
    console.log('hogehoge')
    done(null, user.id);
  })

  /**
   * /is-authenticated/apiで受けてログインチェックを行うところ。
   * セッション情報からユーザ情報を復元して返す。
   */
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(user)
      }).catch(err => {
        done(null, false, {'message': 'Server error. Something wrong.'})
      })
  })
}