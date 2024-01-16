import expressAsync from "express-async-handler";
import emailMarketingEmail from "../emailTemplates/emailMarketingEmail.js";
import sendEmail from "../utils/sendNodeMail.js";
import BlogsAndResource from "../models/blogAndResourceModel.js";
import Agents from "../models/agentModel.js";
import EmailTemplate from "../models/emailTemplate.js";
import mongoose from "mongoose";
import undefinedValidator from "./helpers/undefinedValidator.js";
import Agent from "../models/agentModel.js";
import User from "../models/userModel.js";
import Hierarchy from "../models/hierarchyModel.js";
import generateString from "../utils/generateString.js";
import { API_RES_FAIL, PROFILE_POSITIONS } from "../constants/constants.js";
import * as es from "../services/emailServices.js";

/**
 * @desc: Send an email marketing
 * @route: POST /api/email-marketing
 * @access: Private
 */
const sendEmailMarketing = expressAsync(async (req, res, next) => {
  try {
    let sendHTMLEmail;
    const mailSubject = req.body.subject;
    const contractEmail = req.body.recipients;
    const settings = req.body.settings;
    const templateId = req.body.templateId

    const blogs = await BlogsAndResource.find().limit(5).sort({ $natural: -1 });
    const agent = await Agents.find({ userGuid: req.body.userGuid });
    const isAgent = agent.position?.some((e) => e.value === "POSITION_AGENT");

    let userGuid;
    if (isAgent) {
      userGuid = agent[0].userGuid;
    } else {
      const hierarchy = await Hierarchy.findOne({
        userGuid: req.body.userGuid,
      });

      if (hierarchy) {
        const hierarchyCode = hierarchy.hierarchyCode;
        const agentHierarchy = await Hierarchy.findOne({
          hierarchyCode,
          parent: "",
        });

        userGuid = agentHierarchy?.userGuid || agent[0].userGuid;
      } else {
        userGuid = "";
      }
    }

    const agentInfo = {
      name: agent[0].firstName
        ? agent[0].firstName + " " + agent[0].lastName
        : agent[0].name,
      bio: agent[0].bio,
      phoneNumber: agent[0].phoneNumber,
      emailAddress: agent[0].emailAddress,
      userGuid: userGuid,
      avatar: agent[0].avatar
        ? agent[0].avatar
        : "https://www.gocfs.pro/assets/others/no-image.png",
      licenseNumber: agent[0].licenseNumber,
      position: agent[0].roles[0].label,
    };

    const blogEmail = blogs?.map((data) => {
      const content = data.content
        .replace(/<[^>]*>/g, "")
        .replace("&quot;", " ");
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
                  margin-bottom: 10px;
                "
              >
                ${content.length > 250
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
                  margin-top: 10px;
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
      blogEmail: settings.includes("BLOGS") ? blogEmail.join("") : null,
      userGuid: userGuid,
      templateId
    });

    const bcc = contractEmail;

    sendHTMLEmail = sendEmail(
      agentInfo.emailAddress,
      mailSubject,
      mailContent,
      [],
      bcc
    )
      .then((request, response) => {
        response?.send("[EmailPro] has been successfully submitted.") ?? "";
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
  try {
    const {
      templateName,
      templateBody,
      templateStatus,
      isAddedByMarketing,
      subject,
      design,
      settings,
      categories,
    } = req.body;
    const { userGuid } = req.params;
    const validStatuses = ["DRAFT", "ACTIVATED", "DEACTIVATED"];

    if (
      !templateName ||
      !templateBody ||
      !userGuid ||
      !templateStatus ||
      !validStatuses.includes(templateStatus) ||
      !subject ||
      !design ||
      !categories.length
    ) {
      throw new Error("Error occured in submission.");
    }

    const hierarchyCode = generateString(6);

    const newTemplate = {
      templateName,
      templateBody,
      userGuid,
      status: templateStatus,
      isAddedByMarketing,
      subject,
      design,
      hierarchyCode,
      settings,
      categories,
    };

    const emailTemplate = new EmailTemplate(newTemplate);

    const result = await emailTemplate.save();
    res
      .status(201)
      .json({ message: "[Email Template] succcessfully added.", data: result });
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: get all available email template
 * @route: POST /api/email-marketing/template/:userGuid
 * @access: Private
 */
const getEmailTemplates = expressAsync(async (req, res, next) => {
  try {
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

    const emailTemplates = await EmailTemplate.aggregate(
      filteredAggregate
    ).sort({
      _id: -1,
    });

    const agent = await Agent.find({ userGuid });
    const agentInfo = agent[0];

    const isAdmin = agentInfo?.roles?.some((f) => {
      return f.value === "ROLE_MASTER_ADMIN";
    });

    const isFreeTrial = agentInfo?.position?.some((f) => {
      return f.value === PROFILE_POSITIONS.FREE_30DAYS_TRIAL.value;
    });

    const isAgent = agentInfo?.position?.some((f) => {
      return f.value === PROFILE_POSITIONS.AGENT.value;
    });

    const filteredEmailTemplates = emailTemplates.filter((data) => {
      const personalEmailTempaltes =
        data.isAddedByMarketing || data.userGuid === agentInfo.userGuid;

      if (isAdmin) {
        return data;
      } else if (isAgent || isFreeTrial) {
        return personalEmailTempaltes;
      }
    });

    res.json(filteredEmailTemplates);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: get all available email template
 * @route: POST /api/email-marketing/template/subscriber/:userGuid
 * @access: Private
 */
const getEmailTemplatesBySubscriber = expressAsync(async (req, res, next) => {
  try {
    const { userGuid } = req.params;
    const { status } = req.query;

    if (!userGuid) throw new Error("UserGuid not provided.");
    if (!status) throw new Error("Template status not provided.");

    /** Find the hierarchy */
    let userGuidHead;
    let agentName;
    const hierarchy = await Hierarchy.find({ userGuid });
    if (hierarchy.length > 0) {
      const hierachyCode = hierarchy[0].hierachyCode;

      /** Get the head of hierarchy to get the user guid */
      const hierarchyHead = await Hierarchy.find({ hierachyCode });
      userGuidHead = hierarchyHead[0].userGuid;

      /** Get the head information */
      const agent = await Agents.findOne({ userGuid: userGuidHead });
      if (agent) {
        agentName = agent.firstName + " " + agent.lastName;
      }
    }

    /** Get all admin userGuid */
    let adminUsers = await User.find(
      { isAdmin: true },
      { userGuid: 1, _id: 0 }
    );
    adminUsers = adminUsers.map((user) => user.userGuid).flat();

    const templates = await es.getEmailTemplates(
      [...adminUsers, userGuidHead],
      status
    );

    res.json({
      templates,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(API_RES_FAIL(err));
  }
});

/**
 * @desc: get single email template
 * @route: POST /api/email-marketing/template/:userGuid
 * @access: Private
 */
const getSingleEmailTemplate = expressAsync(async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Send an email marketing
 * @route: PUT /api/email-marketing/template/:userGuid
 * @access: Private
 */
const updateEmailTemplate = expressAsync(async (req, res, next) => {
  try {
    const { userGuid, templateId } = req.params;
    const {
      templateName,
      templateBody,
      templateStatus,
      subject,
      design,
      settings,
      categories,
    } = req.body;
    const validStatuses = ["DRAFT", "ACTIVATED", "DEACTIVATED"];

    if (
      !userGuid ||
      !templateId ||
      !templateStatus ||
      !templateBody ||
      !templateName ||
      !validStatuses.includes(templateStatus) ||
      !subject ||
      !design ||
      !categories?.length
    ) {
      throw new Error("Error occured in updating.");
    }

    const emailTemplateData = await EmailTemplate.find({
      _id: mongoose.Types.ObjectId(templateId),
      // userGuid: userGuid,
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
      emailTemplate.design = undefinedValidator(emailTemplate.design, design);
      emailTemplate.status = undefinedValidator(
        emailTemplate.status,
        templateStatus
      );
      emailTemplate.settings = settings.length
        ? settings
        : emailTemplate.settings;
      emailTemplate.categories = categories.length
        ? categories
        : emailTemplate.categories;
      emailTemplate.subject = undefinedValidator(
        emailTemplate.subject,
        subject
      );
      await emailTemplate.save();
      res.json("[Email Template] has been successfuly updated.");
    } else {
      throw new Error("Error occured in updating.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export {
  sendEmailMarketing,
  saveEmailTemplate,
  getEmailTemplates,
  getSingleEmailTemplate,
  updateEmailTemplate,
  getEmailTemplatesBySubscriber,
};
