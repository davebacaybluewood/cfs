import mongoose from "mongoose";

const eventsRSVPModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
    },
    recruiterUserGuid: {
      type: String,
    },
    eventId: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventsRSVP = mongoose.model("EventsRSVP", eventsRSVPModel);

export default EventsRSVP;
