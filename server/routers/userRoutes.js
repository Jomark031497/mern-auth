const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

// DESC:    REGISTER A USER
// METHOD:  POST
// ACCESS:  PUBLIC
router.post("/register", registerUser);

// DESC:    LOGIN A USER
// METHOD:  POST
// ACCESS:  PRIVATE
router.post("/login", loginUser);

// DESC:    LOGOUT USER
// METHOD:  GET
// ACCESS:  PUBLIC
router.get("/logout", logoutUser);

module.exports = router;
