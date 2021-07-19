const express = require("express");
const asyncHandler = require("express-async-handler");
const { restoreUser } = require("../../utils/auth");
const router = express.Router();
const Zabo = require("zabo-sdk-js");

router.get(
  // send
  "/account/:account",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    //get zabo info
    console.log(req);
    const zaboAccountId = req.params.account;

    const zaboUserId = req.user.zaboId;
    console.log(`here is the zaboUserId`, zaboUserId);
    //init zabo
    const zabo = await Zabo.init({
      apiKey: process.env.ZABO_PUBLIC_KEY,
      secretKey: process.env.ZABO_PRIVATE_KEY,
      env: "sandbox",
    });
    const transactions = await zabo.transactions.getList({
      userId: zaboUserId,
      accountId: zaboAccountId,
    });
    res.json(transactions);
  })
);

module.exports = router;
