import expressAsync from "express-async-handler";
import emailMarketingEmail from "../emailTemplates/emailMarketingEmail.js";
import sendEmail from "../utils/sendNodeMail.js";
import BlogsAndResource from "../models/blogAndResourceModel.js";
import Agents from "../models/agentModel.js";
import EmailTemplate from "../models/emailTemplate.js";
import mongoose, { mongo } from "mongoose";
import undefinedValidator from "./helpers/undefinedValidator.js";

/**
 * @desc: Send an email marketing
 * @route: POST /api/email-marketing
 * @access: Private
 */
const sendEmailMarketing = expressAsync(async (req, res, next) => {
  let sendHTMLEmail;
  const mailSubject = req.body.subject;
  const contractEmail = req.body.recipients;

  const blogs = await BlogsAndResource.find().limit(5).sort({ $natural: -1 });
  const agent = await Agents.find({ userGuid: req.body.userGuid });

  const agentInfo = {
    name: agent[0].firstName
      ? agent[0].firstName + " " + agent[0].lastName
      : agent[0].name,
    bio: agent[0].bio,
    phoneNumber: agent[0].phoneNumber,
    emailAddress: agent[0].emailAddress,
    userGuid: agent[0].userGuid,
    avatar: agent[0].avatar
      ? agent[0].avatar
      : "https://www.gocfs.pro/assets/others/no-image.png",
    licenseNumber: agent[0].licenseNumber,
    position: agent[0].roles[0].label,
  };

  const blogEmail = blogs?.map((data) => {
    const content = data.content.replace(/<[^>]*>/g, "").replace("&quot;", " ");
    const filteredTitle = data.title.split(" ").join("-").toLowerCase();
    const filteredContent = `<div style="margin-bottom: 30px">
              <h5 style="font-size: 16px; margin: 0; color: #333;">
                ${data.title}
              </h5>
              <p
                style="
                  font-family: 0;
                  font-weight: 300;
                  font-size: 12px;
                  margin-top: 5px;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                ${
                  content.length > 250
                    ? content.substring(0, 250) + "..."
                    : content
                }
              </p>
              <a
                style="
                  background-color: #0057b7;
                  color: #fff;
                  padding: 10px 20px;
                  border-radius: 2px;
                  font-size: 12px;
                "
                href="https://www.gocfs.pro/blogs/${filteredTitle}"
                >Learn More</a
              >
            </div>`;

    return filteredContent.replace(",", "");
  });

  const mailContent = emailMarketingEmail({
    agentInfo: agentInfo,
    body: req.body.emailBody,
    blogEmail: blogEmail.join(""),
  });

  const bcc = contractEmail;

  try {
    sendHTMLEmail = sendEmail(
      agentInfo.emailAddress,
      mailSubject,
      mailContent,
      [],
      bcc
    )
      .then((request, response) => {
        response?.send("[Email Marketing] has been successfully submitted.") ??
          "";
      })
      .catch((error) => {
        res.status(500);
        console.log(error);
        throw new Error("Error occured in submission.");
      });

    res.send(sendHTMLEmail);
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error occured in submission.");
  }
});

/**
 * @desc: add email template
 * @route: POST /api/email-marketing/template
 * @access: Private
 */
const saveEmailTemplate = expressAsync(async (req, res, next) => {
  const {
    templateName,
    templateBody,
    templateStatus,
    isAddedByMarketing,
    subject,
  } = req.body;
  const { userGuid } = req.params;
  const validStatuses = ["DRAFT", "ACTIVATED", "DEACTIVATED"];

  if (
    !templateName ||
    !templateBody ||
    !userGuid ||
    !templateStatus ||
    !isAddedByMarketing ||
    !validStatuses.includes(templateStatus) ||
    !subject
  ) {
    throw new Error("Error occured in submission.");
  }

  const newTemplate = {
    templateName,
    templateBody,
    userGuid,
    status: templateStatus,
    isAddedByMarketing,
    subject,
  };

  const emailTemplate = new EmailTemplate(newTemplate);

  await emailTemplate.save();
  res.status(201).json("[Email Template] succcessfully added.");
});

