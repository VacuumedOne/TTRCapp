var Sequelize = require('sequelize');

module.exports = function (db) {
  var RecordGroup = require('./RecordGroup')(db)
  let RecordItem = db.define('RecordItem', {
    item_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: RecordGroup,
        key: 'id'
      }
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  })
  return RecordItem
}