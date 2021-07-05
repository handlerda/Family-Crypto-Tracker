const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../../utils/auth");
const { User } = require("../../../db/models");
//const zabo = require("../../zabo");
const Zabo = require("zabo-sdk-js");
//console.log(zabo.toString());
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
  const crypfamUser = await User.findByPk(id);

  const zabo = await Zabo.init({
    apiKey: process.env.ZABO_PUBLIC_KEY,
    secretKey: process.env.ZABO_PRIVATE_KEY,
    env: "sandbox",
  });

  //user not in zabo
  if (!crypfamUser.zaboId) {
    try {
      // creat zabo user and add associated account
      console.log(zaboAccountObject);
      let zaboUser = await zabo.users.create(zaboAccountObject);
      // add zabo user to crypfam database
      crypfamUser.zaboId = zaboUser.id;
      // save the user to the database
      await crypfamUser.save();

      next();
    } catch (error) {
      //send the error to the error handler
      next(error);
    }
  }
  //the user is in zabo
  else {
    try {
      // get zabo user
      const user = await zabo.users.getOne(zaboId);
      // associate zabo user with account
      await zabo.users.addAccount(user, zaboAccountObject);
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
  isZaboUser,
  asyncHandler(async (req, res, next) => {
    const { zaboAccountObject } = req.body;
    // add accounts to db
    const { id } = req.user.dataValues;
    console.log(req.user);
    const currentUser = await User.findByPk(id);
    console.log(`here comes current user`, currentUser);
    await currentUser.addAccount({
      userId: id,
      zaboId: zaboAccountObject.id,
      provider: zaboAccountObject.provider.name,
    });
    console.log(currentUser);
    await currentUser.save();
    res.json({
      data: "ok",
    });
  })
);

module.exports = router;
