const Campaign = require("../models/campaign.model");
const Joi = require("joi");
const { Op } = require("sequelize");

const validateCampaign = (campaingData) => {
  console.log("can i reach here", campaingData);

  {
    const joiSchema = Joi.object({
      name: Joi.string()
        .min(5)
        .max(30)
        .required("Minimum 5 and 30 letters is Required"),
      description: Joi.string()
        .min(3)
        .max(300)
        .required("Minimum 3 and 300 letters is Required"),
      amount: Joi.number().required("Amount is Required"),
      expirydate: Joi.date().required("ExpiryDate is Required"),
      owner_id: Joi.number().required("Owner_Id is Required"),
    }).options({ abortEarly: true });

    return joiSchema.validate(campaingData);
  }
};

module.exports.addCampainData = async (req, res) => {
  try {
    const campaingData = req.body;

    const { value, error } = validateCampaign(campaingData);
    if (error) {
      console.log("error", error);
    }

   
      const campaignData = await Campaign.update(
        { status: "expiry" },
        {
          where: {
            expirydate: {
              $lt: new Date(),
            },
          },
          returning: true,
        }
      );

      console.log("campaignData", campaignData);

    const addCampaignData = await Campaign.create(value);

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
