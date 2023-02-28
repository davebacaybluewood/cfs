import Agents from "../models/agentModel.js";
import expressAsync from "express-async-handler";
import { AGENT_STATUSES, ROLES } from "../constants/constants.js";
import AgentAppointment from "../models/agentAppointment.js";

/**
 * @desc: Fetch all agents in appointments
 * @route: GET /api/appointments
 * @acess: Private
 */
const getAgentAppointments = expressAsync(async (req, res) => {
  const status = req.query.status;

  const filteredAgentOptions = {
    role: ROLES.ROLE_AGENT,
    status: status ? status : undefined,
  };

  /** Remove the status key if status is falsy */
  for (let i in filteredAgentOptions) {
    if (!filteredAgentOptions[i]) {
      delete filteredAgentOptions[i];
    }
  }

  const agents = await Agents.find(filteredAgentOptions);
  const appointments = await AgentAppointment.find({});

  const filteredAgents = {
    totalRecords: agents.length,
    data: agents
      .map((agent) => {
        const noOfAppointments = () => {
          const appointment = appointments
            .map((apData) => apData.agentGuid === agent.userGuid)
            .filter((data) => data);

          return appointment.length;
        };
        return {
          _id: agent._id,
          agentGuid: agent.userGuid,
          avatar: agent.avatar,
          name: agent.name,
          emailAddress: agent.emailAddress,
          numberOfAppointments: noOfAppointments(),
          title: agent.title,
        };
      })
      .filter((data) => data.numberOfAppointments !== 0),
  };

  res.json(filteredAgents);
});

export { getAgentAppointments };
