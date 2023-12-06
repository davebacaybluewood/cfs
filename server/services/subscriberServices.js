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
import { status } from "../constants/constants.js";
import EmailTemplate from '../models/emailTemplate.js'
import mongoose from "mongoose";
import Events from "../models/eventModel.js";

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

const subscriberRegistration = async (subscriberData) => {
  const {
    email,
    password,
    lastName,
    firstName,
    phoneNumber,
    verificationCode,
    userGuid,
    hasNoCode,
    templateId,
    eventId
  } = subscriberData

  const isCodeExist = await VerificationCode.find({
    verificationCode: verificationCode,
    emailAddress: email,
  });

  let source = "";
  if (templateId) {
    const template = await EmailTemplate.findById(templateId)
    source = template.subject;
  }

  if (eventId) {
    const event = await Events.findById(eventId)
    source = event.title
  }

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
        { /** Recruiter Info */
          userGuid,
          parent: "",
          hierarchyId: hierarchyId,
          hierarchyCode: hierarchyCode,
        },
        { /** Recruited Info */
          userGuid: newUserGuid,
          parent: hierarchyId,
          hierarchyId: newHierarchyId,
          hierarchyCode: hierarchyCode,
          recruiterUserGuid: userGuid,
          source: source
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
        source: source
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

const fetchSubscribersByUser = async (userGuid) => {
  try {
    const user = await User.findOne({ userGuid });
    const isAdmin = user?.isAdmin;

    const subscribers = await Hierarchy.aggregate([
      {
        $match: isAdmin ? { recruiterUserGuid: { $exists: false } } : { recruiterUserGuid: userGuid },
      },
      {
        $lookup: {
          from: "users",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "userDoc",
        },
      },
      {
        $unwind: "$userDoc",
      },
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "agentDoc",
        },
      },
      {
        $unwind: "$agentDoc",
      },
      {
        $match: { "agentDoc.status": status.ACTIVATED },
      },
      {
        $project: {
          _id: 1,
          userGuid: 1,
          recruiterUserGuid: 1,
          hierarchyId: 1,
          hierarchyCode: 1,
          parent: 1,
          createdAt: 1,
          updatedAt: 1,
          position: "$userDoc.position",
          firstName: "$userDoc.firstName",
          lastName: "$userDoc.lastName",
          email: "$userDoc.email",
          status: "$agentDoc.status",
          nationality: "$agentDoc.nationality",
          birthdate: "$agentDoc.birthDate",
        },
      },
      {
        $unset: "userDoc",
      },
    ]);

    const filteredSubscriber = subscribers.map((data) => {
      const isAgent = data.position?.some((e) => e.value === "POSITION_AGENT");
      const isSubscriber = data.position?.some(
        (e) => e.value === "POSITION_SUBSCRIBER"
      );

      return {
        ...data,
        type: isSubscriber ? "SUBSCRIBER" : "FREE 30DAYS TRIAL",
        previousRole: data.previousRole || "",
        isSubscribed: isAgent,
      };
    });

    return filteredSubscriber;
  } catch (error) {
    res.status(500).json(API_RES_FAIL("Error Occured"));
  }
};

const fetchAllSubscribers = async () => {
  const subscribers = await Hierarchy.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "userDoc",
      },
    },
    {
      $set: {
        firstName: {
          $first: "$userDoc.firstName",
        },
        lastName: {
          $first: "$userDoc.lastName",
        },
        email: {
          $first: "$userDoc.email",
        },
      },
    },
    {
      $unset: "userDoc",
    },
  ]);

  return subscribers;
};


export default {
  emailConfirmation,
  subscriberRegistration,
  fetchSubscribersByUser,
  fetchAllSubscribers,
};
