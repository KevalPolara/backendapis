const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const campaignOwner = require("./owner.model");
const cron = require("node-cron");

const campaign = sequelize.define("campaigns", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  expirydate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("active", "expired", "fraud", "succesfull"),
    allowNull: false,
    defaultValue: "active",
  },

  owner_id: {
    type: DataTypes.INTEGER,
    reference: {
      model: campaignOwner,
      key: "id",
    },
  },
});

// campaign.hasMany(campaignOwner);
// campaignOwner.belongsTo(campaign);

// campaign.addHook("afterSave", (campaign) => {
//   console.log("campaign" , campaign);
//   console.log(campaign.expiration_date , new Date());
//   if (campaign.expiration_date < new Date()) {
//     campaign.status = "expired";
//   }
//   else if (campaign.amount > String(100000)) {
//     campaign.status = "SuccesFull";
//   }
// });



module.exports = campaign;
