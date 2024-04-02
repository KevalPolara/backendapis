const express = require('express');
const { addCampainData, getCampaignData } = require('../controller/campaign');
const router = express.Router();

router.post("/addcampaign", addCampainData);
router.get("/getcampaign", getCampaignData);

module.exports = router;