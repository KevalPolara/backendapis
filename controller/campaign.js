const Campaign = require("../models/campaign");

module.exports.addCampainData = async (req, res) => {
  const campaingData = req.body;
  console.log("campaingData", campaingData);
  try {
    const addCampaignData = await Campaign.create(campaingData);
    console.log("addCampaignData", addCampaignData);

    if (!addCampaignData) {
      return res.status(500).json({ Message: "Campaign User Not Found" });
    }

    return res.status(200).json({
      Message: "User Created SuccesFully",
      addCampaignData: addCampaignData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: error.Message });
  }
};

module.exports.getCampaignData = async (req, res) => {
  try {
    const getCampaignData = await Campaign.findAll();
    console.log("getCampaignData", getCampaignData);

    if (!getCampaignData) {
      return res.status(500).json({ Message: "Campaign Data Not Found" });
    }

    return res.status(200).json({
      Message: "Campaign Data Get SuccesFully",
      getCampaignData: getCampaignData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: error.Message });
  }
};
