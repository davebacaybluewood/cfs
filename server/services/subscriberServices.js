import subscriberVerification from "../emailTemplates/subscriberVerification.js";
import VerificationCode from "../models/verificationCodeModel.js";
import generateString from "../utils/generateString.js";
import sendEmail from "../utils/sendNodeMail.js";
import { v4 as uuid } from "uuid";
import {
  DEFAULT_IMAGE,
  PROFILE_POSITIONS,
  SUBSCRIBER_ROLES,
} from "../constants/constants.js";
import User from "../models/userModel.js";
import Profile from "../models/agentModel.js";

const emailConfirmation = async (emailAddress) => {
  const isEmailExist = await User.find({
    email: emailAddress,
  });

  if (isEmailExist.length) {
    return "EXISTING";
  }

  const verificationCode = generateString(6);
  /** Add a verification code */
  const code = await new VerificationCode({
    emailAddress,
    verificationCode,
  });

  code.save();

  /** Email variables */
  let sendHTMLEmail;
  try {
    const mailSubject = "CFS Subscriber Verification Code";
    sendHTMLEmail = sendEmail(
      emailAddress,
      mailSubject,
      subscriberVerification(verificationCode),
      []
    ).then((request, response) => {
      response?.send(response.message);
    });

    return true;
  } catch (error) {
    throw new Error("Error occured in submission.");
  }
};

const subscriberRegistration = async (
  email,
  password,
  lastName,
  firstName,
  phoneNumber,
  confirmationCode
) => {
  const isCodeExist = await VerificationCode.find({
    verificationCode: confirmationCode,
    emailAddress: email,
  });

  if (!isCodeExist.length) {
    return false;
  }

  const userGuid = uuid();
  const userInfo = {
    name: `${firstName} ${lastName}`,
    firstName: firstName,
    lastName: lastName,
    userGuid: userGuid,
    isAdmin: false,
    email: email,
    password: password,
    roles: [SUBSCRIBER_ROLES[0]],
    position: [PROFILE_POSITIONS.SUBSCRIBER],
  };

  const profileInfo = {
    firstName: firstName,
    lastName: lastName,
    userGuid: userGuid,
    emailAddress: email,
    password: password,
    roles: [SUBSCRIBER_ROLES[0]],
    position: [PROFILE_POSITIONS.SUBSCRIBER],
    status: "ACTIVATED",
    avatar: DEFAULT_IMAGE,
    phoneNumber: phoneNumber,
  };

  const user = new User(userInfo);
  const profile = new Profile(profileInfo);

  await user.save();
  await profile.save();

  let response = {
    _id: profile._id,
    name: profile.name,
    userGuid: profile.userGuid,
    email: profile.email,
    role: profile.roles,
  };

  return response;
};

export default { emailConfirmation, subscriberRegistration };
