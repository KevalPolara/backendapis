const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const campaign = require("./campaign.model");

const campaignDonator = sequelize.define("campaigndonators", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  amount: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Valid",
  },

  campaign_id: {
    type: DataTypes.INTEGER,
    reference: {
      model: campaign,
      key: "id",
    },
  },
});

// campaign.hasMany(campaignDonator);
// campaignDonator.belongsTo(campaign);

module.exports = campaignDonator;
