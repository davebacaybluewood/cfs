import { API_RES_FAIL } from "../constants/constants.js";
import Agent from "../models/agentModel.js";
import Hierarchy from "../models/hierarchyModel.js";
import PortalSubscription from "../models/portalSubscription.js";
import backOfficeServices from "./backOfficeServices.js";

const getTrialNumberOfDays = async (userGuid) => {
  if (!userGuid) {
    res.status(401).json(API_RES_FAIL("Invalid Params"));
    return;
  }

  const subscription = await PortalSubscription.findOne({
    userGuid: userGuid,
  });

  if (subscription) {
    const subscribedDate = new Date(subscription.createdAt);
    const expirationDate = new Date(
      subscribedDate.setDate(subscribedDate.getDate() + 30)
    );
    const currentDate = new Date();

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((expirationDate - currentDate) / oneDay)
    );
    return {
      remainingDays: diffDays,
      expirationDate,
    };
  }

  return {
    remainingDays: 0,
    expirationDate: new Date(),
  };
};

const getTrialHierarchyCode = async (req, res, userGuid) => {
  if (!userGuid) {
    res.status(401).json(API_RES_FAIL("Invalid Params"));
    return;
  }

  /** Free trial | Subscriber User */
  const hierarchy = await Hierarchy.findOne({ userGuid });

  if (hierarchy) {
    const hierarchyCode = hierarchy.hierarchyCode;

    const agentHierarchy = await Hierarchy.findOne({
      hierarchyCode,
      parent: "",
    });
    const agentUserGuid = agentHierarchy.userGuid;

    const agentInfo = await Agent.findOne({ userGuid: agentUserGuid });

    const _userGuid = agentInfo.userGuid;
    const _firstName = agentInfo.firstName;
    const _lastName = agentInfo.lastName;
    const _emailAddress = agentInfo.emailAddress;

    /** Login using CFS credentials */
    const bearerToken = await backOfficeServices.backOfficeLogin();

    /** Get the list of agents from back office */
    const agentsData = await backOfficeServices.backOfficeAgents(bearerToken);
    const agentItems = agentsData.items;

    const agent = agentItems.find(
      (data) => data.emailAddress === _emailAddress
    );

    return {
      userGuid: _userGuid,
      firstName: _firstName,
      lastName: _lastName,
      emailAddress: _emailAddress,
      agentCode: agent.agentCode,
    };
  } else {
    return false;
  }
};

export default {
  getTrialNumberOfDays,
  getTrialHierarchyCode,
};
