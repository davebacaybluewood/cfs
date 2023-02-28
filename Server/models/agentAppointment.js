import mongoose from "mongoose";

const agentAppointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    webinarGuid: {
      type: String,
      required: true,
    },
    agentGuid: {
      type: String,
      required: true,
    },
    calendly_start_time: {
      type: String,
      required: true,
    },
    calendly_end_time: {
      type: String,
      required: true,
    },
    calendly_timezone: {
      type: String,
      required: true,
    },
    calendly_status: {
      type: String,
      required: true,
    },
    calendly_uri: {
      type: String,
      required: true,
    },
    calendly_name: {
      type: String,
      required: true,
    },
    calendly_email: {
      type: String,
      required: true,
    },
    calendly_created_at: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AgentAppointment = mongoose.model(
  "AgentAppointment",
  agentAppointmentSchema
);
export default AgentAppointment;
