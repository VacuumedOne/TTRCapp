const Sequelize = require('sequelize');

module.exports = function (db) {
  let User = db.define('user', {
    hashed_pw: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    salt: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    mail: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    sex: {
      type: Sequelize.STRING(10),
      allowNull: false,
      validate: {
        isIn: [['male', 'female']]
      }
    },
    /**
     * authは権限情報。
     * 0: unauthorized 権限無し(凍結)
     * 1: administrator 管理者　全ての記録操作を行える
     * 2: supporter サポーター　他人の記録を操作できる
     * 3: player 選手　自分の記録を操作できる
     * 4: viewer 監視　チームの記録を見ることができる
     */
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