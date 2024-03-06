// const { registration } = require("../models/registrationSchema");
// const { registrationJoi } = require("../validators/joiValidation");

// const registerUser = async (req, res) => {
//   try {
//     // Validate the request body using Joi schema
//     const { error } = registrationJoi.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // const { certificateFile, idCard } = req.files;

//     const newRegistration = new registration({
//       fullName: req.body.fullName,
//       dob: req.body.dob,
//       selectedGender: req.body.selectedGender,
//       address: req.body.address,
//       state: req.body.state,
//       lga: req.body.lga,
//       phoneNumber: req.body.phoneNumber,
//       nin: req.body.nin,
//       // certificateFile: certificateFile[0].path,
//       selectedHighestQualification: req.body.selectedHighestQualification,
//       selectedAvailableIdCard: req.body.selectedAvailableIdCard,
//       // idCardFront: idCard[0].path,
//        // idCardBack: idCard[0].path,
//       selectedPreferredCourse: req.body.selectedPreferredCourse,
//       selectedHearAboutUs: req.body.selectedHearAboutUs,
//       // isTermsChecked: req.body.isTermsChecked

//     });

//     await newRegistration.save();

//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = registerUser;

const { registration } = require("../models/registrationSchema");
const { registrationJoi } = require("../validators/joiValidation");

exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);

  try {
    // Validate the request body using Joi schema
    const { error } = registrationJoi.validate(requestBody);
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.details[0].message }),
      };
    }

    const newRegistration = new registration({
      fullName: requestBody.fullName,
      dob: requestBody.dob,
      selectedGender: requestBody.selectedGender,
      address: requestBody.address,
      state: requestBody.state,
      lga: requestBody.lga,
      phoneNumber: requestBody.phoneNumber,
      nin: requestBody.nin,
      selectedHighestQualification: requestBody.selectedHighestQualification,
      selectedAvailableIdCard: requestBody.selectedAvailableIdCard,
      selectedPreferredCourse: requestBody.selectedPreferredCourse,
      selectedHearAboutUs: requestBody.selectedHearAboutUs,
    });

    await newRegistration.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Registration successful" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
module.exports = exports;
