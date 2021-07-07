const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Family } = require("../../db/models");
const { Op } = require("sequelize");
const sendTxtMsg = require("../twilio");

const router = express.Router();

const validateSignup = [
  check("firstName").exists({ checkFalsy: true }),
  check("lastName").exists({ checkFalsy: true }),
  check("phone").exists({ checkFalsy: true }),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { familyMembers, familyPassword } = req.body;

    // check if family members
    if (familyMembers.length) {
      await Promise.all([
        familyMembers.map((member) => {
          // sign family members up
          User.signup({
            ...member,
            password: familyPassword,
            familyId: family.id,
            headOfHouseHold: false,
          });
          // call twilio helper function
          sendTxtMsg(
            `Welcome to Crypfam ${member.firstName} 🎉 your password is: ${familyPassword}`,
            member.phone
          );
        }),
      ]);
    }
    //login the head of household
    await setTokenCookie(res, headHouseHold);
    return res.json({
      headHouseHold,
    });
  })
);

router.post("/");

module.exports = router;
