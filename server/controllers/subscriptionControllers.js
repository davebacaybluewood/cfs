import expressAsync from "express-async-handler";
import Subscriptions from "../models/subscriptionModel.js";
import portalSubscriptionServices from "../services/portalSubscriptionServices.js";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc: Create a subscription
 * @route: POST /api/subscription
 * @acess: Private
 */
const createSubscription = expressAsync(async (req, res) => {
  try {
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

const getTrialHierarchyCode = async (req, res) => {
  try {
    const data = await portalSubscriptionServices.getTrialHierarchyCode(
      req,
      res,
      req.params.userGuid
    );

    if (data) {
      res.json(data);
    } else {
      res.json(API_RES_FAIL("No data"));
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
};

export {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
  getTrialHierarchyCode,
};
