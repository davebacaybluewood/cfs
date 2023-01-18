import User from "../models/userModel.js";
import expressAsync from "express-async-handler";
import generateToken from "../utils/generateToken.js";

/**
 * @desc:  Auth the user & get token
 * @route: POST /api/users/login
 * @acess: Public
 */
const authUser = expressAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials.");
  }
});

/**
 * @desc:  Register a new user
 * @route: POST /api/users/
 * @acess: Private
 */
const registerUser = expressAsync(async (req, res) => {
  const { email, password, name } = req.body;
  const emailIsExist = await User.findOne({ email });

  if (emailIsExist) {
    res.status(400);
    throw new Error("Email already exists.");
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

/**
 * @desc:  Get user profile
 * @route: GET /api/users/profile
 * @acess: Private
 */
const getUserProfile = expressAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found.");
  }
});

/**
 * @desc:  Get all Users
 * @route: GET /api/users/
 * @acess: Private
 */
const getAllUsers = expressAsync(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found.");
  }
});

/**
 * @desc:  DELETE User
 * @route: DELETE /api/users/:id
 * @acess: Private
 */
const deleteUser = expressAsync(async (req, res) => {
  const event = await User.deleteOne({
    _id: req.params.id,
  });

  if (event) {
    res.json({ message: "User removed." });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser, getAllUsers, deleteUser };
