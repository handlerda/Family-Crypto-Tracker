const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../../utils/auth");
const { User } = require("../../../db/models");
const zabo = require("../../zabo");
const router = express.Router();

// wallet routes
// add a new wallet

// middleware
// check if demo account
const isDemoUser = async (req, res, next) => {
  console.log(req.user);
  //const { id } = req.user;
  next();
};

//handle zabo user info
// if crypfam userId !== zabo account create user
// else add account to current zabo account
const isZaboUser = async (req, res, next) => {
  const { zaboAccountObject } = req.body;
  //get user info
  const { id, zaboId } = req.user.dataValues;
  const crypfamUser = await User.findByPik(id);
  //user not in zabo
  if (!crypfamUser.zaboId) {
    try {
      // creat zabo user
      let zaboUser = await zabo.users.create(zaboAccountObject);
      // add zabo user to crypfam database
      crypfamUser.zaboId = zaboUser.id;
      // save the user to the database
      await crypfamUser.save();
    } catch (error) {
      //send the error to the error handler
      next(error);
    }
  }
  //the user is in zabo
  else {
    try {
      const user = await zabo.users.getOne(zaboId);
      const newAccount = await zabo.users.addAccount(user, zaboAccountObject);
      res.local.account = newAccount.id;
      next();
    } catch (error) {
      next(error);
    }
  }
};

// ROUTES
// check if user has a zaboId
// POST NEW WALLET
router.post(
  "/",
  requireAuth,
  // get user data
  restoreUser,
  asyncHandler(async (req, res, next) => {
    // add accounts to db
  })
);

module.exports = router;
