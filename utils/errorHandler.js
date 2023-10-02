"use strict";

const handleError = (err) => {
  console.log(err);
  console.log(err.message, err.code);

  let message = "";

  // duplicate username
  if (err.code === 11000 && err.keyPattern.username) {
    message = "this username is already taken !";
    return message;
  }

  // duplicate email
  if (err.code === 11000 && err.keyPattern.email) {
    message = "this email is already registered !";
    return message;
  }

  // validation error
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((error) => {
      message = error.properties.message;
    });
  }

  return message;
};

export default handleError;
