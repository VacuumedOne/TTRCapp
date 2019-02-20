var Sequelize = require('sequelize');

module.exports = function (db) {
  var RecordItem = require('./RecordItem')(db)
  var User = require('./User')(db)
  let Record = db.define('record', {
    player_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    registerer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: RecordItem,
        key: 'id'
      }
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    result: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    extends: {
      type: Sequelize.JSON,
      allowNull: true
    }
  })
  Record.belongsTo(RecordItem, {
    foreignKey: 'item_id',
    targetKey: 'id'
  })
  Record.belongsTo(User, {
    foreignKey: 'player_id',
    targetKey: 'id'
  })
  return Record
}