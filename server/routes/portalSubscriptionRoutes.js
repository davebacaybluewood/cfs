import express from "express";
import {
  subscribeFreeTrial,
  getAllSubscribeFreeTrial,
  getTrialNumberOfDays,
} from "../controllers/portalSubscriptionController.js";
import {
  protect,
  subscriberAuth,
  adminAuth,
  agentAuth,
} from "../middleware/authMiddleware.js";
import { API_RES_FAIL, ROLES } from "../constants/constants.js";

const router = express.Router();

router
  .route("/free-trial")
  .post(protect, subscriberAuth, subscribeFreeTrial)
  .get(
    protect,
    (req, res, next) => {
      let role = ROLES[req.query.position];

      try {
        switch (role) {
          case ROLES.ROLE_MASTER_ADMIN:
            adminAuth(req, res, next);
            break;
          case ROLES.ROLE_AGENT:
            agentAuth(req, res, next);
            break;
          default:
            res.status(401).send(API_RES_FAIL("Unauthorized access"));
            break;
        }
      } catch (error) {
        res.status(401).send(API_RES_FAIL());
      }
    },
    getAllSubscribeFreeTrial
  );

router.route("/free-trial/:userGuid").get(protect, getTrialNumberOfDays);

export default router;
