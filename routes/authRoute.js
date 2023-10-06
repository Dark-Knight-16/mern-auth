"use strict";

import express from "express";
import {
  signup,
  signin,
  google,
  profile,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);
authRouter.post("/sign-in", signin);
authRouter.post("/google", google);
authRouter.put("/profile", profile);

export default authRouter;
