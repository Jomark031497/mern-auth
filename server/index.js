const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to database");
  }
);

app.use("/auth", require("./routers/userRoutes"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
