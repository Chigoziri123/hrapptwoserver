// const { user } = require("../models/userSchema");
// const { resetJoi } = require("../validators/joiValidation");
// const bcrypt = require("bcrypt");

// const resetPassword = async (req, res) => {
//   const { error, value } = resetJoi(req.body);
//   if (error) {
//     res.status(400).json({ error: error.message });
//   }
//   try {
//     // to extract token and email from the request query parameters
//     const { token, email } = req.query;
//     // to retrieve the provided email and matching reset token
//     const existingUser = await user.findOne({
//       email: email,
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() },
//     });

//     if (!existingUser) {
//       res.status(404).json({ error: "Invalid or expiired token" });
//     }
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(value.newPassword, salt);
//     existingUser.password = hashedPassword;
//     existingUser.resetToken = undefined; // to clear the token once it has expired so as to prevent misuse of the reset token for multiple password reset attempts
//     existingUser.resetTokenExpiry = undefined;
//     // const newpassword = new user({
//     //   password: hashedPassword,
//     //   confirmnewPassword: value.confirmnewPassword,
//     // });
//     await existingUser.save();

//     res.status(200).json({ message: "New password created" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });

//     if (!res.headersSent) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// };

// module.exports = resetPassword;

const { user } = require("../models/userSchema");
const { resetJoi } = require("../validators/joiValidation");
const bcrypt = require("bcrypt");

exports.handler = async (event) => {
  const queryParams = event.queryStringParameters;
  const requestBody = JSON.parse(event.body);

  const { error, value } = resetJoi(requestBody);
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }

  try {
    // Extract token and email from the request query parameters
    const { token, email } = queryParams;

    // Retrieve the provided email and matching reset token
    const existingUser = await user.findOne({
      email: email,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Invalid or expired token" }),
      };
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(value.newPassword, salt);

    existingUser.password = hashedPassword;
    existingUser.resetToken = undefined; // Clear the token once it has expired
    existingUser.resetTokenExpiry = undefined;

    await existingUser.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "New password created" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
module.exports = exports;
