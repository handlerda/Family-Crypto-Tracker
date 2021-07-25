const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../../utils/auth");
const { User, Account, AuthorizedAccountUser } = require("../../../db/models");
const Zabo = require("zabo-sdk-js");
const { Op } = require("sequelize");
const router = express.Router();

//standardize the account return payload
function filterBalance(zaboAccountObj) {
  return zaboAccountObj.balances.filter((balance) => {
    return balance.ticker !== "XYZ" && balance.ticker !== "RANDOMZABO";
  });
}
function returnedAccounts(
  zaboAccountObj,
  userId,
  firstName,
  users = null,
  crypfamId,
  balances
) {
  zaboAccountObj.userId = userId;
  zaboAccountObj.firstName = firstName;
  zaboAccountObj.accessibleUsers = users;
  zaboAccountObj.crypfamId = crypfamId;
  zaboAccountObj.balances = balances;

  return zaboAccountObj;
}

// middleware
// check if the user is in zabo
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
      const { id, familyId, headOfHouseHold, firstName, lastName } =
        req.user.dataValues;
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
      //allow current user to be an active user
      const users = [{ id, firstName, lastName }];
      const accounts = returnedAccounts(
        zaboAccountObject,
        id,
        firstName,
        users,
        newAccount.id,
        filterBalance(zaboAccountObject)
      );

      res.status = 201;
      res.json({
        ...accounts,
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
        const zaboAccount = await Account.findByPk(account.id, {
          include: User,
        });

        const zaboAccountPayload = await zabo.users.getAccount({
          userId: zaboAccount.User.zaboId,
          accountId: zaboAccount.zaboId,
        });

        // get a list of users who can access
        const usersWhoCanAccess = await AuthorizedAccountUser.findAll({
          where: { accountId: account.id },
        });
        // loop over those users who can access
        // need to include the user having issues here
        const userIds = usersWhoCanAccess.map((user) => {
          // call a sequelize query here to get users.
          // there may be a better way to do it
          return user.userId;
        });

        // THIS SHOULD NOT BE ANOTHER DATABASE CALL IMPROVE IMPROVE IMPROVE
        const users = await User.findAll({
          where: {
            id: {
              [Op.in]: userIds,
            },
          },
        });

        //structure object for json payload
        const userId = zaboAccount.User.id;
        const firstName = zaboAccount.User.firstName;
        const accountPayload = returnedAccounts(
          zaboAccountPayload,
          userId,
          firstName,
          users,
          account.id,
          filterBalance(zaboAccountPayload)
        );
        return accountPayload;
      })
    );

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
    const accountToBeDeletedId = req.params.accountId;
    // check if the user is head of household
    const isHeadOfHouseHold = req.user.headOfHouseHold;
    const userId = req.user.id;

    // get accountToBeDeleted
    const accountToBeDeleted = await Account.findOne({
      where: { zaboId: accountToBeDeletedId },
      include: User,
    });

    // we can delete
    if (isHeadOfHouseHold || accountToBeDeleted.userId === userId) {
      try {
        // Initialize Zabo Object
        const zabo = await Zabo.init({
          apiKey: process.env.ZABO_PUBLIC_KEY,
          secretKey: process.env.ZABO_PRIVATE_KEY,
          env: "sandbox",
        });

        // delete the zabo account
        await zabo.users.removeAccount({
          userId: accountToBeDeleted.User.zaboId,
          accountId: accountToBeDeletedId,
        });

        // query all references from the junction table
        const accountsOnJoinTable = await AuthorizedAccountUser.findAll({
          where: {
            accountId: accountToBeDeleted.id, // gets
          },
        });
        // remove all references from the joins table
        await Promise.all(
          accountsOnJoinTable.map((account) => {
            account.destroy();
          })
        );
        // delete the zaboAccount from the database
        await accountToBeDeleted.destroy();
        // return the payload
        res.json({
          deleted: true,
          accountId: accountToBeDeletedId,
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
        "You are not the head of household or do not own this account. The account can not be deleted"
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

router.patch(
  `/`,
  restoreUser,
  asyncHandler(async (req, res, next) => {
    //promise all
    const items = req.body;
    console.log(items);
    try {
      await Promise.all(
        items.map((item) => {
          // do work
          if (item.status === "add") {
            // add to the db
            AuthorizedAccountUser.create({
              accountId: item.accountId,
              userId: item.userId,
            });
          } else {
            // remove from db
            AuthorizedAccountUser.destroy({
              where: {
                accountId: item.accountId,
                userId: item.userId,
              },
            });
          }
        })
      );
      res.json({
        status: "ok",
      });
    } catch (error) {
      next(error);
    }
  })
);

// account addresses
// query params for address
// tickers [btc, eth, ada] e.t.c
router.get(
  "/addresses/:account/",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const zaboAccountId = req.params.account;
    const tickers = req.query.tickers;
    if (tickers) {
      // split the ticker string as an array
      tickers.split(",");
    }
    const account = await Account.findOne({
      where: {
        zaboId: zaboAccountId,
      },
      include: User,
    });
    const zabo = await Zabo.init({
      apiKey: process.env.ZABO_PUBLIC_KEY,
      secretKey: process.env.ZABO_PRIVATE_KEY,
      env: "sandbox",
    });
    // const wallets = await zabo.transactions.getList({
    //   userId: account.User.zaboId,
    //   accountId: account.zaboId,
    // });
    const addresses = tickers.map(async (ticker) => {
      return await zabo.users.getDepositAddresses({
        userId: account.User.zaboId,
        accountId: account.zaboId,
        ticker: ticker,
      });
    });
    console.log(addresses);
    res.json(addresses);
  })
);

module.exports = router;
