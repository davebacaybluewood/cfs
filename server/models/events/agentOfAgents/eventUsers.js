import mongoose from "mongoose";

const eventUsersSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventUsers = mongoose.model("EventUsers", eventUsersSchema);

export default EventUsers;
