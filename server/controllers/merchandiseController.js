import Merchandise from "../models/merchandiseModel.js";
import expressAsync from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Orders from "../models/ordersModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendNodeMail.js";
import merchandiseAdminNotif from "../emailTemplates/merchandiseAdminNotif.js";
import merchandiseSubscriberNotif from "../emailTemplates/merchandiseSubscriberNotif.js";
import RedeemedPoints from "../models/redeemedPointsModel.js";
import fs from "fs";
import { API_RES_FAIL } from "../constants/constants.js";

function isFieldEmpty(field) {
  return field === undefined || field === null || field === "";
}

/**
 * @desc: Create a new Merchandise
 * @route: POST /api/merchandise
 * @access: Private
 */
const createMerchandise = expressAsync(async (req, res) => {
  const { name, points } = req.body;

  try {
    if (isFieldEmpty(name) || isFieldEmpty(points)) {
      throw new Error("Fields are required.");
    }

    let profileImgResult;
    try {
      profileImgResult = await cloudinary.v2.uploader.upload(req.file?.path, {
        folder: "merchandises",
        use_filename: true,
      });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("Error uploading merchandise image.");
    }

    const newMerchandise = new Merchandise({
      name,
      points,
      image: profileImgResult.secure_url,
      status: "ACTIVATED",
    });

    const createdMerchandise = await newMerchandise.save();
    res.status(201).json(createdMerchandise);

    fs.unlink(req.file?.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "internal_server_error",
      message: "Error occurred in adding merchandise.",
    });

    fs.unlink(req.file?.path, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      }
    });
  }
});

/**
 * @desc: Delete a Merchandise
 * @route: DELETE /api/merchandise/:id
 * @access: Private
 */
const deleteMerchandise = expressAsync(async (req, res) => {
  const merchandiseId = req.params.id;

  // Check if the merchandise ID is empty
  if (isFieldEmpty(merchandiseId)) {
    res.status(400).json({
      error: "required_validation",
      message: "Merchandise ID is required.",
    });
    return;
  }

  const merchandise = await Merchandise.findById(merchandiseId);

  if (merchandise) {
    await merchandise.remove();
    res.json({ message: "Merchandise deleted", success: true });
  } else {
    res.status(404);
    throw new Error("Merchandise not found");
  }
});

/**
 * @desc:  Get All Information on Merchandise
 * @route: POST /api/merchandise
 * @acess: Private
 */

const getMerchandise = expressAsync(async (req, res) => {
  const merchandises = await Merchandise.find({});

  res.json(merchandises);
});

/**
 * @desc:  Get Merchandise by ID
 * @route: GET /api/merchandise/:id
 * @acess: Private
 */

const getMerchandiseById = expressAsync(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new Error("Invalid Params.");
  }

  const merchandises = await Merchandise.find({ _id: id });

  if (merchandises.length) {
    res.json(merchandises[0]);
  } else {
    throw new Error("No merchandise found.");
  }
});

/**
 * @desc: Update Merchandise Details
 * @route: PUT /api/merchandise/:id
 * @access: Private
 */
const updateMerchandiseDetails = expressAsync(async (req, res) => {
  const merchandiseId = req.params.id;
  const { name, points, image } = req.body;

  // Check if any of the required fields are empty
  if (!name || !points) {
    res.status(400).json({
      error: "required_validation",
      message: "Fields are required.",
    });
    return;
  }

  const merchandise = await Merchandise.findById(merchandiseId);

  /** Upload avatar to cloudinary */
  let merchandiseImage;
  try {
    merchandiseImage = await cloudinary.v2.uploader.upload(req.file?.path, {
      folder: "merchandises",
      use_filename: true,
    });
  } catch (error) {
    merchandiseImage = image || "";
  }

  if (merchandise) {
    merchandise.name = name;
    merchandise.points = points;
    merchandise.image =
      typeof req.body.image === "string"
        ? req.body.image
        : merchandiseImage.secure_url
        ? merchandiseImage.secure_url
        : merchandise.image;

    const updatedMerchandise = await merchandise.save();
    res.json(updatedMerchandise);
  } else {
    res.status(404);
    throw new Error("Merchandise not found");
  }
});

