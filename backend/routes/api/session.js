const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Account, Family } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid phone number"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    console.log(credential, password);

    //get users
    const user = await User.login({ credential, password });
    //get familyMembers

    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

const isDemoUser = async (req, res, next) => {
  const user = req.user;
  const familyId = req.user.familyId;
  console.log(user);
  if (!user.demoUser) {
    next();
  } else {
    try {
      //get all family members
      const familyMembers = await User.findAll({
        where: {
          familyId: user.familyId,
        },
      });
      //remove associated accounts from all users

      const accounts = await Promise.all(
        familyMembers.map(async (member) => {
          //remove all authorized accounts
          const accounts = await member.getAuthorizedAccounts();
          await member.removeAuthorizedAccounts(accounts);
          return accounts;
        })
      );

      //delete all accounts
      await Promise.all(
        accounts.map(async (account) => {
          await Promise.all(
            account.map((act) => {
              return act.destroy();
            })
          );
        })
      );

      // delete all users associated with family
      await Promise.all(
        familyMembers.map((member) => {
          return member.destroy();
        })
      );

      //query the family
      const family = await Family.findByPk(familyId);

      //delete the family
      await family.destroy();
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //find accounts joins associated with user
  //delete account joins associated with the user
  //delete accounts with other associated users
  //delete all users
  //delete the family
};

//Log out
router.delete("/", restoreUser, isDemoUser, (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user,
    });
  } else return res.json({});
});

module.exports = router;
