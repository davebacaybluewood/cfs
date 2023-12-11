import Leads from "../models/leadsModel.js";
import expressAsync from "express-async-handler";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc:  POST a Lead
 * @route: POST /api/Leads/addLeads
 * @acess: Private
 */

const addLeads = expressAsync(async (req, res) => {
  try {
    const userGuid = req.body.userGuid;
    const agentUserGuid = req.body.agentUserGuid;

    if (!userGuid || !agentUserGuid) {
      throw new Error("Error occured adding leads.");
    }

    const leads = await Leads.create({
      userGuid,
      agentUserGuid,
    });

    if (leads) {
      res.status(201).json("Lead has successfully added.");
    } else {
      res.status(400);
      throw new Error("Invalid subscriber account data");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Get Lead by UserGuid
 * @route: POST /api/Leads/user/:userGuid
 * @acess: Private
 */

const getLeadByUserGuid = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;

    if (!userGuid) {
      throw new Error("Error occured with user profile.");
    }

    const leads = await Leads.find({ userGuid: userGuid });

    if (leads) {
      res.json(leads);
    } else {
      res.status(404);
      throw new Error("Subscriber does not Exist");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc:  Get Lead by AgentUserGuid
 * @route: POST /api/Leads/agent/:agentUserGuid
 * @acess: Private
 */

const getLeadByAgentUserGuid = expressAsync(async (req, res) => {
  try {
    const agentUserGuid = req.params.agentUserGuid;

    if (!agentUserGuid) {
      throw new Error("Error occured with agent profile.");
    }

    const leads = await Leads.find({ agentUserGuid: agentUserGuid });

    if (leads.length > 0) {
      res.json(leads);
    } else {
      res.status(404);
      throw new Error("Agent does not Exist");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export { addLeads, getLeadByUserGuid, getLeadByAgentUserGuid };
