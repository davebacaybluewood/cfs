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
    const portalSubscriptions = await PortalSubscription.find();

    if (portalSubscriptions.length === 0) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    const usersData = await Promise.all(
      portalSubscriptions.map(async (portalSubscription) => {
        const agent = await Agent.findOne({
          userGuid: portalSubscription.userGuid,
        });
        if (agent) {
          const dateCreated = portalSubscription.createdAt;
          const expirationDate = new Date(dateCreated);
          expirationDate.setDate(expirationDate.getDate() + 30);

          const currentDate = new Date();
          const daysRemaining = Math.max(
            0,
            Math.floor((expirationDate - currentDate) / (24 * 60 * 60 * 1000))
          );

          return {
            _id: portalSubscription._id,
            userGuid: portalSubscription.userGuid,
            dateCreated: dateCreated,
            expirationDate: expirationDate,
            daysRemaining: daysRemaining,
            firstName: agent.firstName,
            lastName: agent.lastName,
            emailAddress: agent.emailAddress,
          };
        }
        return {
          _id: portalSubscription._id,
          userGuid: portalSubscription.userGuid,
          dateCreated: portalSubscription.dateCreated,
          expirationDate: portalSubscription.dateCreated,
          daysRemaining: 0,
          firstName: "Agent not found",
          lastName: "Agent not found",
          emailAddress: "Agent not found",
        };
      })
    );

    res.json(usersData);
  } catch (err) {
    console.error(err);
    res.status(500).send(API_RES_FAIL("Server Error"));
  }
});

export { subscribeFreeTrial, getAllSubscribeFreeTrial };
