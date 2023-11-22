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

eventUsersSchema.index({ userGuid: 1 }, { unique: true });
const EventUsers = mongoose.model("EventUsers", eventUsersSchema);

export default EventUsers;
