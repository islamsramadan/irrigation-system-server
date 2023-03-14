const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const twilio = require("twilio");
const Feature = require("../models/featureModel");
const Case = require("../models/caseModel");

exports.getAllFeatures = catchAsync(async (req, res, next) => {
  const features = await Feature.find().populate("caseId");
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
  const caseId = req.params.caseId;
  //   const creator = Case.findOne({ id: caseId }).creator;
  //   console.log("creator=======?", creator);

  const newFeature = await Feature.create({
    temperature: req.body.temp,
    moisture: req.body.mois,
    humidity: req.body.hum,
    rain: req.body.rain,
    caseId,
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
  const caseId = req.params.caseId;
  const features = await Feature.find({ caseId }).populate("caseId");

  //   const cases = await Case.find({ creator }).populate("creator");

  res.status(200).json({
    status: "success",
    results: features.length,
    data: {
      features,
    },
  });
});
