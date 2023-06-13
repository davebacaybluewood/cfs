import mongoose from "mongoose";

const landingPageModel = mongoose.Schema(
  {
    pageCustomId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LandingPage = mongoose.model("LandingPageModel", landingPageModel);

export default LandingPage;
