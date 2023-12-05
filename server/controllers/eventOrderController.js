import { API_RES_FAIL, API_RES_OK } from "../constants/constants.js";
import EventOrders from "../models/eventOrderModel.js";
import User from "../models/userModel.js";
import Merchandise from "../models/merchandiseModel.js";
import rewardAdminNotif from "../emailTemplates/rewardAdminNotif.js";
import rewardAgentNotif from "../emailTemplates/rewardAgentNotif.js";
import sendEmail from "../utils/sendNodeMail.js";

const model = "Event Orders";

const getEventOrders = async (req, res) => {
  try {
    const { userGuid } = req.params;

    if (!userGuid) {
      res.status(401).json(API_RES_FAIL(`[${model}] Params are required.`));
      return;
    }

    const orders = await EventOrders.find({ userGuid: userGuid });

    if (orders) {
      res.json(orders);
    } else {
      res.status(401).json(API_RES_FAIL(`[${model}] Error Occured`));
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

const claimReward = async (req, res) => {
  try {
    const { rewardId } = req.params;
    const { userGuid, addressLine1, addressLine2, state, zipCode, notes } =
      req.body;

    if (!userGuid || !rewardId || !addressLine1) {
      res.status(401).json(API_RES_FAIL(`[${model}] Params are required.`));
      return;
    }

    const recipient = await User.find({ userGuid: req.body.userGuid });
    if (!recipient.length) {
      res.status(400).json(API_RES_FAIL("[Event Order] Agent not found"));
      return;
    }

    const orders = new EventOrders({
      rewardId: rewardId,
      userGuid: userGuid,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      state: state,
      zipCode: zipCode,
      notes: notes,
    });

    orders.save();

    if (orders) {
      const mailSubject = "Agent of Agents | Claim Reward";

      const admin = await User.find({
        isAdmin: true,
      });

      const merchandise = await Merchandise.find({
        _id: "654e7ff62140349de10c6ada", //rewardId,
      });
      const merchandiseData = {
        merchantName: merchandise[0].name,
        merchantImage: merchandise[0].image,
        merchantPoints: merchandise[0].points + " points",
      };

      const addDays = (date, days) => {
        date.setDate(date.getDate() + days);
        return date;
      };

      const dateRequested = new Date();
      let shipDate = new Date();
      shipDate = addDays(shipDate, 2);
      let resultMsg = [];

      const recipients = [...recipient, ...admin];

      try {
        const emailPromise = recipients.map((user) => {
          const agentName = recipient[0].name;
          let recipientEmail = user.email;
          let mailContent;

          if (user.isAdmin) {
            mailContent = rewardAdminNotif({
              agentName,
              dateRequested,
              addressLine1,
              addressLine2,
              state,
              zipCode,
              notes,
              ...merchandiseData,
            });
          } else {
            mailContent = rewardAgentNotif({
              dateRequested,
              shipDate,
              addressLine1,
              addressLine2,
              state,
              zipCode,
              notes,
              ...merchandiseData,
            });
          }

          return sendEmail(
            recipientEmail,
            mailSubject,
            mailContent,
            [],
            recipientEmail //bcc
          )
            .then((resolve, reject) => {
              let msg = reject
                ? "Failed email for " + recipientEmail
                : "Sent email to " + recipientEmail;
              resultMsg.push(msg);
            })
            .catch((error) => {
              res.status(500);
              console.log(error);
              throw new Error("Error occured in submission.");
            });
        });
      } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Error occured in submission.");
      }

      res.json(orders);
    } else {
      res.status(401).json(API_RES_FAIL(`[${model}] Error Occured`));
    }
  } catch (e) {
    console.log(e);
    res.status(401).json(API_RES_FAIL(`[${model}] Error Occured`));
    return;
  }
};

export { getEventOrders, claimReward };
