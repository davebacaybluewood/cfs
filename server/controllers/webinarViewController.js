import expressAsync from "express-async-handler";
import WebinarView from "../models/webinarViewModel.js";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc: Get all webinar view counts
 * @route: GET /api/webinar-view/:webinarGuid
 * @acess: Private
 */
const getWebinarViews = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.params.webinarGuid;
    const page = req.params.page;

    const webinars = await WebinarView.aggregate([
      {
        $match: {
          webinarGuid: webinarGuid,
          page: page,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$timeSpent",
          },
        },
      },
    ]);

    res.json(webinars[0]?.total);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Insert  data
 * @route: POST /api/webinar-view/:webinarGuid/:userGuid/
 * @acess: Public
 */
const createWebinarView = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.params.webinarGuid;
    const userGuid = req.params.userGuid;
    const timeTracker = req.params.timeTracker;
    const timeSpent = req.params.timeSpent;
    const page = req.body.page;

    console.log(req.body);

    let webinar = new WebinarView({
      webinarGuid,
      userGuid,
      timeTracker,
      timeSpent,
      page,
    });

    webinar.save();

    res.json(webinar);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export { getWebinarViews, createWebinarView };
