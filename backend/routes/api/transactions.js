const express = require("express");
const asyncHandler = require("express-async-handler");
const { restoreUser } = require("../../utils/auth");
const router = express.Router();
const Zabo = require("zabo-sdk-js");
const { Account, User } = require("./../../db/models");
router.get(
  // send
  "/account/:account",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    //get zabo info
    const zaboAccountId = req.params.account;
    //get the accountId
    const account = await Account.findOne({
      where: {
        zaboId: zaboAccountId,
      },
    });
    // get user associated with account
    const user = await User.findOne({
      where: {
        id: account.userId,
      },
    });
    const zabo = await Zabo.init({
      apiKey: process.env.ZABO_PUBLIC_KEY,
      secretKey: process.env.ZABO_PRIVATE_KEY,
      env: "sandbox",
    });
    const transactions = await zabo.transactions.getList({
      userId: user.zaboId,
      accountId: zaboAccountId,
    });
    res.json(transactions);
  })
);

module.exports = router;
