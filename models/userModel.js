"use strict";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required !"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required !"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "enter a valid email !"]
    },
    password: {
      type: String,
      required: [true, "password is required !"],
      minLength: [6, "minimum password length is 6 characters !"]
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
