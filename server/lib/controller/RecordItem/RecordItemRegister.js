module.exports = function(body, res, db) {
  var RecordItem = require('../../model/RecordItem')(db);

  /**
   * POST内容
   * item_name: 記録グループ名。
   * group_id: 記録グループのid。
   */

  //入力のバリデーション
  console.log(body);
  var err = []
  if(body.item_name === null) {
    err.push('アイテム名が入力されていません。');
  }
  if(body.group_id === null) {
    err.push('グループidが入力されていません。');
  }
  if(body.format === null) {
    err.push('フォーマットが入力されていません')
  }
  if(err.length > 0){
    res.status(400).json(err)
    return;
  }

  var data = {
    item_name: body.item_name,
    group_id: body.group_id,
    format: body.format
  }

  if(body.unit !== null){
    data.unit = body.unit
  }

  var new_recorditem = new RecordItem(data)

  new_recorditem
    .save()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      console.log(err)
      res.status(500).end()
    })
  return;
}