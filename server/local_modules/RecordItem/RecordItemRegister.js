module.exports = function(body, res, connection) {
  var Promise = require('promise');

  /**
   * POST内容
   * item_name: 記録グループ名。
   */

   //入力のバリデーション
   console.log(body);
   if(!body.item_name) {
     res.json(['グループ名が入力されていません。']);
     return;
   }

   //SQL発行
   var sql = 'INSERT INTO RecordItem (item_name) VALUES ("' + body.item_name + '");';

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
    res.json(result);
  }).catch((error) => {
    throw error;
  });
  return;
}