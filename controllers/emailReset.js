// const { user } = require("../models/userSchema");
// const { emailJoi } = require("../validators/joiValidation");
// const { generateToken, sendEmail } = require("../services/utility");

// const email = async (req, res) => {
//   const { error, value } = emailJoi(req.body);
//   if (error) {
//     return res.status(401).json({ message: error.message });
//   }

//   try {
//     const existingUser = await user.findOne({ email: value.email });
//     if (existingUser) {
//       // Generate and save a unique token for password reset
//       const resetToken = generateToken();
//       existingUser.resetToken = resetToken; // save the reset token and expiry in the database
//       existingUser.resetTokenExpiry = Date.now() + 3600000; // Token expiration time (1 hour)
//       await existingUser.save();

//       const resetLink = `http://yourwebsite.com/reset-password?token=${resetToken}&email=${encodeURIComponent(
//         existingUser.email
//       )}`;
//       const emailBody = `Click on the following link to reset your password: ${resetLink}`;
//       sendEmail(existingUser.email, "Password Reset", emailBody); // You need to implement this function

//       return res.status(200).json({
//         exist: true,
//         message: "Password reset link sent to your email",
//       });
//     } else {
//       return res.status(200).json({ exist: false, message: "Email not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = email;

const { user } = require("../models/userSchema");
const { emailJoi } = require("../validators/joiValidation");
const { generateToken, sendEmail } = require("../services/utility");

exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);

  const { error, value } = emailJoi(requestBody);
  if (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: error.message }),
    };
  }

  try {
    const existingUser = await user.findOne({ email: value.email });
    if (existingUser) {
      // Generate and save a unique token for password reset
      const resetToken = generateToken();
      existingUser.resetToken = resetToken; // save the reset token and expiry in the database
      existingUser.resetTokenExpiry = Date.now() + 3600000; // Token expiration time (1 hour)
      await existingUser.save();

      const resetLink = `http://yourwebsite.com/reset-password?token=${resetToken}&email=${encodeURIComponent(
        existingUser.email
      )}`;
      const emailBody = `Click on the following link to reset your password: ${resetLink}`;
      await sendEmail(existingUser.email, "Password Reset", emailBody); // You need to implement this function

      return {
        statusCode: 200,
        body: JSON.stringify({
          exist: true,
          message: "Password reset link sent to your email",
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ exist: false, message: "Email not found" }),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server Error" }),
    };
  }
};
module.exports = exports;
