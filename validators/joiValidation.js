const Joi = require("joi");

const loginJoi = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .trim()
      .lowercase()
      .messages({
        "string.email": `Invalid email, for instance
        'example@gmail.com'`,
        "any.required": `Email is required`,
        "string.empty": `Email cannot be empty field`,
      }),
    password: Joi.string()
      .trim()
      .min(8)
      .required()
      .messages({
        "any.required": `Password field is required`,
        "string.min": `Password length must at least be
         8 characters long`,
      }),
  });

  return schema.validate(data);
};

const signupJoi = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      .messages({
        "string.email": `Invalid email format, use this 
         format  example@domain.com`,
        "any.required": `Field can not be left blank`,
        "string.empty": `Field can not be empty`,
      }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(
        new RegExp(/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/)
      )
      .messages({
        "string.pattern.base": `Password must contain atleast one capital letter and one special characters`,
        "any.required": `Password field is required`,
        "string.min": `Password must be minimum 8 characters`,
      }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.require": "Confirm Password is required",
      "any.only": "Passwords do not match",
    }),
  });
  return schema.validate(data);
};

const resetJoi = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string()
      .required()
      .min(8)
      .pattern(
        new RegExp(/(?=.*[A-Z])[a-zA-Z0-9]+[\#\@\$\%\&\*\(\)\>\<\~\{\}]+/)
      )
      .messages({
        "string.pattern.base": `New password must contain atleast one capital letter and one special characters`,
        "any.required": `New password field is required`,
        "string.min": `New password length must at least be 8 characters long`,
      }),
    confirmnewPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.required": "Confirm password is required",
        "any.only": "New passwords does not match",
      }),
  });
  return schema.validate(data);
};

const emailJoi = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      // .exist(user, { field: "email" })
      .messages({
        "string.email": `Invalid email format, use this 
         format  example@domain.com`,
        "any.required": `Field can not be left blank`,
        "string.empty": `Field can not be empty`,
        "object.exist": "User not found with this email",
      }),
  });
  return schema.validate(data);
};

const registrationJoi = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().trim().message({
      "string.base": `"Full name" should be a "text"`,
      "string.empty": `"Full name" cannot be empty`,
      "string.required": `"Full name" is required`,
    }),
    dob: Joi.number()
      .integer()
      .required()
      .trim()
      .format("MM / DD / YYYY")
      .positive()
      .min(1800)
      .max(2060),
    selectedGender: Joi.string()
      .required()
      .valid("Male", "Female")
      .trim()
      .message({
        "string.base": `"Select Gender" must be a string`,
        "string.empty": `"Select Gender" cannot be empty`,
        "string.required": `"Select Gender" is required`,
      }),
    address: Joi.string().required().alphanum().trim().message({
      "string.base": `"Address" should be a "text"`,
      "string.empty": `"Address" cannot be empty`,
      "string.required": `"Address" is required`,
    }),
    state: Joi.string().required().trim().message({
      "string.base": `"State" should be a "text"`,
      "string.empty": `"State" cannot be empty`,
      "string.required": `"State" is required`,
    }),
    lga: Joi.string().required().trim().message({
      "string.base": `"LGA" should be a "text"`,
      "string.empty": `"LGA" cannot be empty`,
      "any.required": `"LGA" is required`,
    }),
    phoneNumber: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp(/^((\+234)+|0)[7-9]{1}[0-9]{9}$/))
      .message({
        "string.pattern.base": `Invalid phone number`,
        "any.required": `phone number must be provided`,
      }),
    nin: Joi.string().required().alphanum().trim().message({
      "string.base": `"NIN" should only contain alphabets and numbers`,
      "string.empty": `"NIN" can't be empty`,
      "string.required": `"NIN" is required`,
    }),
    certificateFile: Joi.string().uri().trim(),
    selectedHighestQualification: Joi.string()
      .required()
      .trim()
      .valid("SSCE", "Bachelor's Degree", "Master's Degree", "PhD")
      .message({
        "any.only": `"Educational Qualification" must be one of the following: SSCE, Bachelor's Degree, Master's Degree, PhD`,
        "string.empty": `Educational Qualification must be selected`,
      }),
    selectedAvailableIdCard: Joi.string()
      .uri()
      .trim()
      .valid(
        "Passport",
        "Driver's License",
        "National ID Card",
        "Permanent Voter's Card"
      ),
    idCardFront: Joi.string().uri().trim(),
    idCardBack: Joi.string().uri().trim(),
    selectedPreferredCourse: Joi.string()
      .required()
      .trim()
      .valid(
        "Software Development/Testing",
        "Data Analysis",
        "Digital Marketing",
        "UI/UX Design",
        "Machine Learning/Automation"
      ),
    selectedHearAboutUs: Joi.string()
      .required()
      .trim()
      .valid("Social Media", "Internet Ad", "Friend/Colleague", "Other Means"),
    isTermsChecked: Joi.boolean().required().message({
      "any.only": `"Is Terms Checked?" field must be checked or unchecked`,
    }),
  });
  return schema.validate(data);
};

module.exports = {
  loginJoi,
  signupJoi,
  resetJoi,
  emailJoi,
  registrationJoi,
};
