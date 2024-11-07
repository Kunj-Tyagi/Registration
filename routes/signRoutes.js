const express = require("express");
const router = express.Router();
const {signup,verify}=require("../controllers/signup.js")

router.route("/signup/").post(signup);
router.route("/verify/").post(verify);
module.exports = router;