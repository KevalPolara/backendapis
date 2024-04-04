const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const campaignOwner = sequelize.define("campaignowners", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  crypto_wallet_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = campaignOwner;
