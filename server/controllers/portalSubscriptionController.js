import expressAsync from "express-async-handler";
import { API_RES_OK, API_RES_FAIL } from "../constants/constants.js";
import PortalSubscription from "../models/portalSubscription.js";

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

export { subscribeFreeTrial };
