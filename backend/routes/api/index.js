// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const accountsRouter = require("./accounts");

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// session handles auth
router.use("/session", sessionRouter);
// user handles user related actions
router.use("/users", usersRouter);
// wallet handles most Zabo related actions
router.use("/accounts", accountsRouter);

module.exports = router;
