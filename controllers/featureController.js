const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const twilio = require("twilio");
const Feature = require("../models/featureModel");
const Case = require("../models/caseModel");

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

  const newFeature = await Feature.create({
    temperature: req.body.temp,
    moisture: req.body.mois,
    humidity: req.body.hum,
    rain: req.body.rain,
    caseStudy,
    // creator,
  });

  res.status(201).json({
    status: "success",
    data: {
      newFeature,
    },
  });
});

exports.getCaseFeatures = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const features = await Feature.find({ userId }).populate("caseStudy");

  //   const cases = await Case.find({ creator }).populate("creator");

  res.status(200).json({
    status: "success",
    results: features.length,
    data: {
      features,
    },
  });
});
