const Sequelize = require('sequelize');

module.exports = function (db) {
  let RecordGroup = db.define('recordgroup', {
    group_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    }
  })
  return RecordGroup
}