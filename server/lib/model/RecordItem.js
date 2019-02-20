var Sequelize = require('sequelize');

module.exports = function (db) {
  var RecordGroup = require('./RecordGroup')(db)
  let RecordItem = db.define('recorditem', {
    item_name: {
      type: Sequelize.STRING(100),
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
    },
    /**
     * 記録の型。
     * 記録は基本的に数値で入れる。
     * 入れた数値をどの様に変換すれば良いかの情報。
     * 例えばmsならミリ秒で保存されているので、それをX:XX.Xの形に変換すれば良い。
     */
    format: {
      type: Sequelize.STRING,
      allowNull: false,
      isIn: [['plane', 'ms', 'g']]
    }
  })
  RecordItem.belongsTo(RecordGroup, {
    foreignKey: 'group_id',
    targetKey: 'id'
  })
  return RecordItem
}