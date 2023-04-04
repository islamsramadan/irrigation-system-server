const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const twilio = require("twilio");
const Feature = require("../models/featureModel");
const Case = require("../models/caseModel");

const { Vonage } = require("@vonage/server-sdk");
const User = require("../models/userModel");

exports.getAllFeatures = catchAsync(async (req, res, next) => {
  const features = await Feature.find().populate("caseStudy");
  //   .populate("creator");

  res.status(200).json({
    status: "success",
    results: features.length,
    data: {
      features,
    },
  });
});

exports.createFeature = catchAsync(async (req, res, next) => {
  const caseStudy = req.params.userId;
  //   const creator = Case.findOne({ id: userId }).creator;
  //   console.log("creator=======?", creator);

  let message = "";
  if (req.body.mois * 1 < 50) {
    message = `kindly open the pump as moisture(${req.body.mois}) needs to be more than 50`;

    // SENDING SMS TO THE USER

    const vonage = new Vonage({
      apiKey: "d220307a",
      apiSecret: "JlAJmZqaWTwscDO1",
    });

    // await vonage.sms
    //   .send({
    //     text: message,
    //     // text: "الرجاء فتح البامب",
    //     from: "smart irrigation system",
    //     to: "201016817590",
    //     // to: "201092683105",
    //   })
    //   .then((resp) => {
    //     console.log("Message sent successfully");
    //     console.log(resp);
    //   })
    //   .catch((err) => {
    //     console.log("There was an error sending the messages.");
    //     console.error(err);
    //   });

    // *********************************************************************
    // SENDING SMS TO THE USER
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require("twilio")(accountSid, authToken);

    // client.messages
    //   .create({
    // body: message,
    // // body: "الرجاء فتح البامب",
    // from: "+19298224363",
    // to: "+201016817590",
    //   })
    //   .then((message) => console.log(message))
    //   .catch((err) => console.log(err));
  }

  const newFeature = await Feature.create({
    temperature: req.body.temp,
    moisture: req.body.mois,
    humidity: req.body.hum,
    rain: req.body.rain,
    caseStudy,
    message,
  });

  const user = await User.findByIdAndUpdate(caseStudy, {
    lastFeatures: newFeature._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      newFeature,
      user,
    },
  });
});

exports.getCaseFeatures = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const features = await Feature.find({ caseStudy: userId }).populate(
    "caseStudy"
  );

  //   const cases = await Case.find({ creator }).populate("creator");

  res.status(200).json({
    status: "success",
    results: features.length,
    data: {
      features,
    },
  });
});
