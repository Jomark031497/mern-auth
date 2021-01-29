const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const { urlencoded } = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());

// connect to mongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to database");
  }
);

// routes
app.use("/auth", userRoutes);
app.use("/products", productRoutes);

// connect to server
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
