module.exports = function(body, res, db) {
  var RecordGroup = require('../../model/RecordGroup')(db)
  var RecordItem = require('../../model/RecordItem')(db)
  var Record = require('../../model/Record')(db)

  /**
   * user_id: 検索するユーザのID(optional)
   * item_id: 検索する種目アイテムのID(optional)
   * group_id: 検索する記録グループのID(optional)
   * 一つ以上の検索条件がなければ検索に失敗するようにしている。
   */

  
  let cond_user_id = body.user_id || false
  let cond_item_id = body.item_id || false
  let cond_group_id = body.group_id || false

  Record.findAll({
    where: {
      player_id: cond_user_id,
      item_id: cond_item_id
    },
    include: [
      {
        model: RecordItem,
        attributes: [
          'item_name',
          'group_id',
          'unit'
        ],
        where: {
          group_id: cond_group_id
        }
      }
    ]
  }).then(result => {
    res.json(result);
  }).catch(err => {
    console.log(err)
    res.sendStatus(500);
  })

  // RecordGroup.findAll()
  //   .then(result => {
  //     res.status(200).json(result)
  //   }).catch(err => {
  //     console.log(err)
  //     res.status(500).end()
  //   })
  return;
}