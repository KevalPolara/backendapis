const express = require("express");
const { addCampaignOwnerData, getCampaignOwnerData } = require("../controller/campaignowner");
const router = express.Router();

router.post("/addcampaignowner", addCampaignOwnerData);
router.get("/getcampaignowner", getCampaignOwnerData);

module.exports = router;
