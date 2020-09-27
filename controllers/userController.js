const mongoose = require("mongoose");
const User = mongoose.model("User");

var bcrypt = require('bcryptjs');
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 6) throw "Password must be atleast 6 characters long.";

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "User with same email already exits.";

  const user = new User({
    name,
    email,
    password:  bcrypt.hashSync(password, 10)
  });

  await user.save();
  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "user created",
    token,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  const tyr= bcrypt.compareSync(password,user.password)
  if (!user || ! tyr )throw "Email and Password did not match.";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  const name=user.name;
  res.json({
    message: "User logged in successfully!",
    token,
    name,
  });
};