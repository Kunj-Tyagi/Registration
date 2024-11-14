const express = require("express");
const router = express.Router();
const {signup,verify}=require("../controllers/signup.js")
const validateuser=require("../Schema.js")

router.route("/signup/").post(validateuser,signup);
router.route("/verify/").post(verify);
module.exports = router;