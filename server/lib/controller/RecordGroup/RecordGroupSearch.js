module.exports = function(body, res, db) {
  var RecordGroup = require('../../model/RecordGroup')(db)

  /**
   * group_name: グループ名
   * グループ名での完全一致検索を行う
   */

  if(body.group_name === null){
    res.status(400).send('グループ名が指定されていません')
    return
  }

  RecordGroup.findOne({
    attributes: [
      'group_name',
      'id'
    ],
    where: {
      group_name: body.group_name
    }
    }).then(result => {
      res.status(200).json(result)
    }).catch(err => {
      console.log(err)
      res.status(500).end()
    })
  return;
}