const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/auth");
const { showProducts } = require("../controllers/productController");

// DESC:    REGISTER A USER
// METHOD:  POST
// ACCESS:  PUBLIC
router.get("/", isAuthenticated, showProducts);

module.exports = router;
