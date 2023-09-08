import mongoose from "mongoose";

const emailTemplateModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    templateBody: {
      type: String,
      required: true,
    },
    templateName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVATED", "DEACTIVATED"],
    },
    subject: {
      type: String,
      required: true,
    },
    design: {
      type: String,
      required: true,
    },
    isAddedByMarketing: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateModel);

export default EmailTemplate;
