"use strict";

import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// update user
const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      success: false,
      message: "You can only update your account ! ",
    });
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      }
    },
    {new: true}
    )

    const {password, ...rest} = updatedUser._doc;
    res.status(200).json({
      success: true,
      user: rest,
      message: 'User updated successfully !'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Empty input fields !',
    });
    console.log(err)
  }
};


// delete user
const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id){
    return res.status(401).json({
      success: false,
      message: "You can only delete your account ! ",
    });
  }

  try{
await User.findByIdAndDelete(req.params.id)
res.status(200).json({
  success: true,
  message: 'User has been deleted !'
})
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: 'User not deleted !',
    });
    console.log(err)
  }
}

export { updateUser, deleteUser };
