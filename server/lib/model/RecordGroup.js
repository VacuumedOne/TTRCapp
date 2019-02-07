const Sequelize = require('sequelize');

module.exports = function (db) {
  let RecordGroup = db.define('RecordGroup', {
    group_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  })
  return RecordGroup
}