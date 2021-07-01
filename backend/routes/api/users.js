const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Family } = require("../../db/models");
const { Op } = require("sequelize");

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

// things I need to do
// 1. add a new family
// check if family / user already exist
// create new family

const addFamilyHeadHouseHold = async (req, res, next) => {
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
  const usersInDB = await User.findAll({
    where: {
      email: {
        [Op.in]: emails,
      },
    },
  });
  if (!usersInDB.length) {
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
    res.json(
      {
        error: "User exists",
      },
      404
    );
  }
};

// 2. add users to family
// 3. give head of household GLOBAL ACCESS

// Sign up
router.post(
  "/",
  validateSignup,
  addFamilyHeadHouseHold,
  asyncHandler(async (req, res) => {
    const { familyMembers } = req.body;
    const { family, headHouseHold } = res.locals;
    //console.log(res.locals);
    // console.log(headHouseHold, "head of household");

    await Promise.all(
      familyMembers.map((member) =>
        User.create({
          ...member,
          familyId: family.id,
          headOfHouseHold: false,
        })
      )
    );
    await setTokenCookie(res, headHouseHold);

    return res.json({
      headHouseHold,
    });
  })
);

module.exports = router;
