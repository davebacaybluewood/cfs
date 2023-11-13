import backOfficeServices from "../services/backOfficeServices.js";

const loginUsingCode = async (req, res, next) => {
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
};

const loginUsingEmail = async (req, res, next) => {
  const { emailAddress } = req.body;

  if (!emailAddress) {
    res.status(401).json("Unauthorized");
    return;
  }

  const loginResponse = await backOfficeServices.loginUsingEmail(emailAddress);

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
};

export default {
  loginUsingCode,
  loginUsingEmail,
};
