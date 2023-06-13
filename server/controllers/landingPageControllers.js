import expressAsync from "express-async-handler";
import LandingPage from "../models/landingPageModel.js";
import LandingPageRegisteredUsers from "../models/landingPageRegisteredUsers.js";
import LandingPageStatistics from "../models/landingPageStatisticsModel.js";

/**
 * @desc: Fetch all landing poages
 * @route: GET /api/landing-page
 * @acess: Public
 */
const getAllLandingPages = expressAsync(async (req, res) => {
  const landingPages = await LandingPage.find({});

  const landingPageRegisteredUsers = await LandingPageRegisteredUsers.find({});
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

  console.log(landingPageViews);

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
});

/**
 * @desc: Fetch single landing page
 * @route: GET /api/landing-page/:pageId
 * @acess: Public
 */
const getSingleLandingPage = expressAsync(async (req, res) => {
  const landingPage = await LandingPage.find({
    pageCustomId: req.params.pageId,
  });

  res.json(landingPage[0]);
});

/**
 * @desc: Create landing page
 * @route: POST /api/landing-page
 * @acess: Private
 */
const createLandingPage = expressAsync(async (req, res) => {
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
});

export { getAllLandingPages, createLandingPage, getSingleLandingPage };
