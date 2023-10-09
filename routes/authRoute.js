"use strict";

import express from "express";
import {
  signup,
  signin,
  google,
  profile,
  signOut
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);
authRouter.post("/sign-in", signin);
authRouter.post("/google", google);
authRouter.put("/profile", profile);
authRouter.put("/sign-out", signOut);


export default authRouter;
