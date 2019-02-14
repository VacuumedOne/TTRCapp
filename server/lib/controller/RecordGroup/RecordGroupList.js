module.exports = function(res, db) {
  var RecordGroup = require('../../model/RecordGroup')(db)

  /**
   * 引数はなし
   */

  RecordGroup.findAll()
    .then(result => {
      res.status(200).json(result)
    }).catch(err => {
      console.log(err)
      res.status(500).end()
    })
  return;
}