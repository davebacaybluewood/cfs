import mongoose from "mongoose";

const leadsSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    agentUserGuid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Leads = mongoose.model("Leads", leadsSchema);

export default Leads;
