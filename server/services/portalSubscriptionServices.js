import { API_RES_FAIL } from "../constants/constants.js";
import PortalSubscription from "../models/portalSubscription.js";

const getTrialNumberOfDays = async (userGuid) => {
  if (!userGuid) {
    res.status(401).json(API_RES_FAIL("Invalid Params"));
    return;
  }

  const subscription = await PortalSubscription.findOne({
    userGuid: userGuid,
  });

  const subscribedDate = new Date(subscription.createdAt);
  const expirationDate = new Date(
    subscribedDate.setDate(subscribedDate.getDate() + 30)
  );
  const currentDate = new Date();

  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs((expirationDate - currentDate) / oneDay)
  );
  return {
    remainingDays: diffDays,
    expirationDate,
  };
};

export default {
  getTrialNumberOfDays,
};
