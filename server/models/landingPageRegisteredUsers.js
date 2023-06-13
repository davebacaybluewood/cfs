import mongoose from "mongoose";

const landingPageRegisteredUsersModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    pageId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LandingPage = mongoose.model("LandingPageRegisteredUsers", landingPageRegisteredUsersModel);

export default LandingPage;
