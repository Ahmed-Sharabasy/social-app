import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String, // store URL or filename
      default: "default.jpg",
    },

    name: {
      type: String,
    },

    bio: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      select: false,
    },

    otp: {
      type: String,
      select: false,
    },

    canResetPassword: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

// 🔒 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log(this.password, candidatePassword);
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
