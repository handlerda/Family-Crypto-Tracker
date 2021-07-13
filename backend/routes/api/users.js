const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
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

// add a user
router.post(
  "/",
  restoreUser,
  validateSignup,
  asyncHandler(async (req, res, next) => {
    try {
      const familyId = req.user.toJSON().familyId;
      const newUser = req.body;
      console.log(newUser);
      const user = await User.signup({
        ...newUser,
        familyId: familyId,
        headOfHouseHold: false,
      });
      // send txt msg
      await sendTxtMsg(
        `You have been added to crypfam! Your password is ${newUser.password}`,
        newUser.phone
      );
      res.status(201);
      res.json({ added: user.toJSON() });
    } catch (error) {
      console.log(`was an error thrown`);
      next(error);
    }
  })
);

// get all users associated with a family
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    try {
      const familyId = req.user.toJSON().familyId;
      console.log(req.user.toJSON());
      const userPayload = await User.findAll({
        where: { familyId: familyId },
      });
      console.log(userPayload, `here comes the user payload`);
      const users = userPayload.map((user) => {
        console.log(user.toJSON());
        return user.toJSON();
      });
      console.log(users);
      res.json({
        users,
      });
    } catch (error) {
      next(error);
    }
  })
);

router.delete(
  "/:userId",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    // get user that needs to be deleted
    const userToBeDeleted = req.params.userId;
    // check if the user is head of household
    const isHeadOfHouseHold = req.user.toJSON().headOfHouseHold;
    // we can delete
    if (isHeadOfHouseHold) {
      try {
        //delete the user
        await User.destroy({ where: { id: userToBeDeleted } });
        // return the deleted user status
        res.json({
          deleted: true,
          userId: userToBeDeleted,
        });
      } catch (error) {
        // return the error
        next(error);
      }
    }
    // the user can not delete because they are not head of household
    else {
      // return the error back to the client
      const err = new Error(
        "You are not the head of household and can not delete the user"
      );
      err.status = 401;
      err.title = "Delete failed";
      err.errors = [
        "You are not the head of household and can not delete the user",
      ];
      return next(err);
    }
  })
);

module.exports = router;
