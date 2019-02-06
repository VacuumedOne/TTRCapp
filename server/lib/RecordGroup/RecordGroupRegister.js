module.exports = function(body, res, connection) {
  var Promise = require('promise');

  /**
   * POST内容
   * group_name: 記録グループ名。
   */

   //入力のバリデーション
   console.log(body);
   if(body.group_name == null) {
     res.json(['グループ名が入力されていません。']);
     return;
   }

   //SQL発行
   var sql = 'INSERT INTO RecordGroup (group_name) VALUES ("' + body.group_name + '");';

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