import mongoose from "mongoose";

const webinarAppointmentSchema = mongoose.Schema(
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
  },
  { timestamps: true }
);

const WebinarAppointment = mongoose.model(
  "WebinarAppointment",
  webinarAppointmentSchema
);
export default WebinarAppointment;
