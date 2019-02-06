const Sequelize = require('sequelize');

module.exports = function (db) {
  let Record = db.define('Record', {
    name: Sequelize.STRING
  })
  return Record
}