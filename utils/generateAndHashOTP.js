import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generateAndHashOTP = async () => {
  // const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otp = crypto.randomInt(100000, 999999).toString();

  const hashedOtp = await bcrypt.hash(otp, 10);

  return { otp, hashedOtp };
};
