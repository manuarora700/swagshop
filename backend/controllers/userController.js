import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc: Auth user - get a Token
// @route: POST /api/user/login
// @access: Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error(`Invalid email or password`);
  }
});

// @desc: Get User profile
// @route: GET /api/user/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(`User not found!`);
  }
});

// @desc: Create User
// @route: POST /api/user
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User already exists with this email address!`);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data!`);
  }
});

export { authUser, getUserProfile, registerUser };
