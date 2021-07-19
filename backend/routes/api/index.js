// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const householdRouter = require("./households.js");
const accountsRouter = require("./accounts");
const usersRouter = require("./users.js");
const transactionsRouter = require("./transactions");

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// session handles auth
router.use("/session", sessionRouter);
// household handles household related actions
router.use("/households", householdRouter);
// user handles user related actions
router.use("/users", usersRouter);
// account handles most account related actions
router.use("/accounts", accountsRouter);
// transaction handles transaction related actions
router.use("/transactions/", transactionsRouter);

module.exports = router;
