const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
const registerUser = async (req, res) => {
  try {
    const { email, password, verifyPassword } = req.body;

    // validations
    if (!email || !password || !verifyPassword)
      return res.status(400).json({ msg: "please enter all required fields" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "password should have a length of 6 characters" });

    if (password !== verifyPassword)
      return res.status(400).json({ msg: "password do not match" });

    // check if user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
    });

    // save the user
    const savedUser = await newUser.save();

    // sign the token
    const token = jwt.sign(
      {
        users: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in cookie
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "please enter all required fields" });

    // check if user already exists in database
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ msg: "Wrong email or password" });

    // check if password is the same as decrypted password
    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!hashedPassword)
      return res.status(401).json({ msg: "please enter all required fields" });

    // sign the token
    const token = jwt.sign(
      {
        users: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in cookie
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//logout the user
const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
