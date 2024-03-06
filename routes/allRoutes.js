const express = require("express");
const signUpController = require("../controllers/signUp");
const loginController = require("../controllers/login");
const emailController = require("../controllers/emailReset");
const resetPasswordController = require("../controllers/resetPassword");
const registrationFormController = require("../controllers/registrationForm");

const route = express.Router();

route.post("/api/users", signUpController.handler);
route.post("/api/login", loginController.handler);
route.post("/api/email", emailController.handler);
route.put("/api/resetPassword", resetPasswordController.handler);
route.post("/api/registration", registrationFormController.handler);

module.exports = route;
