import RSVP from "../models/eventsRSVPModel.js";
import expressAsync from "express-async-handler";
import sendEmail from "../utils/sendNodeMail.js";
import inquiryEmail from "../emailTemplates/inquiry-email.js";
import { API_RES_FAIL, API_RES_OK } from "../constants/constants.js";
import Agent from "../models/agentModel.js";
import { v4 as uuid } from "uuid";
import generateString from "../utils/generateString.js";
import {
  PROFILE_POSITIONS,
  SUBSCRIBER_ROLES,
  DEFAULT_IMAGE,
  POINTS_TYPE,
} from "../constants/constants.js";
import subscriberServices from "../services/subscriberServices.js";
import eventInvite from "../emailTemplates/eventInvite.js";

/**
 * @desc: Fetch all inquiries
 * @route: GET /api/inquiries
 * @acess: Private
 */
const getInquiries = expressAsync(async (req, res) => {
  const inquiries = await Inquiries.find({});
  res.json(inquiries);
});

/**
 * @desc: Fetch single inquiry
 * @route: GET /api/inquiries/:id
 * @acess: Private
 */
const getSingleInquiry = expressAsync(async (req, res) => {
  const inquiry = await Inquiries.findOne({
    _id: req.params.id,
  });

  if (inquiry) {
    res.json(inquiry);
  } else {
    res.status(404);
    throw new Error("Inquiry not found.");
  }
});

const submitRSVP = expressAsync(async (req, res) => {
  const { firstName, lastName, phoneNumber, emailAddress, remarks } = req.body;
  const { eventId } = req.params;

  if (!firstName || !emailAddress || !lastName || !phoneNumber || !eventId) {
    res.status(400).json(API_RES_FAIL("Fields are required"));

    return;
  }

  let userGuid;
  const account = await Agent.find({ emailAddress });
  const password = generateString(10);

  if (account.length) {
    userGuid = account[0].userGuid;
  } else {
    const data = await subscriberServices.subscriberRegistration(
      emailAddress,
      password,
      lastName,
      firstName,
      phoneNumber,
      "",
      "",
      true
    );

    userGuid = data.userGuid;
  }

  const rsvp = new RSVP({
    userGuid,
    remarks,
    eventId,
  });
  await rsvp.save();

  const mailSubject = "RSVP Submission";
  const eventName = "Event Test";
  const zoomLink =
    "https://us06web.zoom.us/j/6430504997?pwd=VE13L3VQU2VqTjRuVDc1dEh5enh5Zz09#success";
  const mailContent = eventInvite({
    password,
    eventName,
    emailAddress,
    zoomLink,
    hasAccount: account.length,
  });

  try {
    await sendEmail(emailAddress, mailSubject, mailContent, []);
    res.status(200).json(API_RES_OK("Data Submitted"));
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export default { submitRSVP };
