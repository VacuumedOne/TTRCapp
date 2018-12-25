module.exports = function(res, connection) {
  var Promise = require('promise');

  /**
   * GETで受け取るので引数はなし
   */

   //SQL発行
   var sql = 'SELECT * FROM RecordGroup;';

   //DB格納
   var promise = new Promise(function(resolve, reject) {
    connection.query(sql, (error, results, fields) => {
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    });
  });

  promise.then((results) => {
    res.json(results);
  }).catch((error) => {
    throw error;
  });
  return;
}