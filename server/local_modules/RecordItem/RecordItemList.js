module.exports = function(res, connection) {
  var Promise = require('promise');

  /**
   * POST内容
   * 現状なし。追加実装。
   */

   //SQL発行
   var sql = 'SELECT * FROM RecordItem;';

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