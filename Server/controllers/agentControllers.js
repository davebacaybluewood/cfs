import Agents from "../models/agentModel.js";
import expressAsync from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import undefinedValidator from "./helpers/undefinedValidator.js";
import { ROLES } from "../constants/constants.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc: Fetch all agents
 * @route: GET /api/agents
 * @acess: Private
 */
const getAgents = expressAsync(async (req, res) => {
  const agents = await Agents.find({});
  res.json(agents);
});

/**
 * @desc: Fetch single agent
 * @route: GET /api/agents/:id
 * @acess: Private
 */
const getSingleAgent = expressAsync(async (req, res) => {
  const agent = await Agents.findOne({
    _id: req.params.id,
  });

  if (agent) {
    res.json(agent);
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
  console.log(req.file);
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

    if (agent) {
      agent.name = undefinedValidator(agent.name, req.body.name);
      agent.title = undefinedValidator(agent.title, req.body.title);
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
      agent.avatar = agentImgResult.secure_url
        ? agentImgResult.secure_url
        : agent.avatar;
      agent.avatar_cloudinary_id = agentImgResult.public_id
        ? agentImgResult.public_id
        : agent.avatar_cloudinary_id;

      const updatedAgent = await agent.save();
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

// @desc    Create a agent
// @route   POST /api/agents/
// @access  Private/Admin
const createAgent = expressAsync(async (req, res) => {
  const tempTestimonial = [
    {
      name: "Dave Spencer Bacay",
      title: "Finance Agent",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Slater Young",
      title: "Finance Agent",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Dev Chris Jones",
      title: "Web Developer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  try {
    const emailIsExist = await User.findOne({ email: req.body.emailAddress });

    if (emailIsExist) {
      res.status(400);
      throw new Error("Email already exists.");
    }

    const user = await User.create({
      name: req.body.fullName.toString(),
      email: req.body.emailAddress.toString(),
      password: req.body.password.toString(),
    });

    // /** Upload image to cloudinary */
    const agentImgResult = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "agent-avatars",
      use_filename: true,
    });

    let agent = new Agents({
      name: req.body.fullName.toString(),
      title: req.body.title?.toString(),
      bio: req.body.bio.toString(),
      phoneNumber: req.body.phoneNumber.toString(),
      emailAddress: req.body.emailAddress.toString(),
      address: req.body.address.toString(),
      instagram: req.body.instagram?.toString(),
      facebook: req.body.facebook?.toString(),
      linkedIn: req.body.linkedIn?.toString(),
      twitter: req.body.twitter?.toString(),
      languages: req.body.languages,
      role: ROLES.ROLE_AGENT,
      testimonials: tempTestimonial,
      telNumber: req.body.telNumber,
      password: req.body.password,
      avatar: agentImgResult.secure_url,
      avatar_cloudinary_id: agentImgResult.public_id,
    });

    if (user && agent) {
      await agent.save();

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
    res.json(agent);
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Error occured in adding agent.");
  }
});

export { getAgents, getSingleAgent, deleteAgent, updateAgent, createAgent };
