module.exports = function(body, res, connection) {
  var Promise = require('promise');

  /**
   * POST内容
   * item_id: 記録アイテムのid
   * player_id: 練習をした者のuser_id
   * registerer_id: 記録をおこなったもののuser_id
   * result: 結果
   * reps: 回数
   * attr: json
   */

   //入力のバリデーション
   console.log(body);
   var err = [];
   if(!body.item_id) {
     err.push('種目が入力されていません。');
     return;
   }
   if(!body.player_id) {
    err.push('選手が入力されていません。');
    return;
  }
  if(!body.registerer_id) {
    err.push('記録者が入力されていません。');
    return;
  }
  if(!body.result) {
    err.push('結果が入力されていません。');
  }

  if(err.length > 0){
    res.json({
      state: "failure",
      text: err
    });
    return;
  }

  //SQL発行
  var sql = 'INSERT INTO Record (';
  sql += 'item_id, player_id, registerer_id, result';
  if(body.reps){
    sql += ', reps';
  }
  if(body.attr){
    sql += ', attr';
  }
  sql += ') VALUES (' +
  body.item_id +
  ', ' + body.player_id +
  ', ' + body.registerer_id +
  ', "' + body.result + '"';
  if(body.reps){
    sql += ', ' + body.reps;
  }
  if(body.attr){
    sql += ', ' + body.attr;
  }
  sql += ');';

  console.log(sql);

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