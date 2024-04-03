const CampaignOwner = require("../models/campaignowner");
const Joi = require("joi");

const validateCampaignOwner = (campainOwnerData) => {
  console.log("can i reach here", campainOwnerData);
  {
    const joiSchema = Joi.object({
      user_id: Joi.string().required("User_Id is Required"),
      username: Joi.string().min(3).max(300).required("UserName is Required"),
      crypto_wallet_address: Joi.string()
        .min(3)
        .max(300)
        .required("Crypto Wallet Address is Required"),
    }).options({ abortEarly: true });

    return joiSchema.validate(campainOwnerData);
  }
};

module.exports.addCampaignOwnerData = async (req, res) => {
  const campainOwnerData = req.body;
  validateCampaignOwner(campainOwnerData);
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
  console.log("Can i Reach Here");
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
