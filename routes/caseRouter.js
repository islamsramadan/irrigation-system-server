const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const caseController = require("../controllers/caseController");

router.route("/").get(caseController.getAllCases);
//   .post(userController.getAllAdmins, caseController.createCase);

router
  .route("/:userId")
  .get(caseController.getUserCases)
  .post(caseController.createCase);

module.exports = router;
