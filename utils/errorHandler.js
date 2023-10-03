"use strict";

const handleError = (err) => {
  // console.log(err);
  // console.log(err.message, err.code);

  let message = "";

  // email email
  if(err.message === "empty email"){
    message = "Email is required !"
  }

  // empty password
  if(err.message === "empty password"){
    message = "Password is required !"
  }

  // incorrect email
  if(err.message === "incorrect email"){
    message = "Please enter correct email !"
  }

   // incorrect password
   if(err.message === "incorrect password"){
    message = "Please enter correct password !"
  }

  // duplicate username
  if (err.code === 11000 && err.keyPattern.username) {
    message = "This username is already taken !";
    return message;
  }

  // duplicate email
  if (err.code === 11000 && err.keyPattern.email) {
    message = "This email is already registered !";
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
