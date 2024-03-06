// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { user } = require("../models/userSchema");

// const verifyToken = async (req, res, next) => {
//   const token = req.cookies.hrappUserToken;

//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
//       if (error || !decoded) {
//         req.user = null;
//         res
//           .status(401)
//           .json({ message: "Access denied. You must login first." });
//       } else {
//         const userID = await user.findById(decoded._id);
//         req.user = userID._id;
//         req.email = userID.email;
//         next();
//       }
//     });
//   } else {
//     req.user = null;
//     res.status(401).json({ message: "Access denied. You must login first." });
//   }
// };

// module.exports = verifyToken;

// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// // require("dotenv").config();
// const { user } = require("../models/userSchema");

// dotenv.config();

// const verifyToken = async (req, res, next) => {
//   const token = req.cookies.hrappUserToken;

//   try {
//     if (!token) {
//       res.status(403).json({ message: "You are not logged in!" });
//     } else {
//       const decoded = await jwt.verify(token, process.env.SECRET_KEY);
//       if (!decoded) {
//         res.status(401).json({ you: "shall not pass!" });
//       } else {
//         const userID = await user.findById(decoded.id);
//         if (!userID) {
//           res.status(400).json({ message: "No such user found." });
//         } else {
//           req.user = userID._id;
//           req.email = userID.email;
//           next();
//         }
//       }
//     }
//   } catch (error) {
//     req.user = null;
//     res.status(400).json({ message: error.message });
//   }

// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const { user } = require("../models/userSchema");

const verifyToken = async (event, context) => {
  const token = event.headers.Authorization;

  try {
    if (!token) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "You are not logged in!" }),
      };
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        return {
          statusCode: 401,
          body: JSON.stringify({ you: "shall not pass!" }),
        };
      } else {
        const userID = await user.findById(decoded.id);
        if (!userID) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "No such user found." }),
          };
        } else {
          context.user = userID._id;
          context.email = userID.email;
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Token verified successfully" }),
          };
        }
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = verifyToken;
