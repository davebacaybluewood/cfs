import fetch from "node-fetch";
import VerificationCode from "../models/verificationCodeModel.js";
import generateString from "../utils/generateString.js";
import sendEmail from "../utils/sendNodeMail.js";
import loginOTP from "../emailTemplates/loginOTP.js";
import User from "../models/userModel.js";
import Agents from "../models/agentModel.js";
import { v4 as uuid } from "uuid";
import { AGENT_ROLES, PROFILE_POSITIONS } from "../constants/constants.js";
import generateToken from "../utils/generateToken.js";
import Agent from "../models/agentModel.js";

const BACK_OFFICE_ENDPOINTS = {
  SPECIFIC_AGENT_BY_CODE:
    "https://api.poweredagency.com/agency-management/v1/comfortfinancialsolutions/agents/:agentCode",
  LOGIN: "https://auth.poweredagency.com/connect/token",
  ACTIVATED_AGENTS:
    "https://api.poweredagency.com/agency-management/v1/comfortfinancialsolutions/agents/recently-activated",
};
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";

const backOfficeLogin = async () => {
  const body = new URLSearchParams({
    client_id: "F4BFK3GjQTNau95Rk6mP",
    client_secret: "eUMcJgCqSCEoddkKmaaNVlN57VqhdwQg",
    grant_type: "client_credentials",
    scope: "read:agents tenant:comfortfinancialsolutions",
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const backOfficeValue = await fetch(BACK_OFFICE_ENDPOINTS.LOGIN, {
    method: "POST",
    headers,
    body,
  });

  const backOfficeRes = await backOfficeValue.json();
  const bearerToken = `Bearer ${backOfficeRes.access_token}`;

  if (bearerToken) {
    return bearerToken;
  } else {
    throw new Error("Error occured in back office login");
  }
};

const backOfficeAgentInformationByAgentCode = async (
  agentCode,
  bearerToken
) => {
  const headers = {
    "Ocp-Apim-Subscription-Key": "0059c5d0de3f43b480f3a0daec35dc8c",
    Authorization: bearerToken,
  };

  const backOfficeValue = await fetch(
    BACK_OFFICE_ENDPOINTS.SPECIFIC_AGENT_BY_CODE.replace(
      ":agentCode",
      agentCode
    ),
    {
      method: "GET",
      headers,
    }
  );

  const agent = await backOfficeValue.json();
  return agent;
};

const backOfficeAgents = async (bearerToken) => {
  const headers = {
    "Ocp-Apim-Subscription-Key": "0059c5d0de3f43b480f3a0daec35dc8c",
    Authorization: bearerToken,
  };

  const backOfficeValue = await fetch(BACK_OFFICE_ENDPOINTS.ACTIVATED_AGENTS, {
    method: "GET",
    headers,
  });

  const agents = await backOfficeValue.json();
  return agents;
};

const loginUsingEmail = async (emailAddress) => {
  /** Login using CFS credentials */
  const bearerToken = await backOfficeLogin();

  /** Get the list of agents from back office */
  const agentsData = await backOfficeAgents(bearerToken);
  const agents = agentsData.items || [];
  const accountingSystemEmailAddress = agentsData.items?.map(
    (data) => data.emailAddress
  );

  const cfsAgents = await Agent.find({});
  const cfsEmailAddress = cfsAgents.map((data) => data.emailAddress);

  const mergedEmailAddress =
    accountingSystemEmailAddress.concat(cfsEmailAddress);

  /** Validation if the email is existing in the back office */
  if (mergedEmailAddress.length) {
    const agent =
      mergedEmailAddress.find((data) => data === emailAddress) || {};

    if (Object.keys(agent).length > 0) {
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
        const mailSubject = "CFS Login One-Time Password";
        sendHTMLEmail = sendEmail(
          emailAddress,
          mailSubject,
          loginOTP(verificationCode),
          []
        ).then((request, response) => {
          response?.send(response.message);
        });
      } catch (error) {
        throw new Error("Error occured in submission.");
      }

      const agentCodeData = agents.find(
        (data) => data.emailAddress === emailAddress
      );

      return {
        agentCode: agentCodeData?.agentCode || "",
      };
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const loginUsingCode = async (verificationCode, emailAddress, agentCode) => {
  /** Pending find in temp time */
  const isCodeExist = await VerificationCode.find({
    verificationCode,
    emailAddress,
  });

  if (isCodeExist.length) {
    const isEmailExist = await User.find({
      email: emailAddress,
    });

    let token;
    let response;

    if (!isEmailExist.length) {
      /** Login using CFS credentials */
      const bearerToken = await backOfficeLogin();

      /** Get the agent information */
      const agent = await backOfficeAgentInformationByAgentCode(
        agentCode,
        bearerToken
      );

      const userGuid = uuid();
      const userInfo = {
        name: `${agent.firstName} ${agent.lastName}`,
        firstName: agent.firstName,
        lastName: agent.lastName,
        userGuid: userGuid,
        isAdmin: false,
        email: agent.emailAddress,
        password: "Test",
        roles: [AGENT_ROLES[0]],
        position: [PROFILE_POSITIONS.AGENT],
      };

      const profileInfo = {
        firstName: agent.firstName,
        lastName: agent.lastName,
        userGuid: userGuid,
        emailAddress: agent.emailAddress,
        password: "Test",
        roles: [AGENT_ROLES[0]],
        position: [PROFILE_POSITIONS.AGENT],
        status: "ACTIVATED",
        avatar: DEFAULT_IMAGE,
      };
      const profile = new User(userInfo);
      const user = new Agents(profileInfo);

      await user.save();
      await profile.save();

      token = generateToken(profile._id);

      response = {
        _id: profile._id,
        name: profile.name,
        userGuid: profile.userGuid,
        email: profile.email,
        token: token,
        role: "ROLE_AGENT",
      };
    } else {
      const user = await User.findOne({
        email: emailAddress,
      });

      const agentProfile = await Agent.findOne({ emailAddress });

      /** Login using CFS credentials */
      const bearerToken = await backOfficeLogin();

      /** Get the list of agents from back office */
      const agentsData = await backOfficeAgents(bearerToken);
      const agents = agentsData.items || [];
      const accountingSystemEmailAddress = agents?.map(
        (data) => data.emailAddress
      );

      let isNotAdmin = false;

      if (
        agentProfile.position.some(
          (e) =>
            e.value === PROFILE_POSITIONS.SUBSCRIBER.value ||
            e.value === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value
        )
      ) {
        isNotAdmin = true;
      }

      if (accountingSystemEmailAddress.includes(emailAddress) && isNotAdmin) {
        agentProfile.roles = [AGENT_ROLES[0]];
        agentProfile.position = [PROFILE_POSITIONS.AGENT];
        user.roles = [AGENT_ROLES[0]];
        user.position = [PROFILE_POSITIONS.AGENT];

        try {
          await user.save();
          await agentProfile.save();
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      token = generateToken(user._id);

      response = {
        _id: user._id,
        name: user.name,
        userGuid: user.userGuid,
        email: user.email,
        token: token,
        role: "ROLE_AGENT",
      };
    }

    return response;
  } else {
    return false;
  }
};

export default {
  backOfficeLogin,
  loginUsingEmail,
  loginUsingCode,
  backOfficeAgents,
};
