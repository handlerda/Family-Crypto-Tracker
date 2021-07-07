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

//addFamilyHeadHousHold middleware:
// checks if a family exist
// create new family

const addFamilyHeadHouseHold = asyncHandler(async (req, res, next) => {
  // check to see if user exists
  // get head of household email
  const { headHouseholdEmail, firstName, lastName, phone, email, password } =
    req.body;

  // get family member emails
  const familyMembersEmails = req.body.familyMembers.map(
    (member) => member.email
  );
  // get list of emails
  const emails = familyMembersEmails.concat(headHouseholdEmail);
  // check to see if any emails exist
  const usersInDB = await User.count({
    where: {
      email: {
        [Op.in]: emails,
      },
    },
  });
  if (usersInDB === 0) {
    // add users to the db
    // add family
    const newFamily = await Family.create({
      name: `${req.body.lastName} household`,
    });
    // add head of household
    const headOfHouseHold = await User.signup({
      email,
      password,
      firstName,
      lastName,
      phone,
      headOfHouseHold: true,
      familyId: newFamily.id,
    });
    //console.log(headOfHouseHold);
    // pass to next function
    res.locals.family = newFamily;
    res.locals.headHouseHold = headOfHouseHold;
    next();
  } else {
    // throw errors
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The user already exists."];
    return next(err);
  }
});

// 2. add users to family
// 3. give head of household GLOBAL ACCESS

// Sign up
router.post(
  "/household",
  validateSignup,
  addFamilyHeadHouseHold,
  asyncHandler(async (req, res) => {
    const { familyMembers, familyPassword } = req.body;
    const { family, headHouseHold } = res.locals;

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

module.exports = router;
