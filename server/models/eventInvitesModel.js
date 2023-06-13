import mongoose from "mongoose";

const eventInvitesModel = mongoose.Schema(
  {
    date: {
      type: String,
      required: false,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Events",
    },
    invitee: {
      type: String,
    },
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    agentNumber: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EventInvites = mongoose.model("EventInvites", eventInvitesModel);

export default EventInvites;
