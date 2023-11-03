import expressAsync from "express-async-handler";
import { API_RES_OK, API_RES_FAIL, ROLES } from "../constants/constants.js";
import PortalSubscription from "../models/portalSubscription.js";
import Agent from "../models/agentModel.js";
import subscriberServices from "../services/subscriberServices.js";

/* @desc:  Subscribe Free Trial
 * @route: POST /api/portal-subscription/free-trial
 * @access: Private
 */
const subscribeFreeTrial = expressAsync(async (req, res) => {
  const { userGuid } = req.body;

  if (userGuid) {
    const subscription = new PortalSubscription({
      userGuid: userGuid,
    });

    await subscription.save();

    res.send(API_RES_OK("Subscription success"));
  } else {
    res.status(400).send(API_RES_FAIL("Failed to create Free trial"));
  }
});

/* @desc: Fetch Portal Subscription Details with Agent Information
 * @route: GET /api/portal-subscription/free-trial
 * @access: Private
 */

const getAllSubscribeFreeTrial = expressAsync(async (req, res) => {
  let subscribers;
  const { userGuid } = req.body;
  const role = ROLES[req.query.position];

  try {
    switch (role) {
      case ROLES.ROLE_MASTER_ADMIN:
        subscribers = await subscriberServices.fetchAllSubscribers();
        break;
      case ROLES.ROLE_AGENT:
        subscribers = await subscriberServices.fetchSubscribersByUser(userGuid);
        break;
      default:
        res.status(401).send(API_RES_FAIL("Unauthorized access"));
        break;
    }

    let userGuidList = subscribers.map((sub) => {
      return sub.userGuid;
    });

    const usersData = await PortalSubscription.aggregate([
      {
        $match: {
          userGuid: { $in: [userGuidList] },
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "agent",
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "uplineUserGuid",
          foreignField: "userGuid",
          as: "upline",
        },
      },
      {
        $set: {
          firstName: {
            $first: "$agent.firstName",
          },
          lastName: {
            $first: "$agent.lastName",
          },
          emailAddress: {
            $first: "$agent.emailAddress",
          },
        },
      },
      {
        $unset: "agent",
      },
      {
        $addFields: {
          expirationDate: {
            $dateAdd: { startDate: "$createdAt", unit: "month", amount: 1 },
          },
        },
      },
      {
        $addFields: {
          daysRemaining: {
            $max: [
              0,
              {
                $dateDiff: {
                  startDate: new Date(),
                  endDate: "$expirationDate",
                  unit: "day",
                },
              },
            ],
          },
        },
      },

      {
        $set: {
          uplineFirstName: { $first: "$upline.firstName" },
          uplinelastName: { $first: "$upline.lastName" },
        },
      },
      {
        $unset: ["upline", "__v", "updatedAt"],
      },
    ]);

    console.log("usersData", usersData);
    if (usersData.length === 0) {
      return res.status(404).send(API_RES_FAIL("No agent data found"));
    }

    res.json(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send(API_RES_FAIL("Server error encountered"));
  }
});

export { subscribeFreeTrial, getAllSubscribeFreeTrial };
