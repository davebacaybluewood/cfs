import Mission from "../../models/events/missionModel.js";
import expressAsync from "express-async-handler";
import cloudinaryImport from "../../utils/cloudinary.js";
import { API_RES_FAIL } from "../../constants/constants.js";
import Agent from "../../models/agentModel.js";

/**
 * @desc: CREATE  mission agent
 * @route: POST /api/mission
 * @acess: Private
 */
const createMissionAgents = expressAsync(async (req, res) => {
  const { emailAddress, state, zipCode, birthDate, profileImage } = req.body;
  try {
    /** Check if the email is existing. */
    const agent = await Agent.findOne({
      emailAddress,
    });

    // console.log(agent);

    if (!agent.emailAddress) {
      res.status(400).json(API_RES_FAIL("Error Occured"));
    }

    /** Upload image to cloudinary */
    let profileImgResult;
    try {
      profileImgResult = await cloudinaryImport.v2.uploader.upload(
        req.file?.path,
        {
          folder: "mission-profile-images",
          use_filename: true,
        }
      );
    } catch (error) {
      profileImgResult = agent.profileImage;
    }

    /* Update userGuid */
    agent.state = state;
    agent.zipCode = zipCode;
    agent.birthDate = birthDate;
    agent.profileImage = profileImgResult.secure_url;

    await agent.save();

    const mission = new Mission({
      userGuid: agent.userGuid,
    });

    if (mission) {
      await mission.save();
      res.status(201).json(mission);
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error Occured");
  }
});

export { createMissionAgents };
