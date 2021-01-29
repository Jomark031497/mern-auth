const { Schema, model } = require("mongoose");

// create User Schema
const userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = model("user", userSchema);

module.exports = User;
