import Mission from "../../models/events/missionModel.js";
import expressAsync from "express-async-handler";
import cloudinaryImport from "../../utils/cloudinary.js";
import { API_RES_FAIL, API_RES_OK } from "../../constants/constants.js";
import Agent from "../../models/agentModel.js";

/**
 * @desc: CREATE  mission agent
 * @route: POST /api/mission
 * @acess: Private
 */
const agentMissionRegistration = expressAsync(async (req, res) => {
  const { emailAddress, state, zipCode, birthDate } = req.body;
  try {
    /** Check if the email is existing. */
    const agent = await Agent.findOne({
      emailAddress,
    });

    if (!agent.emailAddress) {
      res.status(400).json(API_RES_FAIL("Error Occured"));
    }

    /* Checks if Fields are empty */

    const validation = !state || !zipCode || !birthDate;

    if (validation) {
      res.status(400).json(API_RES_FAIL("Fields are required"));
      return;
    }

    /** Upload image to cloudinary */
    let profileImgResult;
    try {
      profileImgResult = await cloudinaryImport.v2.uploader.upload(
        req.file?.path,
        {
          folder: "agent-avatars",
          use_filename: true,
        }
      );
    } catch (error) {
      console.log(error);
      profileImgResult = agent.avatar;
    }

    const avatar = profileImgResult.secure_url
      ? profileImgResult.secure_url
      : profileImgResult;

    /* Update userGuid */
    agent.state = state;
    agent.zipCode = zipCode;
    agent.birthDate = birthDate;
    agent.avatar = avatar;

    await agent.save();
    const mission = new Mission({
      userGuid: agent.userGuid,
    });

    if (mission) {
      await mission.save();
      res.json(API_RES_OK("[Agents] Registration Success"));
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error Occured");
  }
});

export { agentMissionRegistration };
