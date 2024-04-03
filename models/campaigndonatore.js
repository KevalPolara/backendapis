const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
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
  nickname: {
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

  // campaign_id: {
  //   type: DataTypes.INTEGER,
  //   reference: {
  //     model: Campaign,
  //     key: "id",
  //   },
  // },
});

Campaign.hasMany(CampaignDonator, {
  foreignKey: "campaign_id",
});
CampaignDonator.belongsTo(Campaign);

module.exports = CampaignDonator;
