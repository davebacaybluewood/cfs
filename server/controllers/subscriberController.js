import subscriberServices from "../services/subscriberServices.js";
import { API_RES_FAIL } from "../constants/constants.js";

const subscribeEmailConfirmation = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

const subscriberRegistration = async (req, res, next) => {
  try {
    const {
      email,
      password,
      lastName,
      firstName,
      phoneNumber,
      verificationCode,
      userGuid,
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

    const registrationResponse =
      await subscriberServices.subscriberRegistration(
        email,
        password,
        lastName,
        firstName,
        phoneNumber,
        verificationCode,
        userGuid
      );

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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

export default {
  subscribeEmailConfirmation,
  subscriberRegistration,
};
