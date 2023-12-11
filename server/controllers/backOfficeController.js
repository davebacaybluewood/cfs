import backOfficeServices from "../services/backOfficeServices.js";
import { API_RES_FAIL } from "../constants/constants.js";

const loginUsingCode = async (req, res, next) => {
  try {
    const { verificationCode, emailAddress, agentCode } = req.body;

    if (!verificationCode || !emailAddress) {
      res.status(401).json("Unauthorized");
      return;
    }

    const loginResponse = await backOfficeServices.loginUsingCode(
      verificationCode,
      emailAddress,
      agentCode
    );

    if (loginResponse) {
      res.status(200).json({
        message: "Email Login Code Success",
        status: "SUCCESS",
        user: loginResponse,
      });
    } else {
      res.status(401).json({
        error: "invalid_request",
        description: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

const loginUsingEmail = async (req, res, next) => {
  try {
    const { emailAddress } = req.body;

    if (!emailAddress) {
      res.status(401).json("Unauthorized");
      return;
    }

    const loginResponse = await backOfficeServices.loginUsingEmail(
      emailAddress
    );

    if (loginResponse) {
      res.status(200).json({
        message: "Email Login Success",
        status: "SUCCESS",
        agent: loginResponse,
      });
    } else {
      res.status(401).json({
        error: "invalid_request",
        description: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

export default {
  loginUsingCode,
  loginUsingEmail,
};
