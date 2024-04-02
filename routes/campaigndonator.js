const express = require("express");
const { addCampainDonatorData, getCampaignDonatorData } = require("../controller/campaigndonatore");
const router = express.Router();

router.post("/addcampaigndonator", addCampainDonatorData);
router.post("/getcampaigndonator", getCampaignDonatorData);

module.exports = router;
