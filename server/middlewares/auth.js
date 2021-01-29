const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  console.log(token);
  try {
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token. Authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { isAuthenticated };
