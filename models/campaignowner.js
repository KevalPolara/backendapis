const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const CampaignOwner = sequelize.define("campaignowners", {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid User Id",
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid UserName",
      },
    },
  },
  crypto_wallet_address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Enter a Valid Crypto Wallet Address",
      },

      notEmpty: { msg: "Crypto Wallet Address CanNot be Empty" },
      len: {
        args: [3, 300],
      },
    },
  },
});

module.exports = CampaignOwner;
