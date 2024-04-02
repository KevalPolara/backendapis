const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const CampaignOwner = sequelize.define("campaignowners", {
  User_Id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid User Id",
      },
    },
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid UserName",
      },

      notEmpty: { msg: "UserName CanNot be Empty" },
    },
  },
  Crypto_Wallet_Address: {
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
