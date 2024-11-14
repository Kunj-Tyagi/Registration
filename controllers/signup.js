const asyncHandler = require("express-async-handler");
const User = require("../models/signup");
const generateOTP = require("../middleware/otpgenerator");
const nodemailer = require("nodemailer");
const {userSchema}=require("../Schema.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// @desc userDetails come from client side
// @route POST /api/userDetails
// @access public
const signup = asyncHandler(async (req, res) => {
  const { name, email, phoneno } = req.body;
  if (!name || !email || !phoneno) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const otp = generateOTP();

  req.session.otp = otp;
  req.session.email = email;

  const receiver = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Your OTP for Registration",
    text: `your OTP is ${otp}`,
  };

  transporter.sendMail(receiver, (error, emailResponse) => {
    if (error) {
      console.log("Error sending email:", error.message);
      return res.status(500).json({ message: "Failed to send OTP" });
    } else {
      console.log("OTP sent successfully!");
      res.status(200).json({ message: "OTP sent successfully!" });
    }
  });

  req.session.userData = { name, email, phoneno };
});

const verify = asyncHandler(async (req, res) => {
  const { otp } = req.body;
 
  // Convert otp to a string for comparison
  const otpString = String(otp);
  // console.log(otp);
  console.log(req.session.otp);
  // Check if OTP matches the one stored in session
  if (req.session.otp && req.session.otp === otpString) {
    // Create a new user and save it to the database
    const newUser = new User(req.session.userData);
    await newUser.save();
    console.log(req.session.otp);
    // Clear the session data after saving the user
    req.session.otp = null;
    req.session.userData = null;
    
    res
      .status(200)
      .json({ message: "OTP verified successfully and user registered!" });
  } else {
    res.status(400).json({ message: "Invalid OTP!" });
  }
});

module.exports = { signup, verify };