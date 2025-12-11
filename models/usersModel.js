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

    bio: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

// 🔒 Hash password before saving
// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = bcrypt.hash(this.password, 12);
//   next();
// });

// 📌 Compare password during login
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export default User;
