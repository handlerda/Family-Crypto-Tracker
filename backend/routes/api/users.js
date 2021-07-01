const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("firstName").exists({ checkFalsy: true }),
  check("lastName").exists({ checkFalsy: true }),
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

// things I need to do
// 1. add a new family
// check if family / user already exist
// create new family

const checkUser = async (req, res, next) => {
  // check to see if user exists
  // get head of household email
  const headHouseholdEmail = req.body.email;
  // get family member emails
  const familyMembersEmails = req.body.familyMembers.map(
    (member) => member.email
  );
  // get list of emails
  const emails = familyMembersEmails.concat(headHouseholdEmail);

  next();
};

// 2. add users to family
// 3. give head of household GLOBAL ACCESS

// Sign up
router.post(
  "/",
  validateSignup,
  checkUser,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //const user = await User.signup({ email, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
