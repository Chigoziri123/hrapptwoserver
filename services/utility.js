const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const sendEmail = (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "isaiahgabbz@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "isaiahgabbz@gmail.com",
    to,
    subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  generateToken,
  sendEmail,
};
