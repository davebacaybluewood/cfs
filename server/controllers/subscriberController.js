import subscriberServices from "../services/subscriberServices.js";

const subscribeEmailConfirmation = async (req, res, next) => {
  const { email, password, lastName, firstName, phoneNumber } = req.body;

  if (!password || !email || !lastName || !firstName || !phoneNumber) {
    res.status(400).json({
      error: "required_validation",
      description: "Fields are required.",
    });
    return;
  }

  const response = await subscriberServices.emailConfirmation(email);

  if (response === "EXISTING") {
    res.status(400).json({
      error: "invalid_validation",
      description: "Email Already Exist",
    });
    return;
  }

  if (response) {
    res.status(200).json({
      message: "Verification Code Success",
      status: "SUCCESS",
    });
  } else {
    res.status(400).json({
      error: "invalid_request",
      description: "Invalid Verification Code",
    });
  }
};

const subscriberRegistration = async (req, res, next) => {
  const {
    email,
    password,
    lastName,
    firstName,
    phoneNumber,
    verificationCode,
    userGuid,
    templateId,
    hasNoCode
  } = req.body;

  if (
    !password ||
    !email ||
    !lastName ||
    !firstName ||
    !phoneNumber ||
    !verificationCode
  ) {
    res.status(400).json({
      error: "required_validation",
      description: "Fields are required.",
    });
    return;
  }

  const registrationResponse = await subscriberServices.subscriberRegistration({
    email,
    password,
    lastName,
    firstName,
    phoneNumber,
    verificationCode,
    userGuid,
    templateId,
  });



  if (registrationResponse) {
    res.status(200).json({
      message: "Registration Success",
      status: "SUCCESS",
    });
  } else {
    res.status(400).json({
      error: "invalid_request",
      description: "Invalid Verification Code",
    });
  }
};

export default {
  subscribeEmailConfirmation,
  subscriberRegistration,
};