/**
 * @desc: get all available email template
 * @route: POST /api/email-marketing/template/:userGuid
 * @access: Private
 */
const getEmailTemplates = expressAsync(async (req, res, next) => {
  const { userGuid } = req.params;
  const { status } = req.query;

  if (!userGuid) {
    throw new Error("Error occured in fetching.");
  }

  const statusCondition = status
    ? {
        $match: {
          $or: [
            {
              $and: [
                { userGuid: { $eq: userGuid } },
                { status: { $eq: status } },
              ],
            },
            { isAddedByMarketing: true, status: "ACTIVATED" },
          ],
        },
      }
    : {
        $match: {
          $or: [
            {
              status: {
                $in: ["ACTIVATED", "DRAFT", "DEACTIVATED"],
              },
            },
          ],
        },
      };
  const filteredAggregate = [
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "templateDoc",
      },
    },
    {
      $set: {
        authorName: {
          $first: "$templateDoc.name",
        },
        authorThumbnail: {
          $first: "$templateDoc.avatar",
        },
        authorFirstname: {
          $first: "$templateDoc.firstName",
        },
        authorLastname: {
          $first: "$templateDoc.lastName",
        },
      },
    },
    statusCondition,
    {
      $unset: "templateDoc",
    },
  ];

  const emailTemplates = await EmailTemplate.aggregate(filteredAggregate).sort({
    _id: -1,
  });

  res.json(emailTemplates);
});

/**
 * @desc: get single email template
 * @route: POST /api/email-marketing/template/:userGuid
 * @access: Private
 */
const getSingleEmailTemplate = expressAsync(async (req, res, next) => {
  const { userGuid, templateId } = req.params;

  if (!userGuid || !templateId) {
    throw new Error("Error occured in fetching.");
  }

  const emailTemplate = await EmailTemplate.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(templateId) },
    },
    {
      $lookup: {
        from: "agents",
        localField: "userGuid",
        foreignField: "userGuid",
        as: "templateDoc",
      },
    },
    {
      $set: {
        authorName: {
          $first: "$templateDoc.name",
        },
        authorThumbnail: {
          $first: "$templateDoc.avatar",
        },
        authorFirstname: {
          $first: "$templateDoc.firstName",
        },
        authorLastname: {
          $first: "$templateDoc.lastName",
        },
      },
    },
    {
      $unset: "templateDoc",
    },
  ]);

  if (!emailTemplate.length) {
    throw new Error("No data available.");
  } else {
    res.json(emailTemplate[0]);
  }
});

/**
 * @desc: Send an email marketing
 * @route: PUT /api/email-marketing/template/:userGuid
 * @access: Private
 */
const updateEmailTemplate = expressAsync(async (req, res, next) => {
  const { userGuid, templateId } = req.params;
  const { templateName, templateBody, templateStatus, subject } = req.body;
  const validStatuses = ["DRAFT", "ACTIVATED", "DEACTIVATED"];

  if (
    !userGuid ||
    !templateId ||
    !templateStatus ||
    !templateBody ||
    !templateName ||
    !validStatuses.includes(templateStatus) ||
    !subject
  ) {
    throw new Error("Error occured in updating.");
  }

  const emailTemplateData = await EmailTemplate.find({
    _id: mongoose.Types.ObjectId(templateId),
    userGuid: userGuid,
  });

  const emailTemplate = emailTemplateData[0];

  if (emailTemplateData.length) {
    emailTemplate.templateName = undefinedValidator(
      emailTemplate.templateName,
      templateName
    );
    emailTemplate.templateBody = undefinedValidator(
      emailTemplate.templateBody,
      templateBody
    );
    emailTemplate.status = undefinedValidator(
      emailTemplate.status,
      templateStatus
    );
    emailTemplate.subject = undefinedValidator(emailTemplate.subject, subject);
    await emailTemplate.save();
    res.json("[Email Template] has been successfuly updated.");
  } else {
    throw new Error("Error occured in updating.");
  }
});

export {
  sendEmailMarketing,
  saveEmailTemplate,
  getEmailTemplates,
  getSingleEmailTemplate,
  updateEmailTemplate,
};
