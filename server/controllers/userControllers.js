import User from "../models/userModel.js";
import expressAsync from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendNodeMail.js";
import emailChangePasswordMail from "../emailTemplates/email-change-password.js";
import { v4 as uuidv4 } from "uuid";
import emailChangePasswordSuccess from "../emailTemplates/emailChangePasswordSuccess.js";

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
      userGuid: user.userGuid,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
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
      userGuid: user.userGuid,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
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

/**
 * @desc:  Check Email User
 * @route: POST /api/users/email-check/account
 * @acess: Private
 */
const checkEmail = expressAsync(async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const idPassword = uuidv4();
  const agent = await User.findOne({
    email: emailAddress,
  });

  if (agent.length === 0) {
    throw new Error("No email address registed.");
  } else {
    if (agent.length === 0) {
      throw new Error("No email address registed.");
    } else {
      agent.idPassword = idPassword;
      let sendHTMLEmail;
      let mailSubject = "Change Password Confirmation";
      let mailAttachments = [];
      let mailContent = emailChangePasswordMail(
        agent?.email,
        agent?.name,
        idPassword
      );
      try {
        sendHTMLEmail = sendEmail(
          agent?.email,
          mailSubject,
          mailContent,
          mailAttachments
        )
          .then((request, response) => {
            agent.save();
            res.status(201).json("Ok");
            response?.send(response?.message);
          })
          .catch((error) => {
            res.status(500);
            console.log(error);
            throw new Error("Error occured in submission.");
          });
      } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Error occured in submission.");
      }
    }
  }
});

/**
 * @desc:  Change Password
 * @route: POST /api/users/change-password/account
 * @acess: Private
 */
const changePassword = expressAsync(async (req, res) => {
  const idPassword = req.body.passwordId;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const agent = await User.findOne({
    idPassword: idPassword,
  });

  if (password !== confirmPassword) {
    throw new Error("Invalid Password Registered");
  } else if (!agent) {
    throw new Error("Invalid Password Registered");
  } else {
    let sendHTMLEmail;
    let mailSubject = "CFS Password has been updated";
    let mailAttachments = [];
    let mailContent = emailChangePasswordSuccess(
      agent?.email,
      idPassword,
      agent?.name
    );
    try {
      agent.password = password;
      // agent.idPassword = undefined;

      sendHTMLEmail = sendEmail(
        agent?.email,
        mailSubject,
        mailContent,
        mailAttachments
      )
        .then((request, response) => {
          res.status(201).json("Ok");
          agent.save();
          response?.send(response.message);
        })
        .catch((error) => {
          res.status(500);
          console.log(error);
          throw new Error("Error occured in submission.");
        });
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new Error("Error occured in submission.");
    }
  }
});

/**
 * @desc:  Check user is exist
 * @route: GET /api/users/profile
 * @acess: Private
 */
const getCheckUserId = expressAsync(async (req, res) => {
  try {
    const user = await User.findOne({ userGuid: req.params.userGuid });

    if (!user) {
      res.status(401).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  getAllUsers,
  deleteUser,
  checkEmail,
  changePassword,
  getCheckUserId,
};
