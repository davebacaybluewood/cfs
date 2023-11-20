import mongoose from "mongoose";

const missionSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Mission = mongoose.model("Mission", missionSchema);

export default Mission;
