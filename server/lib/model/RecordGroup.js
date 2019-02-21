const Sequelize = require('sequelize');

module.exports = function (db) {
  let RecordGroup = db.define('recordgroup', {
    group_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    }
  },
  {
    engine: 'InnoDB',
    charset: 'utf8',
    paranoid: true
  })
  return RecordGroup
}