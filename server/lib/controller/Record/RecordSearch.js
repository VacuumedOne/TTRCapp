module.exports = function(body, res, db) {
  var RecordGroup = require('../../model/RecordGroup')(db)
  var RecordItem = require('../../model/RecordItem')(db)
  var Record = require('../../model/Record')(db)
  var User = require('../../model/User')(db)
  const Op = db.Op

  /**
   * user_id: 検索するユーザのID(optional)
   * item_id: 検索する種目アイテムのID(optional)
   * group_id: 検索する記録グループのID(optional)
   * 一つ以上の検索条件がなければ検索に失敗するようにしている。
   */

  let cond_user_id = body.user_id || false
  let cond_item_id = body.item_id || false
  let cond_group_id = body.group_id || false
  let limit = body.limit || 30

  if(!cond_user_id && !cond_item_id && !cond_group_id){
    res.status(500).send('At least one search condition is required.');
    return;
  }

  let whereClause = {}
  if (cond_user_id) {
    whereClause.player_id = cond_user_id
  }
  if (cond_item_id) {
    whereClause.item_id = cond_item_id
  }
  let whereClause2 = {}
  if (cond_group_id) {
    whereClause2.group_id = cond_group_id
  }


  Record.findAll({
    where: whereClause,
    include: [
      {
        model: RecordItem,
        attributes: [
          'item_name',
          'group_id',
          'unit'
        ],  
        where: whereClause2,
        include: [{
          model: RecordGroup
        }]
      },
      {
        model: User,
        attributes: [
          'k_lastname',
          'k_firstname'
        ]
      }
    ],
    limit: limit
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