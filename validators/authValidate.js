const { body } = require("express-validator");

exports.signupValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];
