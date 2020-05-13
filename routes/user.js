const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("express-async-errors");

router.get("/", (req, res, next) =>  {
  res.status(200).json({message: "WELCOME!"});
});

router.post("/register", async (req, res, next) => {
  const { userName, password } = req.body;
  const unique = await User.findOne({ userName });
  if (unique) throw new Error("userName is already exist!");
  const user = new User({ userName, password });
  await user.save();
  res.status(200).json({
    user: user,
  });
});
router.post("/login", async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) throw new Error("userName or passowrd not valid");
  const match = await user.comparePassword(password);
  if (!match) throw new Error("userName or passowrd not valid");
  const token = await user.generateToken();
  res.json({
    message: "Thanks for your login",
    token,
  });
});

module.exports = router;
