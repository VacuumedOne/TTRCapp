module.exports = function(body, res, db) {
  var Record = require('../../model/Record')(db)
  /**
   * POST内容
   * item_id: 記録アイテムのid
   * player_id: 練習をした者のuser_id
   * registerer_id: 記録をおこなったもののuser_id
   * result: 結果
   * extends: 拡張情報
   */

  //入力のバリデーション
  console.log(body);
  var err = [];
  var data = {};
  if(body.item_id == null) {
    err.push('種目が入力されていません。');
  } else {
    data.item_id = body.item_id
  }
  if(body.player_id == null) {
    err.push('選手が入力されていません。');
  } else {
    data.player_id = body.player_id
  }
  if(body.registerer_id == null) {
    err.push('記録者が入力されていません。');
  } else {
    data.registerer_id = body.registerer_id
  }
  if(body.result == null) {
    err.push('結果が入力されていません。');
  } else {
    data.result = body.result
  }
  if(body.date == null) {
    err.push('日付が入力されていません。');
  } else {
    data.date = body.date
  }
  if(err.length > 0){
    res.json({
      state: "failure",
      text: err
    });
    return;
  }

  if(body.extends !== null){
    data.extends = body.extends
  }

  var new_record = new Record(data)

  new_record
    .save()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      console.log(err)
      res.status(500).end()
    })
  return;
}