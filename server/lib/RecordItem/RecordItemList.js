module.exports = function(body, res, connection) {
  var Promise = require('promise');

  /**
   * POST内容
   * group_id 指定するグループID
   */
    console.log(body);
    if(!body.group_id){
      res.json({
        state: "failure",
        text: "グループIDが指定されていません。"
      });
    }

    //SQL発行
    var sql = 'SELECT * FROM RecordItem where group_id =' + body.group_id + ';';

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
    res.json({
      state: "success",
      text: results
    });
  }).catch((error) => {
    throw error;
  });
  return;
}