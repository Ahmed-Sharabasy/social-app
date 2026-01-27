import User from "../models/usersModel.js";
import { generateAndHashOTP } from "../utils/generateAndHashOTP.js";
import appError from "../utils/AppError.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// create , send and save OTP
export const getOtp = async (req, res, next) => {
  const { email } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return next(new appError("User not found", 404));
  }
  // generate OTP
  const { otp, hashedOtp } = await generateAndHashOTP();
  console.log(otp, hashedOtp);

  // send OTP to email
  await sendEmail({
    to: user.email,
    subject: "your OTP Code",
    html: `<h1>OTP: ${otp}</h1>`,
    text: `OTP: ${otp}`,
  });

  // save hashed OTP to DB
  user.otp = hashedOtp;
  // await user.save({ validateBeforeSave: false });
  await user.save();

  res.status(200).json({
    status: "success",
    message: "OTP sent to email",
  });
};

// validateOtp
const validateOtp = async (inputOtp, hashedOtp) => {
  console.log(inputOtp, hashedOtp);
  const isOtpValid = await bcrypt.compare(inputOtp, hashedOtp);
  return isOtpValid;
};

// verifyOtp  //todo add reason reset password
export const verifyOtp = async (req, res, next) => {
  let message;
  const { reason, otp, email } = req.body;

  const user = await User.findOne({ email }).select("+otp");

  if (!user) {
    return next(new appError("User not found", 404));
  }

  if (!user.otp) {
    return next(new appError("No OTP found, please request a new one", 400));
  }

  const isOtpValid = await validateOtp(otp, user.otp);

  if (!isOtpValid) {
    return next(new appError("Invalid OTP", 400));
  }

  if (reason === "verifyEmail") {
    user.isVerified = true;
    message = "Email verified successfully";
  } else if (reason === "resetPassword") {
    message = "OTP verified, you can now reset your password";
    user.canResetPassword = true;
  }

  // clear OTP
  user.otp = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message,
  });
};

// email password name and avatar
export const signUp = async (req, res, next) => {
  const { email, name, password, avatar } = req.body;
  console.log(email, name, password, avatar);

  const newUser = await User.create({
    email,
    name,
    password,
    avatar,
  });

  res.status(200).json({
    data: {
      newUser,
    },
  });
};

//todo edit later
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new appError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user || !(await user.comparePassword(password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  // we mustnt use await instaed create fun to sign token
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });

  // //it must be a middleware in route to keep know the req information
  // //save the user data into req to user it any where you need it // like photoUpload
  // req.user = user;

  res.status(200).json({
    token,
    status: "success",
    message: "User signed in successfully",
    data: { user },
  });
};

export const resetPassword = async (req, res, next) => {
  // get user from email
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+canResetPassword");

  if (!user || !user.canResetPassword) {
    return next(
      new appError(
        "User not found or you don't have permission to reset password",
        404,
      ),
    );
  }

  // update password
  user.password = password;
  user.canResetPassword = false;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
};
