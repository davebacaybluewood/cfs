import express from "express";
import channelControllers from "../controllers/channelControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/channels/")
  .post(protect, async (req, res, next) => {
    await channelControllers.createChannel(req, res, next);
  })
  .get(protect, async (req, res, next) => {
    await channelControllers.getAllChannels(req, res, next);
  });

router
  .route("/channels/:channelId")
  .delete(protect, async (req, res, next) => {
    await channelControllers.deleteChannel(req, res, next);
  })
  .put(protect, async (req, res, next) => {
    await channelControllers.updateChannelByChannelId(req, res, next);
  });
router
  .route("/channels/:hierarchyCode/hierarchy-code")
  .get(protect, async (req, res, next) => {
    await channelControllers.getAllChannelsByHierarchyCode(req, res, next);
  });

router
  .route("/channels/:userGuid/user-channels")
  .get(protect, async (req, res, next) => {
    await channelControllers.getAllChannelsByUserGuid(req, res, next);
  });

export default router;
