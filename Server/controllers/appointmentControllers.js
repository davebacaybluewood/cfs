import Agents from "../models/agentModel.js";
import expressAsync from "express-async-handler";
import {
  AGENT_STATUSES,
  APPOINTMENT_TYPES,
  ROLES,
} from "../constants/constants.js";
import AgentAppointment from "../models/agentAppointment.js";

/**
 * @desc: Fetch all agents in appointments
 * @route: GET /api/appointments
 * @acess: Private
 */
const getAgentAppointments = expressAsync(async (req, res) => {
  const status = req.query.status;
  const type = req.query.type;

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

  const filteredAppointmentOptions = type
    ? {
        appointment_type:
          type === APPOINTMENT_TYPES.WEBINAR
            ? APPOINTMENT_TYPES.WEBINAR
            : APPOINTMENT_TYPES.PAW,
      }
    : {};

  const agents = await Agents.find(filteredAgentOptions);
  const appointments = await AgentAppointment.find(filteredAppointmentOptions);

  const data = agents
    .map((agent) => {
      const noOfAppointments = () => {
        const appointment = appointments
          .map((apData) => {
            console.log(apData);
            return apData.agentGuid === agent.userGuid;
          })
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
    .filter((data) => data.numberOfAppointments !== 0);

  const filteredAgents = {
    data: data,
    totalRecords: data.length,
  };

  res.json(filteredAgents);
});

export { getAgentAppointments };
