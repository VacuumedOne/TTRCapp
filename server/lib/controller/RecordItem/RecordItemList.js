module.exports = function(body, res, db) {
  var RecordItem = require('../../model/RecordItem')(db);

  /**
   * POST内容
   * group_id 指定するグループID
   */
  if(body.group_id == null){
    res.json({
      state: "failure",
      text: "グループIDが指定されていません。"
    });
  }

  RecordItem.findAll({
    attributes: [
      'id',
      'item_name',
      'unit',
      'format'
    ],
    where: {
      group_id: body.group_id
    }
  }).then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).end()
  })
  
  return;
}