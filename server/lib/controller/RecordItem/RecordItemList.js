module.exports = function(body, res, db) {
  var RecordItem = require('../../model/RecordItem')(db);

  /**
   * POST内容
   * group_id 指定するグループID
   */
  console.log(body);
  if(body.group_id == null){
    res.json({
      state: "failure",
      text: "グループIDが指定されていません。"
    });
  }

  RecordItem.findAll({
    where: {
      group_id: body.group_id
    }
  }).then(result => {
    res.status(200).json(result)
  }).catch(err => {
    resu.status(500).json(err)
  })
  
  return;
}