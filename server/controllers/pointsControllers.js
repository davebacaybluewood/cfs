import Points from "../models/pointsModel.js";
import Hierarchy from "../models/hierarchyModel.js";
import Agents from "../models/agentModel.js";

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

  res.json({ totalPoints, points });
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

  // const subscribers = await Hierarchy.find({ recruiterUserGuid: userGuid });
  const subscribers = await Hierarchy.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "userDoc",
      },
    },
    {
      $set: {
        firstName: {
          $first: "$userDoc.firstName",
        },
        lastName: {
          $first: "$userDoc.lastName",
        },
        email: {
          $first: "$userDoc.email",
        },
      },
    },
    {
      $unset: "userDoc",
    },
  ]).skip(1);

  res.json({
    totalSubscribers: subscribers.length,
    subscribers,
  });
};

export default {
  getPointsByUserGuid,
  getSubscribersByUserGuid,
};
