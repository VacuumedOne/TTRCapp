module.exports = {
  getHashedText: function(text) {
      //ハッシュ化パスワード発行
      var crypto = require('crypto');
      var hash = crypto.createHash('whirlpool');
      hash.update(text);
      return hash.digest('hex');
  }
}