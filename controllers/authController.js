"use strict";
import User from "../models/userModel.js";
import handleError from "../utils/errorHandler.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({
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

export { signup };
