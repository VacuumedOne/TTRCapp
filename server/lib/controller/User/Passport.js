
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
      usernameField: 'mail',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({
        attributes: [
          'id',
          'salt',
          'hashed_pw'
        ],
        where: {
          'mail': email  //メールアドレスで検索
        }
      }).then(user => {
        if(user === null){
          return done(null, false, {'message': 'Login Failure'})
        }else{
          let salt = user.salt
          let hashed_pw = Hash.getHashedText(password + salt)
          if(hashed_pw === user.hashed_pw) {
            return done(null, user)
          } else {
            return done(null, false, {'message': 'Login Failure'})
          }
        }
      }).catch(err => {
        return done(null, err)
      })
    }
  ));

  /**
   * 上記のpasport.useにおける成功のコールバック
   * ログインしたユーザの情報を受けて、そのidをセッションに保存する
   */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  /**
   * /is-authenticated/apiで受けてログインチェックを行うところ。
   * セッション情報からユーザ情報を復元して返す。
   */
  passport.deserializeUser((id, done) => {
    console.log('id: ' + id)
    User.findOne({
      attributes: [
        'id',
        'mail',
        'sex',
        'k_lastname',
        'k_firstname',
        'h_lastname',
        'h_firstname',
        'auth',
        'birth_ymd'
      ],
      where: {
        id: id
      }
    }).then(user => {
      done(null, user)
    }).catch(err => {
      done(null, false, {'message': 'Server error. Something wrong.'})
    })
  })
}