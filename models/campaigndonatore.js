const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Campaign = require("./campaign");
const Campaign = sequelize.define("Campaign", {
  name: DataTypes.STRING,
});

const CampaignDonator = sequelize.define("campaigndonators", {
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid User Amount",
      },
    },
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid nickName",
      },

      notEmpty: { msg: "nickName CanNot be Empty" },
    },
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Valid",
  },

  Campaign_Id: {
    type: DataTypes.INTEGER,
    reference: {
      model: Campaign,
      key: "id",
    },
  },
});

Campaign.hasMany(Campaign, {
  foreignKey: "Campaign_Id",
});
CampaignOwner.belongsTo(Campaign);

module.exports = CampaignDonator;
