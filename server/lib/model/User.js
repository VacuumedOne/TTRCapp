const Sequelize = require('sequelize');

module.exports = function (db) {
  let User = db.define('User', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hashed_pw: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mail: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    sex: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['male', 'female']]
      }
    },
    auth: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1, 2, 3, 4]]
      }
    },
    birth_ymd: {
      type: Sequelize.DATE
    },
    k_lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    k_firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    h_lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    h_firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    d_flg: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
  return User
}