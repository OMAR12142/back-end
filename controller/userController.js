import asyncHandler from "../midd/asyncHandler.js";
import genrateToken from "../utils/genrateToken.js";
import User from "./../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// @desc    auth and get token
// @route   post /api/users/login

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {

genrateToken(res,user._id)

    res.status(200).json({  
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc    register and get token
// @route   post /api/users

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,  
    password,
  });

  if (user) {
    genrateToken(res,user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    logout and clear token
// @route   post /api/users/logout

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "logged out successfully" });
});

// @desc    get user profile
// @route   get /api/users/Profile

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id)

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else {
            res.status(404);
    throw new Error(" user notfound");

    }
});

// @desc    updateUserProfile
// @route   get /api/users/Profile

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    get users profile
// @route   put /api/users/profile

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);


});

// @desc    get user by id
// @route   put /api/users/:id

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    delete user profile
// @route   delete /api/users/:id

const deleteUserProfile = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.id)

if(user){
  if(user.isAdmin){
    res.status(400)
    throw new Error('can not delete admin user')
  }
    await user.deleteOne({_id:user._id})
    res.json({message:'User removed'})
}else{
    res.status(404)
    throw new Error('User not found') 

}


});

// @desc    update user
// @route   put /api/users/:id

const updateUser = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.id);
if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =Boolean(req.body.isAdmin);
    const updatedUser = await user.save(); 
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
} else {
    res.status(404);
    throw new Error("User not found");  
}  

});

export {
  authUser,
  deleteUserProfile,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
};
