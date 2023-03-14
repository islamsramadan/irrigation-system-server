const express = require("express");

const router = express.Router();

const featureController = require("../controllers/featureController");

router.route("/").get(featureController.getAllFeatures);
//   .post(userController.getAllAdmins, disasterController.createDisaster);

router
  .route("/:caseId")
  .get(featureController.getCaseFeatures)
  .post(featureController.createFeature);

module.exports = router;
