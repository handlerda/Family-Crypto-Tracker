const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../../utils/auth");
const { User, Account, AuthorizedAccountUser } = require("../../../db/models");
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
  // initialize zabo object
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
    console.log(req);
    try {
      const { zaboAccountObject } = req.body;
      const { id, familyId, headOfHouseHold } = req.user.dataValues;
      // initialize zabo object

      //create new account
      const newAccount = await Account.create({
        userId: id,
        zaboId: zaboAccountObject.id,
        provider: zaboAccountObject.provider.name,
      });
      //add account to junction table
      await AuthorizedAccountUser.create({
        userId: id,
        accountId: newAccount.id,
      });
      // if user is not account owner add to junction table
      if (!headOfHouseHold) {
        const headOfHouseHold = await User.findOne({
          where: {
            headOfHouseHold: true,
            familyId: familyId,
          },
        });
        await newAccount.addAuthorizedUser(headOfHouseHold);
      }

      // return the added account
      res.status = 201;
      res.json({
        status: "added",
        zaboAccountId: zaboAccountObject.id,
        accountId: newAccount.id,
        userId: id,
      });
    } catch (error) {
      next(error);
    }
  })
);

router.get(
  "/",
  requireAuth,
  restoreUser,
  asyncHandler(async (req, res, next) => {
    // get userId
    const { id } = req.user.dataValues;
    // get user
    const user = await User.findByPk(id);
    // get authorizedAccounts
    const userAccounts = await user.getAuthorizedAccounts();
    // Initialize Zabo Object
    const zabo = await Zabo.init({
      apiKey: process.env.ZABO_PUBLIC_KEY,
      secretKey: process.env.ZABO_PRIVATE_KEY,
      env: "sandbox",
    });
    // loop over each account
    let values = [];
    const accounts = await Promise.all(
      userAccounts.map(async (account) => {
        // get user (owner for the account)
        const zaboUser = await Account.findByPk(account.id, {
          include: User,
        });
        // getZaboUser object in JSON
        const zaboUserJSON = zaboUser.toJSON();
        console.log(zaboUserJSON);
        console.log(zaboUserJSON.User.zaboId, `zaboUserId`);
        console.log(zaboUserJSON.zaboId, `ZABO ACCOUNT ID`);
        const data = await zabo.users.getAccount({
          userId: zaboUserJSON.User.zaboId,
          accountId: zaboUserJSON.zaboId,
        });
        data.userId = zaboUserJSON.User.id;
        data.firstName = zaboUserJSON.User.firstName;
        return data;
      })
    );
    console.log(accounts);
    res.json({
      accounts: accounts,
    });
  })
);

router.delete(
  "/:accountId",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    // get user that needs to be deleted
    const accountToBeDeleted = req.params.accountId;
    // check if the user is head of household
    const isHeadOfHouseHold = req.user.toJSON().headOfHouseHold;
    // we can delete
    if (isHeadOfHouseHold) {
      try {
        //delete the user
        await Account.destroy({ where: { id: accountToBeDeleted } });
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

// add authorizedAccount model
//npx sequelize model:generate --name AuthorizedAccountUser --attributes userId:integer,accountId:integer;
