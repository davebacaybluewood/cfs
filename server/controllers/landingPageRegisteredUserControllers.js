import expressAsync from "express-async-handler";
import LandingPageRegisteredUsers from "../models/landingPageRegisteredUsers.js";
import LandingPage from "../models/landingPageModel.js";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc: Fetch all registered users in the landing poages
 * @route: GET /api/landing-page-registered-users
 * @acess: Public
 */
const getAllPageUserRegistered = expressAsync(async (req, res) => {
  try {
    const filteredData = await LandingPageRegisteredUsers.aggregate([
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "landingPageDoc",
        },
      },
      {
        $set: {
          agentName: {
            $first: "$landingPageDoc.name",
          },
        },
      },
      {
        $unset: "landingPageDoc",
      },
    ]);

    res.json(filteredData);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});
/**
 * @desc: Fetch all registered users in the landing poages
 * @route: GET /api/landing-page-registered-users/:pageId
 * @acess: Public
 */
const getPageRegisteredUsers = expressAsync(async (req, res) => {
  try {
    const filteredData = await LandingPageRegisteredUsers.aggregate([
      {
        $match: {
          pageId: req.params.pageId ?? "",
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "userGuid",
          foreignField: "userGuid",
          as: "landingPageDoc",
        },
      },
      {
        $set: {
          agentName: {
            $first: "$landingPageDoc.name",
          },
        },
      },
      {
        $unset: "landingPageDoc",
      },
    ]);

    res.json(filteredData);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create landing page
 * @route: POST /api/landing-page-registered-users
 * @acess: Private
 */
const updateLandingPageStatus = expressAsync(async (req, res) => {
  try {
    const agentGuid = req.params.agentGuid;
    const pageId = req.params.pageId;
    const landingPage = await LandingPage.find({ pageCustomId: pageId });

    if (landingPage.length === 0) {
      res.status(404).json();
      throw new Error("Error occured in submitting request.");
    } else {
      if (req.params.status === "activate") {
        let newData = new LandingPageRegisteredUsers({
          userGuid: agentGuid,
          pageId: pageId,
        });
        await newData.save();
        res.status(201).json(newData);
      } else {
        const deleteData = await LandingPageRegisteredUsers.deleteOne({
          userGuid: agentGuid,
          pageId: pageId,
        });
        res.status(201).json(deleteData);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in submitting request.");
  }
});

export {
  getPageRegisteredUsers,
  updateLandingPageStatus,
  getAllPageUserRegistered,
};
