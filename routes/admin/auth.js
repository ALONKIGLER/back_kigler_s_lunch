const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");

const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post(
  "/admin/signin",
  validateSigninRequest,
  validateSignupRequest,
  signin
);

module.exports = router;
