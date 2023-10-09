"use strict";

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

//   console.log(token)

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next();

    req.user = user;
    next();
  });
};
