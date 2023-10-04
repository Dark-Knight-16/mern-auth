"use strict";
import User from "../models/userModel.js";
import handleError from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// sign up
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const {password:hash, ...rest} = user._doc;
    const token = createToken(user._id);
    res
      .cookie("jwt", token, { secure: true, maxAge: maxAge * 1000 })
      .status(201)
      .json({
        success: true,
        user: rest,
        message: "User created successfully !",
      });
  } catch (err) {
    const error = handleError(err);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// sign in
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res
      .cookie("jwt", token, { secure: true, maxAge: maxAge * 1000 })
      .status(200)
      .json({
        success: true,
        user: user,
        message: "User successfully logged in !",
      });
  } catch (err) {
    const error = handleError(err);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// google
const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('username email profilePicture');

    if (user) {
      const token = createToken(user._id);
      res
        .cookie("access_token", token, { secure: true, maxAge: maxAge * 1000 })
        .status(200)
        .json({
          success: true,
          user: user,
          message: "User successfully logged in !",
        });
    } else {
      const generateRandomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(generateRandomPassword, salt);

      const newUser = await User.create({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hash,
        profilePicture: req.body.photo,
      });
      const {password, ...rest} = newUser._doc;
      const token = createToken(newUser._id);
      res
        .cookie("access_token", token, { secure: true, maxAge: maxAge * 1000 })
        .status(201)
        .json({
          success: true,
          user: rest,
          message: "User created successfully !",
        });
    }
  } catch (err) {
    const error = handleError(err);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export { signup, signin, google };
