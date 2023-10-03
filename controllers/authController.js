"use strict";
import User from "../models/userModel.js";
import handleError from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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
    const token = createToken(user._id);
    res.cookie("jwt", token, { secure: true, maxAge: maxAge * 1000 }).status(201).json({
      success: true,
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
    res.cookie("jwt", token, { secure: true, maxAge: maxAge * 1000 }).status(200).json({
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

export { signup, signin };
