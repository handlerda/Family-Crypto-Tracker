const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../../utils/auth");
const { User } = require("../../../db/models");
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

// check if user has a zaboId

router.post(
  "/",
  //   requireAuth,
  //isDemoUser,
  asyncHandler(async (req, res, next) => {
    res.json(res.user);
  })
);

module.exports = router;
