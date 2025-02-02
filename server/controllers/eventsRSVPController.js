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
import Hierarchy from "../models/hierarchyModel.js";
import { v4 as uuidV4 } from 'uuid'

const getEventRVPS = expressAsync(async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const submitRSVP = expressAsync(async (req, res) => {
  try {
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
        await Agent.updateOne(
          { userGuid: userGuid },
          { $set: { status: status.ACTIVATED } }
        );
      }
    } else {
      const data = await subscriberServices.subscriberRegistration({
        email: emailAddress,
        password,
        lastName,
        firstName,
        phoneNumber,
        verificationCode: "",
        userGuid: recruiterUserGuid,
        hasNoCode: true,
        eventId,
      });

      userGuid = data.userGuid;
    }

    const rsvp = new RSVP({
      userGuid,
      remarks,
      eventId,
      recruiterUserGuid,
    });
    await rsvp.save();

    const event = await eventServices.getSingleEvent(eventId);

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

    /* Generate Source from event */
    /* Get Hierarchy Code  */

    const hierarchy = await Hierarchy.findOne({ recruiterUserGuid })
    const hierarchyCode = hierarchy.hierarchyCode
    const agentCode = hierarchy.agentCode


    const NewHierarchy = new Hierarchy({
      userGuid: uuidV4(),
      recruiterUserGuid: hierarchy.recruiterUserGuid,
      hierarchyId: generateString(6),
      hierarchyCode: hierarchyCode,
      parent: hierarchy.hierarchyId,
      agentCode: agentCode,
      source: eventName
    })

    await NewHierarchy.save()

    await sendEmail(emailAddress, mailSubject, mailContent, []);
    res.status(200).json(API_RES_OK("Data Submitted"));
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export default { submitRSVP, getEventRVPS };
