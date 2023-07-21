import Agents from "../models/agentModel.js";
import Webinars from "../models/webinarModel.js";
import expressAsync from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import undefinedValidator from "./helpers/undefinedValidator.js";
import { AGENT_STATUSES, ROLES } from "../constants/constants.js";
import User from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import agentRegistrationSuccess from "../emailTemplates/agent-registration-success.js";
import sendEmail from "../utils/sendNodeMail.js";
import agentApproved from "../emailTemplates/agent-approved.js";
import PreProfile from "../models/preProfileModel.js";
import { AGENT_ROLES } from "../constants/constants.js";

/**
 * @desc: Fetch all agents
 * @route: GET /api/agents
 * @acess: Private
 */
const getAgents = expressAsync(async (req, res) => {
  const status = req.query.status;

  const filteredAgentOptions = {
    role: ROLES.ROLE_AGENT,
    status: status ? status : undefined,
  };

  /** Remove the status key if status is falsy */
  for (let i in filteredAgentOptions) {
    if (!filteredAgentOptions[i]) {
      delete filteredAgentOptions[i];
    }
  }
  // const agents = await Agents.find(filteredAgentOptions);

  const agents = await Agents.find({
    status: status ? status : undefined,
    $or: [{ "roles.value": AGENT_ROLES[0].value }],
  });
  res.json(agents);
});

/**
 * @desc: Fetch all agent counts
 * @route: GET /api/agent-counts
 * @acess: Private
 */
const getAgentsCount = expressAsync(async (req, res) => {
  const activeAgents = await Agents.find({
    $or: [
      { "roles.value": AGENT_ROLES[0].value },
      { "roles.value": AGENT_ROLES[1].value },
      { "roles.value": AGENT_ROLES[2].value },
      { "roles.value": AGENT_ROLES[3].value },
      { "roles.value": AGENT_ROLES[4].value },
      { "roles.value": AGENT_ROLES[5].value },
      { "roles.value": AGENT_ROLES[6].value },
      { "roles.value": AGENT_ROLES[7].value },
    ],
    status: AGENT_STATUSES.ACTIVATED,
  });
  const declinedAgents = await Agents.find({
    $or: [
      { "roles.value": AGENT_ROLES[0].value },
      { "roles.value": AGENT_ROLES[1].value },
      { "roles.value": AGENT_ROLES[2].value },
      { "roles.value": AGENT_ROLES[3].value },
      { "roles.value": AGENT_ROLES[4].value },
      { "roles.value": AGENT_ROLES[5].value },
      { "roles.value": AGENT_ROLES[6].value },
      { "roles.value": AGENT_ROLES[7].value },
    ],
    status: AGENT_STATUSES.DECLINED,
  });
  const pendingAgents = await Agents.find({
    $or: [
      { "roles.value": AGENT_ROLES[0].value },
      { "roles.value": AGENT_ROLES[1].value },
      { "roles.value": AGENT_ROLES[2].value },
      { "roles.value": AGENT_ROLES[3].value },
      { "roles.value": AGENT_ROLES[4].value },
      { "roles.value": AGENT_ROLES[5].value },
      { "roles.value": AGENT_ROLES[6].value },
      { "roles.value": AGENT_ROLES[7].value },
    ],
    status: AGENT_STATUSES.PENDING,
  });
  const deactivatedAgents = await Agents.find({
    $or: [
      { "roles.value": AGENT_ROLES[0].value },
      { "roles.value": AGENT_ROLES[1].value },
      { "roles.value": AGENT_ROLES[2].value },
      { "roles.value": AGENT_ROLES[3].value },
      { "roles.value": AGENT_ROLES[4].value },
      { "roles.value": AGENT_ROLES[5].value },
      { "roles.value": AGENT_ROLES[6].value },
      { "roles.value": AGENT_ROLES[7].value },
    ],
    status: AGENT_STATUSES.DEACTIVATED,
  });
  res.json({
    activeAgents: activeAgents.length,
    declinedAgents: declinedAgents.length,
    pendingAgents: pendingAgents.length,
    deactivatedAgents: deactivatedAgents.length,
  });
});

/**
 * @desc: Fetch single agent
 * @route: GET /api/agents/:id
 * @acess: Private
 */
