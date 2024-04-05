const CampaignDonator = require("../models/donator.model");
const Joi = require("joi");

const validateCampaignDonator = (campaingDonatorData) => {
  console.log("can i reach here", campaingDonatorData);
  {
    const joiSchema = Joi.object({
      amount: Joi.number().required("Number is Required"),
      nickname: Joi.string().min(3).max(300).required("NickName is Required"),
      campaign_id: Joi.number().required("campaign_id is Required"),
    }).options({ abortEarly: false });

    return joiSchema.validate(campaingDonatorData);
  }
};

module.exports.addCampainDonatorData = async (req, res) => {
  console.log("addCampainDonatorData");
  console.log("can i reach here");

  const campaingDonatorData = req.body;
  console.log("campaingDonatorData", campaingDonatorData);
  try {
    const { value, error } = validateCampaignDonator(campaingDonatorData);
    console.log("value", value);

    if (error) {
      console.log(error, "error");
      throw Error;
    }
    const addCampaignDonorData = await CampaignDonator.create(value);
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
