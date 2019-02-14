
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
    (email, password, done) => {
      User.findOne({
        attributes: [
          'id'
        ],
        where: {
          'mail': email,
          'hashed_pw': Hash.getHashedText(password)
        }
      }).then(user => {
        if(user === null){
          return done(null, false, {'message': 'Incorrect User'})
        }else{
          return done(null, user)
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
    console.log(user.id)
    done(null, user.id);
  })

  /**
   * /is-authenticated/apiで受けてログインチェックを行うところ。
   * セッション情報からユーザ情報を復元して返す。
   */
  passport.deserializeUser((id, done) => {
    User.findOne({
      attributes: [
        'id',
        'user_name',
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