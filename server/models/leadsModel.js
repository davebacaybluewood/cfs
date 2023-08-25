import mongoose from "mongoose";

const leadsSchema = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
      unique: true,
    },    
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    agentUserGuid: {
        type: String,
        required: true,
        unique: true,
      },    
  },
  { timestamps: true }
);

const Leads = mongoose.model("Leads", leadsSchema);

export default Leads;
