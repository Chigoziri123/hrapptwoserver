const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  // agentId: {
  //   type: mongoose.Schema.Types.objectId,
  //   ref: "user",
  // },
  fullName: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  dob: {
    type: Date,
    required: true,
  },
  selectedGender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  lga: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    // match: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\([0-9]{1,4}\)?[0-9.-]+[0-9]$/,
  },
  nin: {
    type: String,
    required: true,
  },
  certificateFile: {
    type: String,
    required: true,
  },
  selectedHighestQualification: {
    type: String,
    enum: ["SSCE", "Bachelor's Degree", "Master's Degree", "PhD"],
    required: true,
  },
  selectedAvailableIdCard: {
    type: String,
    enum: [
      "Passport",
      "Driver's License",
      "National ID Card",
      "Permanent Voter's Card",
    ],
    required: true,
  },
  idCardFront: {
    type: String,
    required: true,
  },
  idCardBack: {
    type: String,
    required: true,
  },
  selectedPreferredCourse: {
    type: String,
    enum: [
      "Software Development/Testing",
      "Data Analysis",
      "Digital Marketing",
      "UI/UX Design",
      "Machine Learning/Automation",
    ],
    required: true,
  },
  selectedHearAboutUs: {
    type: String,
    enum: ["Social Media", "Internet Ad", "Friend/Colleague", "Other Means"],
  },
  isTermsChecked: {
    type: Boolean,
    required: true,
  },
});

module.exports.registrationForm = mongoose.model(
  "registration",
  registrationSchema
);
