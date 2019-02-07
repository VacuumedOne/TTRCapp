module.exports = function(res, db) {
  var User = require('../../model/User')

  /**
   * POST内容
   * 現状なし(追加するかも)
   */

   //DB格納
  User.findAll({
    attributes: [
      'id',
      'user_name',
      'mail',
      'sex',
      'auth',
      'birth_ymd',
      'k_lastname',
      'k_firstname',
      'h_lastname',
      'h_firstname',
      'is_active'
    ]
  }).then(result => {
    res.status(200).json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
  return;
}