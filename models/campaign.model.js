const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const campaignOwner = require("./owner.model");
const cron = require("node-cron");
const { Op } = require("sequelize");
const campaignDonator = require("./donator.model");

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

campaign.belongsTo(campaignDonator, { foreignKey: "campaign_id" });

cron.schedule("*/10 * * * * *", async function () {
  try {
    const currentDate = new Date();
    const totalDonated = await campaignDonator.sum("amount", {
      where: {
        amount: {
          [Op.gt]: 0,
        },
      },
    });

    if (totalDonated) {
      const campaignsToUpdate = await campaign.update(
        { status: "successful" },
        {
          where: {
            amount: { [Op.lte]: totalDonated },
          },
        }
      );

      console.log("campaignsToUpdate", campaignsToUpdate);
    } else {
      await campaign.update(
        { status: "expired" },
        {
          where: {
            expirydate: {
              [Op.lt]: currentDate.toISOString(),
            },
          },
        },
        {
          new: true,
        }
      );
    }
  } catch (error) {
    console.error("error", error);
  }
});

module.exports = campaign;
