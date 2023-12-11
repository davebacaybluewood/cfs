import expressAsync from "express-async-handler";
import LandingPage from "../models/landingPageModel.js";
import LandingPageRegisteredUsers from "../models/landingPageRegisteredUsers.js";
import LandingPageStatistics from "../models/landingPageStatisticsModel.js";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc: Fetch all landing poages
 * @route: GET /api/landing-page
 * @acess: Public
 */
const getAllLandingPages = expressAsync(async (req, res) => {
  try {
    const landingPages = await LandingPage.find({});

    const landingPageRegisteredUsers = await LandingPageRegisteredUsers.find(
      {}
    );
    const landingPageViews = await LandingPageStatistics.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$timeSpent",
          },
        },
      },
    ]);

    const filteredData = landingPages.map((landingPage) => {
      const noOfRegistered = () => {
        const registeredUsers = landingPageRegisteredUsers
          .map((apData) => {
            return apData.pageId === landingPage.pageCustomId;
          })
          .filter((data) => data);

        return registeredUsers.length;
      };

      return {
        noOfRegisteredUsers: noOfRegistered(),
        name: landingPage.name,
        pageCustomId: landingPage.pageCustomId,
        createdAt: landingPage.createdAt,
        updatedAt: landingPage.updatedAt,
      };
    });

    res.json(filteredData);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Fetch single landing page
 * @route: GET /api/landing-page/:pageId
 * @acess: Public
 */
const getSingleLandingPage = expressAsync(async (req, res) => {
  try {
    const landingPage = await LandingPage.find({
      pageCustomId: req.params.pageId,
    });

    res.json(landingPage[0]);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create landing page
 * @route: POST /api/landing-page
 * @acess: Private
 */
const createLandingPage = expressAsync(async (req, res) => {
  try {
    const data = [
      {
        pageCustomId: "cfs-edge",
        name: "CFS Edge",
      },
      {
        pageCustomId: "cfs-advantage",
        name: "CFS Advantage",
      },
    ];
    const landingPage = await LandingPage.insertMany(data);
    res.json(landingPage);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export { getAllLandingPages, createLandingPage, getSingleLandingPage };
