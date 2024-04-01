const express = require('express');
const { addCampainData } = require('../controller/campaign');
const router = express.Router();

router.post("/addcampaign", addCampainData);

module.exports = router;