const CampaignOwner = require("../models/campaignowner");

module.exports.addCampaignOwnerData = async (req, res) => {
  const campainOwnerData = req.body;
  console.log("campainOwnerData", campainOwnerData);
  try {
    const addCampaignOwnerData = await CampaignOwner.create(campainOwnerData);
    console.log("addCampaignOwnerData", addCampaignOwnerData);

    if (!addCampaignOwnerData) {
      return res.status(500).json({ Message: "Campaign Owner Not Found" });
    }

    return res.status(200).json({
      Message: "Campaign Owner Created SuccesFully",
      addCampaignOwnerData: addCampaignOwnerData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: error.Message });
  }
};

module.exports.getCampaignOwnerData = async (req, res) => {
  try {
    const getCampaignOwnerData = await CampaignOwner.findAll();
    console.log("getCampaignOwnerData", getCampaignOwnerData);

    if (!getCampaignOwnerData) {
      return res.status(500).json({ Message: "Campaign Owner Not Found" });
    }

    return res.status(200).json({
      Message: "Campaign Owner Data Got SuccesFully",
      getCampaignOwnerData: getCampaignOwnerData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: error.Message });
  }
};
