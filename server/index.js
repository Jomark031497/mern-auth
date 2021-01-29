const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

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
app.use("/auth", require("./routers/userRoutes"));

// connect to server
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
