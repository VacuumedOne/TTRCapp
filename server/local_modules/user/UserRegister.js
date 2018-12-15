module.exports = function(body, res, connection) {
  var validator = require('../util/validator.js');
  var Promise = require('promise')

  /* 入力のバリデーション */
  //express-validatorを使うと良さげ

  /* DB格納 */
  var promise = new Promise(function(resolve, reject) {
    connection.query('SHOW DATABASES;', (error, results, fields) => {
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    });
  });

  promise.then((results) => {
    res.send(results);
  }).catch((error) => {
    throw error;
  })

  // connection.query('SHOW DATABASES;', function (error, results, fields) {
  //   if(error) throw error;
  //   console.log(results);
  //   result = results;
  // });
}