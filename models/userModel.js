"use strict";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required !"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required !"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Enter a valid email !"]
    },
    password: {
      type: String,
      required: [true, "Password is required !"],
      minLength: [6, "Minimum password length is 6 characters !"]
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

userSchema.statics.login = async function(email, password){
  if(email){
    if(password){
      const validUser = await this.findOne({email});

      if(validUser){
        const auth =  await bcrypt.compare(password, validUser.password)
        if(auth){
          const user = await this.findOne({_id: validUser._id}).select('username email');
          return user
        }
        throw Error('incorrect password')
      }
      throw Error('incorrect email')
    }
    throw Error('empty password')
  }
  throw Error('empty email')
}

const User = mongoose.model("User", userSchema);

export default User;
