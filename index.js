const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const campaign = require("./models/campaign");
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(express.json());

app.use(cors());

const sequelize = new Sequelize("campaign_donation", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const indexRouter = require("./routes/campain");

app.use("/v1", indexRouter);

app.get("/helloworld", (req, res) => {
  res.status(201).json({ message: "api Create Succesfully" });
});

app.listen(3000, () => {
  console.log("Server Started at Port Number 3000");
});

module.exports = { sequelize, campaign };
