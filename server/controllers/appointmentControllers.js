import Agents from "../models/agentModel.js";
import expressAsync from "express-async-handler";
import {
  AGENT_STATUSES,
  APPOINTMENT_STATUSES,
  APPOINTMENT_TYPES,
  ROLES,
  API_RES_FAIL,
} from "../constants/constants.js";
import AgentAppointment from "../models/agentAppointment.js";

/**
 * @desc: Fetch all agents in appointments
 * @route: GET /api/appointments
 * @acess: Private
 */
const getAllAgentAppointments = expressAsync(async (req, res) => {
  try {
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
    const appointments = await AgentAppointment.find(
      filteredAppointmentOptions
    );

    const data = agents
      .map((agent) => {
        const noOfAppointments = () => {
          const appointment = appointments
            .map((apData) => {
              return apData.agentGuid === agent.userGuid;
            })
            .filter((data) => data);

          return appointment.length;
        };
        return {
          _id: agent._id,
          agentGuid: agent.userGuid,
          avatar: agent.avatar ? agent.avatar : "/assets/others/no-image.png",
          name:
            !agent.firstName && !agent.lastName
              ? agent?.name
              : agent?.firstName + " " + agent?.lastName,
          emailAddress: agent.emailAddress,
          numberOfAppointments: noOfAppointments(),
          title: agent.roles[0],
        };
      })
      .filter((data) => data.numberOfAppointments !== 0);

    const filteredAgents = {
      data: data,
      totalRecords: data.length,
    };

    res.json(filteredAgents);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const getAgentAppointments = expressAsync(async (req, res) => {
  try {
    const agentId = req.params.agentId;
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
              : type === APPOINTMENT_TYPES.WEBINAR
              ? APPOINTMENT_TYPES.PAW
              : "",
        }
      : {};

    const agents = await Agents.find({
      // filteredAgentOptions,
      userGuid: agentId,
    });

    console.log(agents);
    const appointments = await AgentAppointment.find(
      filteredAppointmentOptions
    );

    const data = agents
      .map((agent) => {
        const noOfAppointments = () => {
          const appointment = appointments
            .map((apData) => {
              return apData.agentGuid === agent.userGuid;
            })
            .filter((data) => data);

          return appointment.length;
        };
        return {
          _id: agent._id,
          agentGuid: agent.userGuid,
          avatar: agent.avatar ? agent.avatar : "/assets/others/no-image.png",
          name:
            !agent.firstName && !agent.lastName
              ? agent?.name
              : agent?.firstName + " " + agent?.lastName,
          emailAddress: agent.emailAddress,
          numberOfAppointments: noOfAppointments(),
          title: agent.roles[0],
        };
      })
      .filter((data) => data.numberOfAppointments !== 0);

    const filteredAgents = {
      data: data,
      totalRecords: data.length,
    };

    res.json(filteredAgents);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const getScheduleAppointments = expressAsync(async (req, res) => {
  try {
    const agentGuid = req.params.agentGuid;
    const webinarGuid = req.params.webinarGuid;

    const filteredAppointmentsForWebinars = {
      agentGuid,
      webinarGuid,
    };

    const filteredAppointmentsForPaw = {
      agentGuid,
      appointment_type: "PAW",
    };

    const appointments = await AgentAppointment.find(
      webinarGuid === "PAW"
        ? filteredAppointmentsForPaw
        : filteredAppointmentsForWebinars
    );

    res.json(appointments);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const getSingleAppointment = expressAsync(async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointment = await AgentAppointment.findById(appointmentId);

    res.json(appointment);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

const cancelAppointment = expressAsync(async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await AgentAppointment.findById(appointmentId);

    if (appointment) {
      appointment.name = appointment.name;
      appointment.state = appointment.state;
      appointment.email = appointment.email;
      appointment.webinarGuid = appointment.webinarGuid;
      appointment.agentGuid = appointment.agentGuid;
      appointment.calendly_start_time = appointment.calendly_start_time;
      appointment.calendly_end_time = appointment.calendly_end_time;
      appointment.calendly_timezone = appointment.calendly_timezone;
      appointment.calendly_status =
        APPOINTMENT_STATUSES.CANCELLED.toLowerCase();
      appointment.calendly_uri = appointment.calendly_uri;
      appointment.calendly_name = appointment.calendly_name;
      appointment.calendly_email = appointment.calendly_email;
      appointment.calendly_created_at = appointment.calendly_created_at;
      appointment.appointment_type = appointment.appointment_type;
      appointment.calendly_notes = appointment.calendly_notes;
      appointment.meeting_link = appointment.meeting_link ?? "";

      const updatedAppointment = await appointment.save();
      res.status(200).json(updatedAppointment);
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Get the number of appointments per webinar
 * @route: GET /api/webinar-statistics/appointment-count/:webinarGuid
 * @acess: Private
 */
const getWebinarNumberOfAppointments = expressAsync(async (req, res) => {
  try {
    const { webinarGuid } = req.params;

    const webinarAppointments = await AgentAppointment.find({
      webinarGuid,
    }).count();

    res.status(200).json(webinarAppointments);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export {
  getAllAgentAppointments,
  getAgentAppointments,
  getScheduleAppointments,
  getSingleAppointment,
  cancelAppointment,
  getWebinarNumberOfAppointments,
};
