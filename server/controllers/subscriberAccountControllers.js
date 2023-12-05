import SubscriberAccount from "../models/subscriberAccountModel.js";
import expressAsync from "express-async-handler";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { API_RES_FAIL, API_RES_OK, status } from "../constants/constants.js";
import Agent from "../models/agentModel.js";
import Hierarchy from "../models/hierarchyModel.js";

/**
 * @desc:  Register a new user
 * @route: POST /api/SubscriberAccount/
 * @acess: Private
 */

const registerSubscriberAccount = expressAsync(async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new Error("Error occured in updating.");
  }

  const emailIsExist = await SubscriberAccount.findOne({ email });

  if (emailIsExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  //Generate a UUID for userGuid using uuidv4
  const userGuid = uuidv4();

  //Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const subscriberAccount = await SubscriberAccount.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    userGuid,
    phoneNumber,
  });

  if (subscriberAccount) {
    res.status(201).json("[Subscriber Account] has been successfully created.");
  } else {
    res.status(400);
    throw new Error("Invalid subscriber account data");
  }
});

/**
 * @desc: Get a single subscriber account by GUID
 * @route: GET /api/subscriberaccounts/userguid/:userGuid
 * @access: Public
 */

const getSubscriberAccountByUserGuid = expressAsync(async (req, res) => {
  const userGuid = req.params.userGuid;

  if (!userGuid) {
    throw new Error("Error occured in updating.");
  }

  const subscriberAccount = await SubscriberAccount.findOne(userGuid);

  if (subscriberAccount) {
    res.json(subscriberAccount);
  } else {
    res.status(404);
    throw new Error("Subscriber account not found");
  }
});

/**
 * @desc: Get a single subscriber account by Agent GUID
 * @route: GET /api/subscriberaccounts/userguid/:userGuid
 * @access: Public
 */

const getSubscriberAccountByAgentUserGuid = expressAsync(async (req, res) => {
  const agentUserGuid = req.params.agentUserGuid;

  if (!agentUserGuid) {
    throw new Error("Error occured in fetching data.");
  }

  const subscriberAccount = await SubscriberAccount.findOne(agentUserGuid);

  if (subscriberAccount) {
    res.json(subscriberAccount);
  } else {
    res.status(404);
    throw new Error("Agent Subscriber account not found");
  }
});

/**
 * @desc: Get a all subscriber account
 * @route: GET /api/subscriberaccounts/
 * @access: Private
 */

const getAllSubscriberAccounts = expressAsync(async (req, res) => {
  const subscriberacconts = await SubscriberAccount.find({});

  res.json(subscriberacconts);
});

/**
 * @desc: Delete a subscriber account
 * @route: DEL /api/subscriberaccounts/:id
 * @access: Private
 */

const deleteSubscriberAccount = expressAsync(async (req, res) => {

  try {
    const { userGuid } = req.params

    // Delete Agent - Deactivate
    const agent = await Agent.updateOne({ userGuid }, { $set: { status: status.DEACTIVATED } })

    // Delete Hierarchy
    const hierarchy = await Hierarchy.deleteOne({ userGuid })

    if (agent && hierarchy) {
      res.send(API_RES_OK('[Lead] successfully deleted'))
    } else {
      res.send(API_RES_FAIL('[Lead] not found')).status(404)
    }

  } catch (error) {
    console.log(error);
    res.send(API_RES_FAIL('Error Occured')).status(500)
  }

});

/**
 * @desc: Validate Email
 * @route: POST /api/subscriberaccounts/validateEmail
 * @access: Public
 */

const validateEmail = expressAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const subscriberAccount = await SubscriberAccount.findOne({ email });

  if (subscriberAccount) {
    res.json(false); //Email already exist, return false
  } else {
    res.json(true);
  }
});

export {
  registerSubscriberAccount,
  getSubscriberAccountByUserGuid,
  getSubscriberAccountByAgentUserGuid,
  getAllSubscriberAccounts,
  deleteSubscriberAccount,
  validateEmail,
};
