import User from "../models/userModel.js";
import expressAsync from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendNodeMail.js";
import emailChangePasswordMail from "../emailTemplates/email-change-password.js";
import { v4 as uuidv4 } from "uuid";
import emailChangePasswordSuccess from "../emailTemplates/emailChangePasswordSuccess.js";
import {
  AGENT_STATUSES,
  API_RES_FAIL,
  API_RES_OK,
  FREE_30DAYS_TRIAL_ROLES,
  SUBSCRIBER_ROLES,
} from "../constants/constants.js";
import Agent from "../models/agentModel.js";
import backOfficeServices from "../services/backOfficeServices.js";
import { AGENT_ROLES, PROFILE_POSITIONS } from "../constants/constants.js";
import portalSubscriptionServices from "../services/portalSubscriptionServices.js";
import Hierarchy from "../models/hierarchyModel.js";
import generateString from "../utils/generateString.js";

/**
 * @desc:  Auth the user & get token
 * @route: POST /api/users/login
 * @acess: Public
 */
const authUser = expressAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const agent = await Agent.findOne({ emailAddress: email });
    const isValidStatus = agent.status === "ACTIVATED";

    /** Login using CFS credentials */
    const bearerToken = await backOfficeServices.backOfficeLogin();

    /** Get the list of agents from back office */
    const agentsData = await backOfficeServices.backOfficeAgents(bearerToken);
    const agents = agentsData.items || [];
    const accountingSystemEmailAddress = agents?.map(
      (data) => data.emailAddress
    );

    let isNotAdmin = false;

    if (
      agent.position.some(
        (e) =>
          e.value === PROFILE_POSITIONS.SUBSCRIBER.value ||
          e.value === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value
      )
    ) {
      isNotAdmin = true;
    }

    const isFreeTrial = agent.position.some(
      (e) => e.value === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value
    );
    const isSubscriber = agent.position.some(
      (e) => e.value === PROFILE_POSITIONS.SUBSCRIBER.value
    );

    if (accountingSystemEmailAddress.includes(email) && isNotAdmin) {
      agent.roles = [AGENT_ROLES[0]];
      agent.position = [PROFILE_POSITIONS.AGENT];
      agent.previousRole = isFreeTrial
        ? PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value
        : isSubscriber
        ? PROFILE_POSITIONS.SUBSCRIBER.value
        : PROFILE_POSITIONS.AGENT.value;
      user.roles = [AGENT_ROLES[0]];
      user.position = [PROFILE_POSITIONS.AGENT];

      try {
        await user.save();
        await agent.save();
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    const noOfDays = await portalSubscriptionServices.getTrialNumberOfDays(
      agent.userGuid
    );
    const isFreeTrialUser = agent.position.some(
      (e) => e.value === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value
    );

    if (noOfDays?.remainingDays <= 0 && isFreeTrialUser) {
      agent.roles = [SUBSCRIBER_ROLES[0]];
      agent.position = [PROFILE_POSITIONS.SUBSCRIBER];
      user.roles = [SUBSCRIBER_ROLES[0]];
      user.position = [PROFILE_POSITIONS.SUBSCRIBER];

      await user.save();
      await agent.save();
    }

    if (user && (await user.matchPassword(password)) && isValidStatus) {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Register a new user
 * @route: POST /api/users/
 * @acess: Private
 */
const registerUser = expressAsync(async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Get user profile
 * @route: GET /api/users/profile
 * @acess: Private
 */
const getUserProfile = expressAsync(async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Get all Users
 * @route: GET /api/users/
 * @acess: Private
 */
const getAllUsers = expressAsync(async (req, res) => {
  try {
    const users = await User.find({});

    if (users) {
      res.json(users);
    } else {
      res.status(401);
      throw new Error("Users not found.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  DELETE User
 * @route: DELETE /api/users/:id
 * @acess: Private
 */
const deleteUser = expressAsync(async (req, res) => {
  try {
    const event = await User.deleteOne({
      _id: req.params.id,
    });

    if (event) {
      res.json({ message: "User removed." });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Check Email User
 * @route: POST /api/users/email-check/account
 * @acess: Private
 */
const checkEmail = expressAsync(async (req, res) => {
  try {
    const emailAddress = req.body.emailAddress;
    const idPassword = uuidv4();
    const agent = await User.findOne({
      email: emailAddress,
    });

    if (!agent) {
      res.status(401).json(API_RES_FAIL("No email address registered."));
      return;
    } else {
      const user = await User.findOne({
        email: emailAddress,
      });
      console.log(user);
      user.idPassword = idPassword;
      await user.save();
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
            res.status(201).json("Ok");
            response?.send(response?.message);
          })
          .catch((error) => {
            res.status(500);
            console.log(error);
            res.json(API_RES_FAIL("Error occured in submission."));
          });
      } catch (error) {
        res.status(500);
        console.log(error);
        res.json(API_RES_FAIL("Error occured in submission."));
      }
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Change Password
 * @route: POST /api/users/change-password/account
 * @acess: Private
 */
const changePassword = expressAsync(async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
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

/**
 * @desc:  Unsubcribe
 * @route: PUT /api/unsubcribe
 * @acess: Private
 */
const unsubcribeUser = expressAsync(async (req, res) => {
  try {
    const { userGuid, password } = req.body;
    if (!password || !userGuid) {
      res.status(404).json(API_RES_FAIL("User not found"));
      return;
    }

    const user = await User.findOne({ userGuid });
    const agent = await Agent.findOne({ userGuid });

    if (user && (await user.matchPassword(password))) {
      agent.status = AGENT_STATUSES.UNSUBSCRIBED;
      agent.save();
      res.json(API_RES_OK("User Successfull Unsubcribed"));
    } else {
      res.status(500).json(API_RES_FAIL("Error Occured"));
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
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
  unsubcribeUser,
};
