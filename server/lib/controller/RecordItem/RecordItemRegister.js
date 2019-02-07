module.exports = function(body, res, db) {
  var RecordItem = require('../../model/RecordItem')(db);

  /**
   * POST内容
   * item_name: 記録グループ名。
   */

  //入力のバリデーション
  console.log(body);
  if(body.item_name == null) {
    res.json(['グループ名が入力されていません。']);
    return;
  }

  var data = {
    item_name: body.item_name
  }

  if(body.unit !== null){
    data.unit = body.unit
  }

  var new_recorditem = new RecordItem(data)

  new_recorditem
    .save()
    .then(result => {
      res.statu(200).json(result)
    }).catch(err => {
      res.status(500).json(err)
    })
  
  return;
}