const getSingleAgent = expressAsync(async (req, res) => {
  const role = req.query.role;

  if (req.params.id) {
    if (role === ROLES.ROLE_MASTER_ADMIN) {
      const agent = await Agents.find({ userGuid: req.params.id });
      res.json(agent[0]);
    } else {
      const agent = await Agents.aggregate([
        {
          $match: {
            userGuid: req.params.id,
          },
        },
        {
          $project: {
            name: 1,
            userGuid: 1,
            avatar: 1,
            title: 1,
            bio: 1,
            phoneNumber: 1,
            emailAddress: 1,
            address: 1,
            twitter: 1,
            instagram: 1,
            linkedIn: 1,
            facebook: 1,
            password: 1,
            languages: 1,
            role: 1,
            roles: 1,
            status: 1,
            telNumber: 1,
            webinars: 1,
            specialties: 1,
            isDeclined: 1,
            createdAt: 1,
            updatedAt: 1,
            calendlyLink: 1,
            firstName: 1,
            lastName: 1,
            state: 1,
            licenseNumber: 1,
            displayCalendly: 1,
            testimonials: {
              $filter: {
                input: "$testimonials",
                cond: {
                  $eq: ["$$this.isDisplayed", true],
                },
              },
            },
          },
        },
      ]);
      res.json(agent[0]);
    }
  } else {
    res.status(404);
    throw new Error("Agent not found.");
  }
});

// @desc    Delete a agent
// @route   DELETE /api/agents/:id
// @access  Private/Admin
const deleteAgent = expressAsync(async (req, res) => {
  const agent = await Agents.deleteOne({
    _id: req.params.id,
  });

  if (agent) {
    res.json({ message: "Agent removed." });
  } else {
    res.status(404);
    throw new Error("Agent not found");
  }
});

// @desc    Update a agent
// @route   PUT /api/agents/update-agent
// @access  Private/Admin
const updateAgent = expressAsync(async (req, res) => {
  try {
    /** Upload avatar to cloudinary */
    let agentImgResult;
    try {
      agentImgResult = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "agent-avatars",
        use_filename: true,
      });
    } catch (error) {
      agentImgResult = req.body.avatar;
    }

    const agent = await Agents.findById(req.body.id);
    const user = await User.findById(agent?.userGuid);

    if (agent) {
      agent.name = undefinedValidator(agent.name, req.body.name);
      agent.bio = undefinedValidator(agent.bio, req.body.bio);
      agent.phoneNumber = undefinedValidator(
        agent.phoneNumber,
        req.body.phoneNumber
      );
      agent.emailAddress = undefinedValidator(
        agent.emailAddress,
        req.body.emailAddress
      );
      agent.address = undefinedValidator(agent.address, req.body.address);
      agent.calendlyLink = undefinedValidator(
        agent.calendlyLink,
        req.body.calendlyLink
      );
      agent.twitter = undefinedValidator(agent.twitter, req.body.twitter);
      agent.instagram = undefinedValidator(agent.instagram, req.body.instagram);
      agent.facebook = undefinedValidator(agent.facebook, req.body.facebook);
      agent.linkedIn = undefinedValidator(agent.linkedIn, req.body.linkedIn);
      agent.discordId = undefinedValidator(agent.discordId, req.body.discordId);
      agent.weChat = undefinedValidator(agent.weChat, req.body.weChat);
      agent.avatar =
        typeof req.body.avatar === "string"
          ? req.body.avatar
          : agentImgResult.secure_url
          ? agentImgResult.secure_url
          : agent.avatar;
      agent.avatar_cloudinary_id = agentImgResult.public_id
        ? agentImgResult.public_id
        : agent.avatar_cloudinary_id;

      console.log({
        req: req.body.emailAddress,
        agent: agent?.emailAddress,
      });
      user.email = req.body.emailAddress;

      const updatedAgent = await agent.save();
      const createdUser = await user.save();
      res.status(201).json(updatedAgent);
    } else {
      res.status(404);
      throw new Error("Agent not found");
    }

    await agent.save();
    res.json(agent);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured in adding agent.");
  }
});

// @desc    Edit the status of the agent
// @route   PUT /api/agent-status
// @access  Private/Admin
const updateAgentStatus = expressAsync(async (req, res) => {
  const agent = await Agents.findById(req.params.id);
  const statusDesired = req.body.status;
  const isPending = statusDesired === AGENT_STATUSES.PENDING ? true : false;
  const calendlyLink = req.body.calendlyLink;

  if (agent) {
    agent.status = req.body.status;
    agent.isDeclined = isPending;
    agent.displayCalendly = req.body.displayCalendly;

    if (calendlyLink) {
      agent.calendlyLink = calendlyLink;
    }

    const user = new User({
      userGuid: agent.userGuid,
      name: agent.firstName + " " + agent.lastName,
      email: agent.emailAddress,
      password: agent.password,
      role: ROLES.ROLE_AGENT,
    });

    if (user && agent) {
      const updatedAgent = await agent.save();
      const createdUser = await user.save();
      res.json(updatedAgent);
    }

    if (req.body.status === AGENT_STATUSES.ACTIVATED) {
      // const mailSubject = "CFS Portal Activation";
      // const mailContent = agentApproved();

      let sendHTMLEmail;
      try {
        // sendHTMLEmail = sendEmail(
        //   agent?.emailAddress,
        //   mailSubject,
        //   mailContent,
        //   []
        // )
        //   .then((request, response) => {
        //     response.send(response.message);
        //   })
        //   .catch((error) => {
        //     res.status(500);
        //     console.log(error);
        //     throw new Error("Error occured in submission.");
        //   });
      } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Error occured in submission.");
      }
    }
  } else {
    res.status(404);
    throw new Error("Agent not found");
  }

  await agent.save();
  res.json(agent);
});

