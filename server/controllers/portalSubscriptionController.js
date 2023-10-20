import expressAsync from "express-async-handler";
import { API_RES_OK, API_RES_FAIL } from "../constants/constants.js";
import PortalSubscription from "../models/portalSubscription.js";
import Agent from "../models/agentModel.js";

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
  try {
    const usersData = await PortalSubscription.aggregate([
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "agent",
        },
      },
      {
        $unwind: {
          path: "$agent",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          userGuid: 1,
          dateCreated: "$createdAt",
          daysRemaining: {
            $max: [
              0,
              {
                $floor: {
                  $divide: [
                    {
                      $subtract: [
                        {
                          $add: ["$createdAt", 30 * 24 * 60 * 60 * 1000],
                        },
                        new Date(),
                      ],
                    },
                    24 * 60 * 60 * 1000,
                  ],
                },
              },
            ],
          },
          firstName: {
            $ifNull: ["$agent.firstName", "Agent not found"],
          },
          lastName: {
            $ifNull: ["$agent.lastName", "Agent not found"],
          },
          emailAddress: {
            $ifNull: ["$agent.emailAddress", "Agent not found"],
          },
        },
      },
    ]);

    if (usersData.length === 0) {
      return res.status(404).send(API_RES_FAIL("No agent data found"));
    }

    res.json(usersData);
  } catch (error) {
    res.status(500).send(API_RES_FAIL("Server error encountered"));
  }
});

export { subscribeFreeTrial, getAllSubscribeFreeTrial };
