"use strict";

import express from "express";
import { updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/authUser.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.post("/delete/:id", verifyToken, deleteUser);

export default userRouter;
