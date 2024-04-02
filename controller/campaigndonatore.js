const CampaignDonator = require("../models/campaigndonatore");

module.exports.addCampainDonatorData = async (req, res) => {
  const campaingDonatorData = req.body;
  console.log("campaingDonatorData", campaingDonatorData);
  try {
    const addCampaignDonorData = await CampaignDonator.create(
      campaingDonatorData
    );
    console.log("addCampaignDonorData", addCampaignDonorData);

    if (!addCampaignDonorData) {
      return res.status(500).json({ Message: "Campaign Donator Not Found" });
    }

    return res.status(200).json({
      Message: "Campaign Donator Created SuccesFully",
      addCampaignDonorData: addCampaignDonorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: error.Message });
  }
};

module.exports.getCampaignDonatorData = async (req, res) => {
  try {
    const getCampaignDonatorData = await CampaignDonator.findAll();
    console.log("getCampaignDonatorData", getCampaignDonatorData);

    if (!getCampaignDonatorData) {
      return res.status(500).json({ Message: "Campaign Donator Not Found" });
    }

    return res.status(200).json({
      Message: "Campaign Donator Data Got SuccesFully",
      getCampaignDonatorData: getCampaignDonatorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: error.Message });
  }
};
