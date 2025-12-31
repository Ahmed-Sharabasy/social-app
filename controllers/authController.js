import User from "../models/usersModel.js";
import { generateAndHashOTP } from "../utils/generateAndHashOTP.js";
import appError from "../utils/appError.js";
import sendEmail from "../utils/sendEmail.js";

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

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
};
