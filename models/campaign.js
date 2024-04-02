const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const CampaignOwner = sequelize.define("campaigns", { name: DataTypes.STRING });

const Campaign = sequelize.define("campaigns", {
  uniqueId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => {
      return Math.random().toString(36).substring(2, 10);
    },
    validate: {
      notNull: {
        msg: "Please Enter a Valid AlphaNumeric Id",
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please Enter a Valid Name",
      },

      notEmpty: { msg: "Name CanNot be Empty" },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Enter a Valid Description",
      },

      notEmpty: { msg: "Description CanNot be Empty" },
      len: {
        args: [3, 300],
      },
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Enter a Amount",
      },

      notEmpty: { msg: "Amount CanNot be Empty" },
    },
  },
  expirydate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Enter a Date",
      },

      notEmpty: { msg: "Date CanNot be Empty" },
    },
  },
  status: {
    type: DataTypes.ENUM("active", "expired", "fraud", "succesfull"),
    allowNull: false,
    defaultValue: "active",
  },

  Owner_Id: {
    type: DataTypes.INTEGER,
    reference: {
      model: CampaignOwner,
      key: "id",
    },
  },
});

Campaign.hasMany(CampaignOwner, {
  foreignKey: "Owner_Id",
});
CampaignOwner.belongsTo(Campaign);

Campaign.addHook("beforeSave", (campaign) => {
  if (campaign.expiration_date < new Date()) {
    campaign.status = "expired";
  } else if (campaign.amount > String(1000)) {
    campaign.status = "SuccesFull";
  }
});

module.exports = Campaign;
