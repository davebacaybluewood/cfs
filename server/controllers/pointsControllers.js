import Points from "../models/pointsModel.js";
import RedeeemPoints from "../models/redeemedPointsModel.js";
import subscriberServices from "../services/subscriberServices.js";

const getPointsByUserGuid = async (req, res, next) => {
  const { userGuid } = req.params;

  if (!userGuid) {
    res.status(401).json({
      message: "[Points] Params is required.",
      success: false,
    });
    return;
  }

  const points = await Points.find({ userGuid });
  let totalPoints = 0;
  points.forEach((item) => {
    totalPoints += parseInt(item.points);
  });

  const redeemedPoints = await RedeeemPoints.find({ userGuid });
  let totalRedeemedPoints = 0;
  redeemedPoints.forEach((item) => {
    totalRedeemedPoints += parseInt(item.points);
  });

  const response = {
    totalPoints: parseInt(totalPoints - totalRedeemedPoints),
    points,
    redeemedPoints,
    totalRedeemedPoints,
  };

  res.json(response);
};

const getSubscribersByUserGuid = async (req, res, next) => {
  const { userGuid } = req.params;

  if (!userGuid) {
    res.status(401).json({
      message: "[Points] Params is required.",
      success: false,
    });
    return;
  }

  const subscribers = await subscriberServices.fetchSubscribersByUser(userGuid);

  res.json({
    totalSubscribers: subscribers.length,
    subscribers,
  });
};

export default {
  getPointsByUserGuid,
  getSubscribersByUserGuid,
};
