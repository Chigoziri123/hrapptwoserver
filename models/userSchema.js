const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports.user = mongoose.model("User", userSchema);

// Function to create a new User in the database
