import expressAsync from "express-async-handler";
import Subscriptions from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendNodeMail.js";

import merchandiseAdminNotif from "../emailTemplates/merchandiseAdminNotif.js";
import merchandiseSubscriberNotif from "../emailTemplates/merchandiseSubscriberNotif.js";

/**
 * @desc: Create a subscription
 * @route: POST /api/subscription
 * @acess: Private
 */
const createSubscription = expressAsync(async (req, res) => {
  const { emailAddress } = req.body;

  const subscription = await Subscriptions.find({
    emailAddress: emailAddress,
  }).count();

  if (!emailAddress) {
    throw new Error("Error Occured");
  }

  if (subscription) {
    res.status(400).json({
      error: "Email already registered.",
    });

    return;
  }

  try {
    const subscriptions = new Subscriptions({
      emailAddress,
    });
    await subscriptions.save();
    res.status(201).json("Email registered.");
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error Occured");
  }
});

/**
 * @desc: get all subscriptions
 * @route: Get /api/subscription
 * @acess: Private
 */
const getSubscriptions = expressAsync(async (req, res) => {
  try {
    const subscription = await Subscriptions.find({});
    res.status(201).json(subscription);
  } catch (error) {
    console.log(error);
    throw new Error("Error Occured");
  }
});

/**
 * @desc: delete email
 * @route: Get /api/subscription/${id}
 * @acess: Private
 */
const deleteSubscription = expressAsync(async (req, res) => {
  try {
    await Subscriptions.deleteOne({
      _id: req.params._id,
    });
    res.status(201).json("Data deleted.");
  } catch (error) {
    console.log(error);
    throw new Error("Error Occured");
  }
});

/**
 * @desc: send Merchandise notification email to Admin
 * @route: Get /api/subscription/redeem-merch/
 * @access: Private
 */

const emailRedeemMerchNotif = expressAsync(async (req, res) => {
  const mailSubject = req.body.subject;
  const note = req.body.note;
  const shipAddr = req.body.shipAddr;

  const subscriber = await User.find({ userGuid: req.body.userGuid });

  const admin = await User.find({
    isAdmin: true,
  });

  //Start - Test Data
  //@TODO: Get Merchandise item
  // const merchandise = await Merchandise.find({ merchandiseId: req.body.merchandiseId });
  const merchandise = {
    merchantName: "Merchant Name",
    merchantImage:
      "https://res.cloudinary.com/dfm2vczpy/image/upload/v1696237796/merchandises/589ae54e5c0c7c75fc94d483b4acbaad_svu6ie.jpg",
    merchantPoints: 5 + " points",
  };

  const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const dateRequested = new Date();
  let shipDate = new Date();
  shipDate = addDays(shipDate, 2);
  //End - Test Data

  let sendHTMLEmail;
  let resultMsg = [];

  const recipients = [...subscriber, ...admin];

  try {
    const emailPromise = recipients.map((user) => {
      const subscriberName = subscriber[0].name;
      let recipientEmail = user.email;
      let mailContent;

      if (user.isAdmin) {
        mailContent = merchandiseAdminNotif({
          subscriberName,
          dateRequested,
          note,
          shipAddr,
          ...merchandise,
        });
      } else {
        mailContent = merchandiseSubscriberNotif({
          dateRequested,
          shipDate,
          ...merchandise,
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
          console.log("failed sending");
          res.status(500);
          console.log(error);
          throw new Error("Error occured in submission.");
        });
    });

    const emailRes = Promise.all(emailPromise).then(() => {
      res.send({ message: resultMsg });
    });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
  emailRedeemMerchNotif,
};
