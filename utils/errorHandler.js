"use strict";

const handleError = (err) => {
  console.log(err);
  console.log(err.message, err.code);

  const errors = { username: "", email: "", password: "" };

  // duplicate username
  if (err.code === 11000 && err.keyPattern.username) {
    errors.username = "this username is already taken !";
    return errors;
  }

  // duplicate email
  if (err.code === 11000 && err.keyPattern.email) {
    errors.email = "this email is already registered !";
    return errors;
  }

  // validation error
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }

  return errors;
};

export default handleError;
