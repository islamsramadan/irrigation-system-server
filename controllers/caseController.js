const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const twilio = require("twilio");
const Case = require("../models/caseModel");

exports.getAllCases = catchAsync(async (req, res, next) => {
  const cases = await Case.find().populate("creator");

  res.status(200).json({
    status: "success",
    results: cases.length,
    data: {
      cases,
    },
  });
});

exports.getUserCases = catchAsync(async (req, res, next) => {
  const creator = req.params.userId;
  const cases = await Case.find({ creator }).populate("creator");

  res.status(200).json({
    status: "success",
    results: cases.length,
    data: {
      cases,
    },
  });
});

exports.createCase = catchAsync(async (req, res, next) => {
  const creator = req.params.userId;

  const newCase = await Case.create({ creator });

  res.status(200).json({ status: "success", data: { newCase } });
});
