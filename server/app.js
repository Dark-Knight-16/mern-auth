"use strict";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routes/userRoute.js";
import authRouter from "../routes/authRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json())

// database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("database connected...");
}

// routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// listener
app.listen(PORT, () => {
  console.log("server is running....");
});
