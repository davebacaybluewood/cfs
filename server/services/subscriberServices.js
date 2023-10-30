import subscriberVerification from "../emailTemplates/subscriberVerification.js";
import VerificationCode from "../models/verificationCodeModel.js";
import { consumeCode } from "./verificationCodeServices.js";
import generateString from "../utils/generateString.js";
import sendEmail from "../utils/sendNodeMail.js";
import { v4 as uuid } from "uuid";
import {
  DEFAULT_IMAGE,
  POINTS_TYPE,
  PROFILE_POSITIONS,
  SUBSCRIBER_ROLES,
} from "../constants/constants.js";
import User from "../models/userModel.js";
import Profile from "../models/agentModel.js";
import Hierarchy from "../models/hierarchyModel.js";
import Points from "../models/pointsModel.js";
import Agent from "../models/agentModel.js";

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
  confirmationCode,
  userGuid,
  hasNoCode
) => {
  const isCodeExist = await VerificationCode.find({
    verificationCode: confirmationCode,
    emailAddress: email,
  });

  const account = await Agent.find({ userGuid });
  const isSubscriber = account[0]?.position?.some((f) => {
    return f.value === PROFILE_POSITIONS.SUBSCRIBER.value;
  });

  if (!isCodeExist.length && !hasNoCode) {
    return false;
  }

  consumeCode({ emailAddress: email });

  const newUserGuid = uuid();
  const userInfo = {
    name: `${firstName} ${lastName}`,
    firstName: firstName,
    lastName: lastName,
    userGuid: newUserGuid,
    isAdmin: false,
    email: email,
    password: password,
    roles: [SUBSCRIBER_ROLES[0]],
    position: [PROFILE_POSITIONS.SUBSCRIBER],
  };

  const profileInfo = {
    firstName: firstName,
    lastName: lastName,
    userGuid: newUserGuid,
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

  /** Generation of hierarchy */
  if (userGuid) {
    const hierarchy = await Hierarchy.find({
      userGuid,
    });

    if (!hierarchy.length) {
      const hierarchyId = generateString(6);
      const newHierarchyId = generateString(6);
      const hierarchyCode = generateString(6);
      const newHierarchy = [
        {
          userGuid,
          parent: "",
          hierarchyId: hierarchyId,
          hierarchyCode: hierarchyCode,
        },
        {
          userGuid: newUserGuid,
          parent: hierarchyId,
          hierarchyId: newHierarchyId,
          hierarchyCode: hierarchyCode,
          recruiterUserGuid: userGuid,
        },
      ];

      await Hierarchy.insertMany(newHierarchy);
    } else {
      /** Get the hierarchy code */
      const hierarchyCode = hierarchy[0].hierarchyCode;

      /** Get the most recent hierarchy code */
      const recentHierarchy = await Hierarchy.find({
        hierarchyCode,
        userGuid,
      }).sort({ _id: -1 });
      const recentHierarchyData = recentHierarchy[0];

      const newHierarchyId = generateString(6);
      const newHierarchy = {
        userGuid: newUserGuid,
        parent: recentHierarchyData.hierarchyId,
        hierarchyId: newHierarchyId,
        hierarchyCode: hierarchyCode,
        recruiterUserGuid: userGuid,
      };
      await Hierarchy.create(newHierarchy);
    }
  }

  /** Generate points */
  const expirationDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  if (isSubscriber) {
    const newPoints = {
      expirationDate,
      userGuid: userGuid,
      points: POINTS_TYPE.SUBSCRIBER_REGISTRATION_SUCCESS.POINTS,
      type: POINTS_TYPE.SUBSCRIBER_REGISTRATION_SUCCESS.NAME,
    };
    await Points.create(newPoints);
  }

  const newPoints = {
    expirationDate,
    userGuid: newUserGuid,
    points: POINTS_TYPE.PERSONAL_ACCOUNT_REGISTRATION.POINTS,
    type: POINTS_TYPE.PERSONAL_ACCOUNT_REGISTRATION.NAME,
  };
  await Points.create(newPoints);

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
