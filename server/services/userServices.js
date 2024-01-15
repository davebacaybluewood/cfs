import PreProfile from "../models/preProfileModel.js";
import Agent from "../models/agentModel.js";
import User from "../models/userModel.js";
import {
  AGENT_STATUSES,
  ROLES,
  PROFILE_POSITIONS,
  POINTS_TYPE,
} from "../constants/constants.js";
import Hierarchy from "../models/hierarchyModel.js";
import Points from "../models/pointsModel.js";
import generateString from "../utils/generateString.js";
import backOfficeServices from "./backOfficeServices.js";
import EmailTemplate from "../models/emailTemplate.js";
import mongoose from "mongoose";

const registerPaidUser = async (req, res) => {
  try {
    const preProfile = await PreProfile.findOne({
      emailAddress: req.body.emailAddress,
    });
    await Agent.create({
      userGuid: preProfile.userGuid,
      firstName: preProfile.firstName?.toString(),
      lastName: preProfile.lastName?.toString(),
      state: preProfile.state?.toString(),
      licenseNumber: preProfile.licenseNumber?.toString(),
      title: preProfile.title?.toString(),
      bio: preProfile.bio?.toString(),
      phoneNumber: preProfile.phoneNumber?.toString(),
      emailAddress: preProfile.emailAddress?.toString(),
      address: preProfile.address?.toString(),
      instagram: preProfile.instagram?.toString(),
      facebook: preProfile.facebook?.toString(),
      linkedIn: preProfile.linkedIn?.toString(),
      twitter: preProfile.twitter?.toString(),
      weChat: preProfile.weChat?.toString(),
      discordId: preProfile.discordId?.toString(),
      languages: preProfile?.languages,
      specialties: preProfile?.specialties,
      roles: preProfile?.roles,
      firstName: preProfile?.firstName,
      lastName: preProfile?.lastName,
      role: ROLES.ROLE_AGENT,
      status: AGENT_STATUSES.ACTIVATED,
      telNumber: preProfile?.telNumber,
      password: preProfile?.password,
      avatar: preProfile?.avatar,
      position: preProfile?.position,
    });
    await User.create({
      name: preProfile.firstName + " " + preProfile.lastName,
      firstName: preProfile.firstName,
      lastName: preProfile.lastName,
      userGuid: preProfile.userGuid,
      email: preProfile.emailAddress,
      password: preProfile.password,
      isAdmin: false,
      role: "AGENT",
      roles: preProfile.roles,
      position: preProfile.position,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured upon registering profile.");
  }
};

const registerUserHierarchyAndPoints = async (
  req,
  res,
  userGuid,
  templateId
) => {
  const { recruiterUserGuid } = req.body;

  // const recruiterInfo = await Agent.findOne({ userGuid: recruiterUserGuid });
  // const token = await backOfficeServices.backOfficeLogin();
  // const agents = await backOfficeServices.backOfficeAgents(token);

  // const agentItems = agents.items || [];
  // const accountingSystemEmailAddress = agentItems?.filter(
  //   (data) => data.emailAddress
  // );
  // console.log({
  //   recruiterInfo,
  //   accountingSystemEmailAddress,
  // });

  let source = "";
  if (templateId) {
    const findEmailTemplate = async () => {
      const template = await EmailTemplate.findById(templateId);
      source = template.subject;
    };
    if (templateId === "CUSTOM_EMAIL") {
      source = "Individual Registration";
    } else {
      source = findEmailTemplate();
    }
  } else {
    source = "Individual Registration";
  }

  const agentProfile = await Agent.findOne({ userGuid });
  const isSubscriber = agentProfile?.position?.some((f) => {
    return f.value === PROFILE_POSITIONS.SUBSCRIBER.value;
  });

  const isFreeTrial = agentProfile?.position?.some((f) => {
    return f.value === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value;
  });
  /** Generate points */
  const expirationDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  if (isSubscriber || isFreeTrial) {
    const newPoints = {
      expirationDate,
      userGuid: agentProfile.userGuid,
      points: POINTS_TYPE.FREE_TRIAL_REGISTRATION_SUCCESS.POINTS,
      type: POINTS_TYPE.FREE_TRIAL_REGISTRATION_SUCCESS.NAME,
    };
    await Points.create(newPoints);
  }

  if (recruiterUserGuid) {
    const newPoints = {
      expirationDate,
      userGuid: recruiterUserGuid,
      points: POINTS_TYPE.FREE_TRIAL_REGISTRATION_SUCCESS.POINTS,
      type: POINTS_TYPE.FREE_TRIAL_REGISTRATION_SUCCESS.NAME,
    };
    await Points.create(newPoints);
  }

  /** Generation of hierarchy */
  if (recruiterUserGuid) {
    const hierarchy = await Hierarchy.find({
      recruiterUserGuid,
    });

    if (!hierarchy.length) {
      const hierarchyId = generateString(6);
      const newHierarchyId = generateString(6);
      const hierarchyCode = generateString(6);
      const newHierarchy = [
        {
          userGuid: recruiterUserGuid,
          parent: "",
          hierarchyId: hierarchyId,
          hierarchyCode: hierarchyCode,
        },
        {
          userGuid: agentProfile.userGuid,
          parent: hierarchyId,
          hierarchyId: newHierarchyId,
          hierarchyCode: hierarchyCode,
          recruiterUserGuid: recruiterUserGuid,
          source,
        },
      ];

      await Hierarchy.insertMany(newHierarchy);
    } else {
      /** Get the hierarchy code */
      const hierarchyCode = hierarchy[0].hierarchyCode;

      /** Get the most recent hierarchy code */
      const recentHierarchy = await Hierarchy.find({
        hierarchyCode,
        userGuid: recruiterUserGuid,
      }).sort({ _id: -1 });
      const recentHierarchyData = recentHierarchy[0];

      const newHierarchyId = generateString(6);
      const newHierarchy = {
        userGuid: agentProfile.userGuid,
        parent: recentHierarchyData.hierarchyId,
        hierarchyId: newHierarchyId,
        hierarchyCode: hierarchyCode,
        recruiterUserGuid: recruiterUserGuid,
        source,
      };
      await Hierarchy.create(newHierarchy);
    }
  } else {
    const hierarchyId = generateString(6);
    const hierarchyCode = generateString(6);

    const newHierarchy = {
      userGuid: agentProfile.userGuid,
      parent: "",
      hierarchyId: hierarchyId,
      hierarchyCode: hierarchyCode,
      source,
    };
    await Hierarchy.create(newHierarchy);
  }
};

export { registerPaidUser, registerUserHierarchyAndPoints };
