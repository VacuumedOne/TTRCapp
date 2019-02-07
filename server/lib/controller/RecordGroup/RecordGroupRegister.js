module.exports = function(body, res, connection) {
  var RecordGroup = require('../../model/Recordgroup')(db)

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

  var new_recordgroup = new RecordGroup({
    group_name: body.group_name
  })

  new_recordgroup
    .save()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(500).json(err)
    })

  return;
}