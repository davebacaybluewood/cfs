import EventUser from "../../models/events/agentOfAgents/eventUsers.js";
import expressAsync from "express-async-handler";
import cloudinaryImport from "../../utils/cloudinary.js";
import { API_RES_FAIL, API_RES_OK } from "../../constants/constants.js";
import Agent from "../../models/agentModel.js";

/**
 * @desc: CREATE  mission agent
 * @route: POST /api/mission/registration
 * @acess: Private
 */
const agentMissionRegistration = expressAsync(async (req, res) => {
  const { emailAddress, state, zipCode, birthDate } = req.body;
  try {
    /* Checks if Fields are empty */

    const validation = !state || !zipCode || !birthDate;

    if (validation) {
      res.status(400).json(API_RES_FAIL("Fields are required"));
      return;
    }

    /** Check if the email is existing. */
    const agent = await Agent.findOne({
      emailAddress,
    });

    if (!agent) {
      res.status(400).json(API_RES_FAIL("[Agents] Agent not found"));
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
    const eventUser = new EventUser({
      userGuid: agent.userGuid,
    });

    if (eventUser) {
      await eventUser.save();
      res.status(200).json(API_RES_OK("[Agents] Registration Success"));
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(API_RES_FAIL(error));
  }
});

/**
 * @desc: Check agent mission registration
 * @route: GET /api/mission
 * @acCess: Private
 */

const getAgentMissionRegistration = expressAsync(async (req, res) => {
  const { userGuid } = req.params;

  if (!req.params.userGuid) {
    res
      .status(400)
      .json(
        API_RES_FAIL(
          "[Agents] Failed  to get mission registration. UserGuid is required"
        )
      );
    return;
  }

  try {
    const registration = await EventUser.findOne({ userGuid: userGuid });

    if (registration)
      res.status(200).json(API_RES_OK("Agent already registered"));
    else {
      res.status(400).json(API_RES_FAIL("Not yet registered"));
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(API_RES_FAIL(error));
  }
});

export { agentMissionRegistration, getAgentMissionRegistration };