/**
 * @desc: Update Merchandise Status
 * @route: PUT /api/merchandise/:id?status=true
 * @access: Private
 */
const updateMerchandiseStatus = expressAsync(async (req, res) => {
  const merchandiseId = req.params.id;
  const status = req.query.status;

  // Check if status is empty
  if (isFieldEmpty(status)) {
    res.status(400).json({
      error: "required_validation",
      message: "Status is required.",
    });
    return;
  }

  const merchandise = await Merchandise.findById(merchandiseId);

  if (merchandise) {
    merchandise.status = status;

    const updatedMerchandise = await merchandise.save();
    res.json(updatedMerchandise);
  } else {
    res.status(404);
    throw new Error("Merchandise not found");
  }
});

/**
 * @desc: Update Merchandise Status
 * @route: PUT /api/merchandise/:id?status=true
 * @access: Private
 */
const redeemMerchandise = expressAsync(async (req, res, next) => {
  const { name, address, phoneNumber, emailAddress, remarks, userGuid } =
    req.body;
  const { merchandiseId } = req.params;

  // Check fields if empty
  if (
    !merchandiseId ||
    !name ||
    !address ||
    !phoneNumber ||
    !emailAddress ||
    !userGuid
  ) {
    res.status(400).json({
      error: "required_validation",
      message: "Fields are required.",
    });
    return;
  }

  const merchandise = await Merchandise.find({
    _id: merchandiseId,
  });

  if (merchandise.length) {
    const newOrder = new Orders({
      userGuid,
      merchandiseId,
      points: merchandise[0].points,
      status: "PENDING",
      name,
      emailAddress,
      phoneNumber,
      address,
      remarks,
    });

    const redeemedPoints = new RedeemedPoints({
      userGuid,
      points: merchandise[0].points,
      type: "MERCHANDISE_ORDER",
    });

    await redeemedPoints.save();
    await newOrder.save();

    next();
  }
});

/**
 * @desc: send Merchandise notification email to Admin
 * @route: Get /api/subscription/redeem-merch/
 * @access: Private
 */

const emailRedeemMerchNotif = expressAsync(async (req, res) => {
  const mailSubject = "Merchandise Ship Request";
  const { emailAddress, name, note, shipAddr } = req.body;
  const { merchandiseId } = req.params;

  const subscriber = await User.findOne({ userGuid: req.body.userGuid });
  subscriber.email = emailAddress;

  const admin = await User.find({
    isAdmin: true,
  });

  const merchandise = await Merchandise.find({
    _id: merchandiseId,
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

  const recipients = [subscriber, ...admin];

  try {
    const emailPromise = recipients.map((user) => {
      const subscriberName = name;
      let recipientEmail = user.email;

      let mailContent;

      if (user.isAdmin) {
        mailContent = merchandiseAdminNotif({
          subscriberName,
          dateRequested,
          note,
          shipAddr,
          ...merchandiseData,
        });
      } else {
        mailContent = merchandiseSubscriberNotif({
          dateRequested,
          shipDate,
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
          console.log("failed sending");
          res.status(500);
          console.log(error);
          throw new Error("Error occured in submission.");
        });
    });

    Promise.all(emailPromise).then(() => {
      res.send({ message: resultMsg, success: true });
    });
  } catch (error) {
    res.status(500).send(API_RES_FAIL(error));
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

export {
  createMerchandise,
  deleteMerchandise,
  getMerchandise,
  getMerchandiseById,
  updateMerchandiseDetails,
  updateMerchandiseStatus,
  redeemMerchandise,
  emailRedeemMerchNotif,
};
