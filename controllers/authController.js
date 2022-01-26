const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

const register = async (req, res) => {
  console.log("Recieved Register request with body: ");
  console.log(req.body);
  //   console.log("REQUEST: ", req);
  // Lets validate
  const { error } = registerValidation(req.body);

  if (error) {
    // console.log("ERROR: ", error);
    return res.status(400).send({ message: error.details[0].message });
  }
  // if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists)
    return res.status(400).send({ message: "Username already exists" });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  console.log("Login request found with body: ");
  console.log(req.body);
  // Lets validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Checking if the username or password is correct
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).send({ message: "Username or password is wrong" });
  // Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({ message: "Username or password is wrong" });

  //   Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_KEY, {
    expiresIn: "10m",
    algorithm: "HS256",
  });
  res.header("access-token", token).send({ token: token, username: user.username, id: user._id, role: user.role });
};

module.exports = {
  register,
  login,
};
