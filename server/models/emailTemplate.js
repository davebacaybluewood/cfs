import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    keyword: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const emailTemplateModel = mongoose.Schema(
  {
    userGuid: {
      type: String,
      required: true,
    },
    hierarchyCode: {
      type: String,
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
    settings: {
      type: [String],
    },
    categories: {
      type: [categorySchema],
    },
  },
  {
    timestamps: true,
  }
);

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateModel);

export default EmailTemplate;
