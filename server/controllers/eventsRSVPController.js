import RSVP from "../models/eventsRSVPModel.js";
import expressAsync from "express-async-handler";
import sendEmail from "../utils/sendNodeMail.js";
import { API_RES_FAIL, API_RES_OK } from "../constants/constants.js";
import Agent from "../models/agentModel.js";
import generateString from "../utils/generateString.js";
import subscriberServices from "../services/subscriberServices.js";
import eventServices from "../services/eventServices.js";
import eventInvite from "../emailTemplates/eventInvite.js";
import EventsRSVP from "../models/eventsRSVPModel.js";
import { status } from "../constants/constants.js";

const getEventRVPS = expressAsync(async (req, res) => {
  const { eventId, isAdmin } = req.params;
  const rsvps = await EventsRSVP.aggregate([
    { $match: { eventId: eventId } },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "eventDoc",
      },
    },
    {
      $match: {
        "eventDoc.status": { $ne: "UNSUBSCRIBED" },
      },
    },
    {
      $set: {
        authorFirstName: {
          $first: "$eventDoc.firstName",
        },
        authorLastName: {
          $first: "$eventDoc.lastName",
        },
        phoneNumber: {
          $first: "$eventDoc.phoneNumber",
        },
        emailAddress: {
          $first: "$eventDoc.emailAddress",
        },
      },
    },
    {
      $unset: "eventDoc",
    },
  ]);
  res.json(rsvps);
});

const submitRSVP = expressAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    remarks,
    recruiterUserGuid,
  } = req.body;
  const { eventId } = req.params;

  if (!firstName || !emailAddress || !lastName || !phoneNumber || !eventId) {
    res.status(400).json(API_RES_FAIL("Fields are required"));

    return;
  }

  let userGuid;
  const account = await Agent.find({ emailAddress });
  const password = generateString(10);
  const event = await eventServices.getSingleEvent(eventId);

  try {
    if (account.length) {
      userGuid = account[0].userGuid;

      const isEmailExists = await RSVP.findOne({
        eventId: eventId,
        userGuid: userGuid,
      });

      if (isEmailExists && account[0].status === status.ACTIVATED) {
        res
          .status(400)
          .json(API_RES_FAIL("Email has already been used for registration."));
        return;
      } else {
        await Agent.updateOne({ userGuid: userGuid }, { $set: { status: status.ACTIVATED } });
      }
    } else {
      const data = await subscriberServices.subscriberRegistration(
        {
          email: emailAddress,
          password,
          lastName,
          firstName,
          phoneNumber,
          userGuid: recruiterUserGuid,
          verificationCode: "",
          hasNoCode: true,
          eventId: event._id
        }
      );


      userGuid = data.userGuid;
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const rsvp = new RSVP({
      userGuid,
      remarks,
      eventId,
      recruiterUserGuid,
    });
    await rsvp.save();
  } catch (error) {
    console.log(error)
  }



  const mailSubject = `RSVP - ${event.title}`;
  const eventName = event.title;
  const zoomLink = event.meetingLink;

  const mailContent = eventInvite({
    password,
    eventName,
    emailAddress,
    zoomLink,
    hasAccount: account.length,
    firstName,
  });

  try {
    console.log("done222")
    await sendEmail(emailAddress, mailSubject, mailContent, []);
    console.log("done1")
    res.status(200).json(API_RES_OK("Data Submitted"));
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export default { submitRSVP, getEventRVPS };
