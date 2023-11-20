import expressAsync from "express-async-handler";
import {
  fetchUnitedNations,
  fetchOneYearTeam,
  checkMasterAgent,
} from "../services/achievementServices.js";
import { API_RES_FAIL } from "../constants/constants.js";

/**
 * @desc:  Get achievement by UserGuid
 * @route: GET /api/achievements/united-nations
 * @params: total: int => sets the condition for total leads to achieve
 * @access: Private
 */

const getUnitedNations = expressAsync(async (req, res) => {
  const total = req.query.total ?? null;
  const DEFAULT_TOTAL_LEADS = 4;

  const uniqueByNation = await fetchUnitedNations(req.user.userGuid);

  if (uniqueByNation) {
    const totalLeads = uniqueByNation.length;

    res.status(200).json({
      data: uniqueByNation,
      total: totalLeads,
      isCompleted: totalLeads >= (total ?? DEFAULT_TOTAL_LEADS),
    });
  } else {
    res.status(200).json({ msg: "No leads found" });
  }
});

/**
 * @desc:  Get leads birthmonth from Jan-Dec
 * @route: GET /api/achievements/one-year-team
 * @access: Private
 */

const getOneYearTeam = expressAsync(async (req, res) => {
  const DEFAULT_TOTAL_LEADS = 12;

  const subscribers = await fetchOneYearTeam(req.user.userGuid);

  if (subscribers) {
    const totalLeads = subscribers.length;

    res.status(200).json({
      data: subscribers,
      total: totalLeads,
      isCompleted: totalLeads >= DEFAULT_TOTAL_LEADS,
    });
  } else {
    res.status(200).json({ msg: "No leads found" });
  }
});

/**
 * @desc:  Check if Agent achieved to recruit 100 downlines including direct and indirect
 * @route: GET /api/achievements/master-agent/:userGuid
 * @access: Private
 */
const getMasterAgent = expressAsync(async (req, res) => {
  const ACHIEVEMENT_COUNT = 100;

  if (!req.params.userGuid) {
    res.status(400).send(API_RES_FAIL("[Mission] Params is required!"));
    return;
  }

  const agentsData = await checkMasterAgent(req.params.userGuid);
  const recruitedAgents = agentsData[0].downlines;

  const totalLeads = recruitedAgents.length;

  res.status(200).json({
    total: totalLeads,
    isCompleted: totalLeads >= ACHIEVEMENT_COUNT,
    data: recruitedAgents,
  });
});
export { getUnitedNations, getOneYearTeam, getMasterAgent };
