const express = require("express");
const router = express.Router();

const campaignrouter = require("./campain");
const campaignDonatorRouter = require("./campaigndonator");
const campaignOwnerRouter = require("./campaignowner");


router.use("/campaign", campaignrouter);
router.use("/camapaigndonator", campaignDonatorRouter);
router.use("/campaignowner", campaignOwnerRouter);

module.exports = router;
