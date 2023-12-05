import expressAsync from "express-async-handler";
import WebinarStatistics from "../models/webinarStatisticsModel.js";
import LandingPageStatistics from "../models/landingPageStatisticsModel.js";

/**
 * @desc: Get all statistics
 * @route: GET /api/webinar-clicks-statistics/:webinarGuid/:userGuid
 * @acess: Private
 */
const getWebinarClicks = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.params.webinarGuid;
    const userGuid = req.params.userGuid;

    const webinars = await WebinarStatistics.find({
      webinarGuid,
      userGuid,
    }).count();

    res.json(webinars);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Get all webinar visits
 * @route: GET /api/webinar-clicks-statistics/:webinarGuid
 * @acess: Private Admin
 */
const getAdminWebinarVisitsCount = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.params.webinarGuid;

    const webinars = await WebinarStatistics.find({
      webinarGuid,
    }).count();

    res.json(webinars);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Insert the click data
 * @route: POST /api/webinar-clicks-statistics/:webinarGuid/:userGuid
 * @acess: Public
 */
const createWebinarClick = expressAsync(async (req, res) => {
  try {
    const webinarGuid = req.params.webinarGuid;
    const userGuid = req.params.userGuid;

    let webinar = new WebinarStatistics({
      webinarGuid,
      userGuid,
    });

    webinar.save();

    res.json(webinar);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create a landing page view
 * @route: POST /api/landing-page-statistics/:userGuid/:pageId
 * @acess: Public
 */
const createLandingPageView = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;
    const pageId = req.params.pageId;
    const timeTracker = req.body.timeTracker;
    const timeSpent = req.body.timeSpent;

    let landingPageView = new LandingPageStatistics({
      pageId,
      userGuid,
      timeTracker,
      timeSpent,
    });

    landingPageView.save();

    res.json(landingPageView);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export { createLandingPageView };
