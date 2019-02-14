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

  if(!cond_user_id && !cond_item_id && !cond_group_id){
    res.status(500).send('At least one search condition is required.');
    return;
  }

  Record.findAll({
    where: {
      player_id: {
        [Op.or]: [
          {[Op.eq]: cond_user_id}, //cond_user_idに数値が入っていれば一致検索
          cond_user_id===false //cond_user_idにfalseが入っていれば絞り込みなし
        ]
      },
      item_id: {
        [Op.or]: [
          {[Op.eq]: cond_item_id},
          cond_item_id===false
        ]
      }
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
          group_id: {
            [Op.or]: [
              {[Op.eq]: cond_group_id},
              cond_group_id===false
            ]
          }
        }
      },
      {
        model: User,
        attributes: [
          'k_lastname',
          'k_firstname'
        ]
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