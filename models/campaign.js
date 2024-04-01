const { DataTypes } = require("sequelize");
const sequelize = require("../index");

sequelize.define("Campaign", {
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
        msg: "Please Enter a UserName",
      },

      notEmpty: { msg: "UserName CanNot be Empty" },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Enter a Description",
      },

      notEmpty: { msg: "Description CanNot be Empty" },
      len: {
        args: [3, 300],
      },
    },
  },
  goal_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Enter a Amount",
      },

      notEmpty: { msg: "Amount CanNot be Empty" },
    },
  },
  expiration_date: {
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
});

Campaign.addHook("beforeSave", (campaign, options) => {
  if (campaign.expiration_date < new Date()) {
    campaign.status = "expired";
  } else if (campaign.amount > String(1000)) {
    campaign.status = "SuccesFull";
  }
});


module.exports = sequelize;