/**
  @desc    Create a agent
  @route   POST /api/agents/
  @access  Private/Admin
*/
const createAgent = expressAsync(async (req, res) => {
  const userGuid = uuidv4();
  try {
    /** Check if the email is existing. */
    const emailIsExist = await User.findOne({ email: req.body.emailAddress });

    if (emailIsExist) {
      res.status(400);
      throw new Error("Email already exists.");
    }

    /** Upload image to cloudinary */
    let agentImgResult;
    try {
      agentImgResult = await cloudinary.v2.uploader.upload(req.file?.path, {
        folder: "agent-avatars",
        use_filename: true,
      });
    } catch (error) {
      agentImgResult = "";
    }

    const agent = new Agents({
      userGuid,
      firstName: req.body.firstName?.toString(),
      lastName: req.body.lastName?.toString(),
      state: req.body.state?.toString(),
      licenseNumber: req.body.licenseNumber?.toString(),
      title: req.body.title?.toString(),
      bio: req.body.bio?.toString(),
      phoneNumber: req.body.phoneNumber?.toString(),
      emailAddress: req.body.emailAddress?.toString(),
      address: req.body.address?.toString(),
      instagram: req.body.instagram?.toString(),
      facebook: req.body.facebook?.toString(),
      linkedIn: req.body.linkedIn?.toString(),
      twitter: req.body.twitter?.toString(),
      weChat: req.body.weChat?.toString(),
      discordId: req.body.discordId?.toString(),
      languages: req.body?.languages,
      specialties: req.body?.specialties,
      roles: req.body?.roles,
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      role: ROLES.ROLE_AGENT,
      status: AGENT_STATUSES.PENDING,
      telNumber: req.body?.telNumber,
      password: req.body?.password,
      avatar:
        typeof req.body?.avatar === "string"
          ? req.body?.avatar
          : agentImgResult.secure_url,
      avatar_cloudinary_id: agentImgResult.public_id,
      position: req.body?.position,
    });

    if (agent) {
      await agent.save();
      await PreProfile.deleteOne({
        emailAddress: req.body?.emailAddress,
      });

      // const mailSubject = "Registration Complete";
      // const mailContent = agentRegistrationSuccess({
      //   agentId: agent?._id,
      //   specialties: agent?.specialties,
      // });

      // let sendHTMLEmail;
      // try {
      //   sendHTMLEmail = sendEmail(
      //     agent?.emailAddress,
      //     mailSubject,
      //     mailContent,
      //     []
      //   )
      //     .then((request, response) => {
      //       response?.send(response.message);
      //     })
      //     .catch((error) => {
      //       res.status(500);
      //       console.log(error);
      //       throw new Error("Error occured in submission.");
      //     });
      // } catch (error) {
      //   res.status(500);
      //   console.log(error);
      //   throw new Error("Error occured in submission.");
      // }

      res.status(201).json(agent);
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in adding agent.");
  }
});

// @desc    Add new testimonial
// @route   POST /api/agents/:id/testimonials
// @access  Private
const addAgentTestimonial = expressAsync(async (req, res) => {
  const { name, title, comment, emailAddress } = req.body;
  const testimonialGuid = uuidv4();
  const agent = await Agents.findById(req.params.id);

  if (agent) {
    const testimonial = {
      name: name.toString(),
      title: title.toString(),
      comment: comment.toString(),
      emailAddress: emailAddress.toString(),
      testimonialGuid,
    };

    agent.testimonials.push(testimonial);

    await agent.save();
    res.status(201).json({ message: "Testimonial added" });
  } else {
    res.status(404);
    throw new Error("Testimonial not found");
  }
});

// @desc    Display the testimonial
// @route   PUT /api/agents/:id/testimonials/update
// @access  Private
const updateAgentTestimonial = expressAsync(async (req, res) => {
  const { testimonialGuid } = req.body;

  const agent = await Agents.findOne({ userGuid: req.params.id }).then(
    (agent) => {
      let testimonial = agent.testimonials.find(
        (t) => t.testimonialGuid === testimonialGuid
      );

      testimonial.isDisplayed = testimonial.isDisplayed ? false : true;
      return agent.save();
    }
  );

  if (Object.keys(agent).length !== 0) {
    res.status(200).json(agent.testimonials);
  } else {
    res.status(400).json("Bad Request");
  }
});

const updateAgentWebinar = expressAsync(async (req, res) => {
  const webinarGuid = req.params.webinarGuid;
  const isAdd = req.body.mode;

  const webinarData = {
    userGuid: req.params.agentId,
    webinarGuid: req.params.webinarGuid,
    calendlyUrl: req.body.calendlyUrl,
    status: req.body.status,
  };

  if (!isAdd) {
    const agent = await Agents.findOne({ userGuid: req.params.agentId }).then(
      (agent) => {
        let webinar = agent.webinars?.find(
          (t) => t.webinarGuid === webinarGuid
        );

        webinar.status = webinarData.status;
        webinar.calendlyUrl = webinarData.calendlyUrl;
        return agent.save();
      }
    );
    res.status(201).json(agent);
  } else {
    await Agents.update(
      { userGuid: req.params.agentId },
      {
        $push: {
          webinars: webinarData,
        },
      }
    );
    const updatedAgentInfo = await Agents.find({
      userGuid: req.params.agentId,
    });
    res.status(201).json(updatedAgentInfo);
  }
});

const getAllActiveWebinar = expressAsync(async (req, res) => {
  const webinarGuids = req.body.webinarGuids;
  const activeWebinars = await Webinars.find({
    webinarGuid: { $in: webinarGuids },
  });

  res.status(200).json(activeWebinars);
});

/** Version 2 of creating an portal account */
const registerAccount = expressAsync(async (req, res) => {
  const userGuid = uuidv4();
  try {
    /** Check if the email is existing. */
    const emailIsExist = await User.findOne({ email: req.body.emailAddress });

    if (emailIsExist) {
      res.status(400);
      throw new Error("Email already exists.");
    }

    /** Upload image to cloudinary */
    let portalAccountImgResult;
    try {
      portalAccountImgResult = await cloudinary.v2.uploader.upload(
        req.file?.path,
        {
          folder: "agent-avatars",
          use_filename: true,
        }
      );
    } catch (error) {
      portalAccountImgResult = "";
    }

    const portalAccount = new Agents({
      userGuid,
      firstName: req.body.firstName?.toString(),
      lastName: req.body.lastName?.toString(),
      state: req.body.state?.toString(),
      licenseNumber: req.body.licenseNumber?.toString(),
      title: req.body.title?.toString(),
      bio: req.body.bio?.toString(),
      phoneNumber: req.body.phoneNumber?.toString(),
      emailAddress: req.body.emailAddress?.toString(),
      address: req.body.address?.toString(),
      instagram: req.body.instagram?.toString(),
      facebook: req.body.facebook?.toString(),
      linkedIn: req.body.linkedIn?.toString(),
      twitter: req.body.twitter?.toString(),
      discordId: req.body.discordId?.toString(),
      weChat: req.body.weChat?.toString(),
      languages: req.body?.languages,
      specialties: req.body?.specialties,
      roles: req.body?.roles,
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      role: req.body?.position,
      position: req.body?.position,
      status: AGENT_STATUSES.PENDING,
      telNumber: req.body?.telNumber,
      password: req.body?.password,
      avatar: portalAccountImgResult.secure_url,
      avatar_cloudinary_id: portalAccountImgResult.public_id,
    });

    if (portalAccount) {
      await portalAccount.save();

      const mailSubject = "Registration Complete";
      const mailContent = agentRegistrationSuccess({
        portalAccountId: portalAccount?._id,
        specialties: portalAccount?.specialties,
      });

      let sendHTMLEmail;
      try {
        sendHTMLEmail = sendEmail(
          portalAccount?.emailAddress,
          mailSubject,
          mailContent,
          []
        )
          .then((request, response) => {
            response?.send(response.message);
          })
          .catch((error) => {
            res.status(500);
            console.log(error);
            throw new Error("Error occured in submission.");
          });
      } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Error occured in submission.");
      }

      res.status(201).json(portalAccount);
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in adding portal account.");
  }
});

export {
  getAgents,
  getSingleAgent,
  deleteAgent,
  updateAgent,
  createAgent,
  updateAgentStatus,
  getAgentsCount,
  addAgentTestimonial,
  updateAgentTestimonial,
  updateAgentWebinar,
  getAllActiveWebinar,
  registerAccount,
};
