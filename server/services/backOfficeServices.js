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

const BACK_OFFICE_ENDPOINTS = {
  SPECIFIC_AGENT_BY_CODE:
    "https://test-api.poweredagency.com/agency-management/v1/comfortfinancialsolutions/agents/:agentCode",
  LOGIN: "https://test-auth.poweredagency.com/connect/token",
  ACTIVATED_AGENTS:
    "https://test-api.poweredagency.com/agency-management/v1/comfortfinancialsolutions/agents/recently-activated",
};
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";

const backOfficeLogin = async () => {
  const body = new URLSearchParams({
    client_id: "Gct1Az5AI4uHCYEXWk5o",
    client_secret: "QslG55ojSUkJqQpIHwbDE360YDVnkmsr",
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
    "Ocp-Apim-Subscription-Key": "9e586c441e624fb084764032235c71a5",
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
    "Ocp-Apim-Subscription-Key": "9e586c441e624fb084764032235c71a5",
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

  /** Validation if the email is existing in the back office */
  if (agents.length) {
    const agent =
      agents.find((data) => data.emailAddress === emailAddress) || {};

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

      return {
        agentCode: agent.agentCode,
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
      const user = await User.find({
        email: emailAddress,
      });
      token = generateToken(user[0]._id);

      response = {
        _id: user[0]._id,
        name: user[0].name,
        userGuid: user[0].userGuid,
        email: user[0].email,
        token: token,
        role: "ROLE_AGENT",
      };
    }

    return response;
  } else {
    return false;
  }
};

export default { backOfficeLogin, loginUsingEmail, loginUsingCode };