var Sequelize = require('sequelize');
var RecordItem = require('./RecordItem')
var User = require('./User')

module.exports = function (db) {
  let Record = db.define('Record', {
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
      type: Sequelize.STRING,
      allowNull: false
    },
    extends: {
      type: Sequelize.JSON,
      allowNull: true
    }
  })
  return Record
}