import Agents from "../models/agentModel.js";
import expressAsync from "express-async-handler";
import undefinedValidator from "./helpers/undefinedValidator.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/userModel.js";
import { v4 as uuid } from "uuid";
import PreProfile from "../models/preProfileModel.js";
import {
  AGENT_STATUSES,
  PROFILE_POSITIONS,
  API_RES_FAIL,
} from "../constants/constants.js";

/**
 * @desc: List of all profiles
 * @route: GET /api/profile/:id
 * @acess: Private
 */
const listProfile = expressAsync(async (req, res) => {
  try {
    const profiles = await Agents.find({
      $and: [
        {
          status: {
            $in: [AGENT_STATUSES.ACTIVATED, AGENT_STATUSES.DEACTIVATED],
          },
        },
        { status: { $ne: AGENT_STATUSES.ARCHIVED } },
      ],
    }).sort({
      createdAt: -1,
    });
    res.json(profiles);
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Get profile data
 * @route: GET /api/profile
 * @acess: Private
 */
const getProfile = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;
    if (userGuid) {
      const agent = await Agents.find({ userGuid: userGuid });
      res.json(agent[0]);
    } else {
      res.status(404);
      throw new Error("Profile not found.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Update profile data
 * @route: PUT /api/profile/:id
 * @acess: Private
 */
const editProfile = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;

    /** Upload avatar to cloudinary */
    let profilePicResult;
    try {
      profilePicResult = await cloudinary.v2.uploader.upload(req.file?.path, {
        folder: "agent-avatars",
        use_filename: true,
      });
    } catch (error) {
      console.log(error);
      profilePicResult = req.body.avatar || "";
    }

    const agentModel = await Agents.find({ userGuid });
    const userModel = await User.find({ userGuid });
    const user = await userModel[0];
    const agent = agentModel[0];

    if (agent) {
      agent.firstName = undefinedValidator(agent.firstName, req.body.firstName);
      agent.lastName = undefinedValidator(agent.lastName, req.body.lastName);
      agent.bio = undefinedValidator(agent.bio, req.body.bio);
      agent.emailAddress = undefinedValidator(
        agent.emailAddress,
        req.body.emailAddress
      );
      user.email = undefinedValidator(
        agent.emailAddress,
        req.body.emailAddress
      );
      agent.languages = undefinedValidator(agent.languages, req.body.languages);
      agent.specialties = undefinedValidator(
        agent.specialties,
        req.body.specialties
      );
      agent.phoneNumber = undefinedValidator(
        agent.phoneNumber,
        req.body.phoneNumber
      );
      agent.address = undefinedValidator(agent.address, req.body.address);
      agent.licenseNumber = undefinedValidator(
        agent.licenseNumber,
        req.body.licenseNumber
      );
      agent.state = undefinedValidator(agent.state, req.body.state);
      agent.twitter = req.body.twitter ?? "";
      agent.instagram = req.body.instagram ?? "";
      agent.facebook = req.body.facebook ?? "";
      agent.calendlyLink = req.body.calendlyLink ?? "";
      agent.linkedIn = req.body.linkedIn ?? "";
      agent.discordId = req.body.discordId ?? "";
      agent.weChat = req.body.weChat ?? "";
      agent.avatar =
        typeof req.body.avatar === "string"
          ? req.body.avatar
          : profilePicResult.secure_url
          ? profilePicResult.secure_url
          : agent.avatar;
      agent.avatar_cloudinary_id = profilePicResult.public_id
        ? profilePicResult.public_id
        : agent.avatar_cloudinary_id;

      const updatedAgent = await agent.save();
      const updatedUser = await user.save();
      res.json(updatedAgent);
    } else {
      res.status(404);
      throw new Error("Profile not found");
    }

    await agent.save();
    res.json(agent);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured in updating profile.");
  }
});

/**
 * @desc: Update profile data
 * @route: PUT /api/profile/:id/change-password
 * @acess: Private
 */
const changePassword = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;
    const { password, newPassword } = req.body;
    const user = await User.findOne({ userGuid });
    const agentModel = await Agents.find({ userGuid });
    const agent = agentModel[0];

    if (user && (await user.matchPassword(password))) {
      agent.password = newPassword;
      user.password = newPassword;

      agent.save();
      user.save();
      res.json("success");
    } else {
      res.status(401);
      throw new Error("Invalid credentials.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Update profile settings
 * @route: PUT /api/profile/:id/profile-settings
 * @acess: Private
 */
const updateProfileSettings = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;
    const { displayCalendly } = req.body;

    const agentModel = await Agents.find({ userGuid });
    const agent = agentModel[0];

    if (agentModel.length) {
      agent.displayCalendly = displayCalendly;
      agent.save();
      res.status(200).json({ message: "ok" });
    } else {
      res.status(401);
      throw new Error("Error occured.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Create a profile
 * @route: PUT /api/profile/
 * @acess: Public
 */
const preCreateProfile = expressAsync(async (req, res, next) => {
  try {
    const { emailAddress, password, roles, position, languages } = req.body;
    const userModel = await User.findOne({ email: emailAddress });
    const preProfileModel = await PreProfile.findOne({
      emailAddress: emailAddress,
    });

    if (userModel) {
      const agent = await Agents.findOne({ userGuid: userModel.userGuid });

      if (!(agent.status === AGENT_STATUSES.ACTIVATED)) {
        res.status(400).json({
          error: "AGENT_STATUS_CHECK",
          message: `This account has been ${agent.status}`,
        });
        return;
      }
    }

    if (!emailAddress) {
      res.status(401).json({
        error: "EMAIL_CHECK",
        message: "Email is required.",
      });
    }

    if (userModel) {
      res.status(401).json({
        error: "EMAIL_CHECK",
        message: "Email Already Taken",
      });
    } else {
      if (preProfileModel) {
        const accountExists = preProfileModel.password === password;

        if (accountExists) {
          next();
        }
      } else {
        const emptyProfile = {
          name: "",
          firstName: "",
          lastName: "",
          state: "",
          licenseNumber: "",
          userGuid: uuid(),
          avatar: "",
          bio: "",
          phoneNumber: "",
          emailAddress: emailAddress,
          address: "",
          twitter: "",
          instagram: "",
          linkedIn: "",
          facebook: "",
          weChat: "",
          discordId: "",
          password: password,
          languages: languages,
          position: position,
          roles: roles,
          specialties: [],
        };

        const preProfile = new PreProfile(emptyProfile);
        const savePreProfile = await preProfile.save();

        if (savePreProfile) {
          res.json(savePreProfile);
        } else {
          res.status(401);
          throw new Error("Error occured.");
        }
      }
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Get the profile if existing
 * @route: GET /api/profile/
 * @acess: Public
 */
const fetchPreProfile = expressAsync(async (req, res) => {
  try {
    const preProfile = await PreProfile.findOne({
      emailAddress: req.body.emailAddress,
    });

    const passwordCorrect = preProfile.password === req.body.password;

    if (passwordCorrect) {
      res.json(preProfile);
    } else {
      throw new Error("Error occured.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

/**
 * @desc: Save pre profile
 * @route: PUT /api/profile/
 * @acess: Public
 */
const savePreProfile = expressAsync(async (req, res) => {
  try {
    /** Upload avatar to cloudinary */
    let profileImgResult;
    try {
      profileImgResult = await cloudinary.v2.uploader.upload(req.file?.path, {
        folder: "user-avatars",
        use_filename: true,
      });
    } catch (error) {
      console.log(error);
      profileImgResult = req.body.avatar;
    }

    const profile = await PreProfile.findOne({
      emailAddress: req.body.emailAddress,
    });

    if (profile) {
      profile.firstName = undefinedValidator(
        profile.firstName,
        req.body.firstName
      );
      profile.lastName = undefinedValidator(
        profile.lastName,
        req.body.lastName
      );
      profile.emailAddress = undefinedValidator(
        profile.emailAddress,
        req.body.emailAddress
      );
      profile.state = undefinedValidator(profile.state, req.body.state);
      profile.licenseNumber = undefinedValidator(
        profile.licenseNumber,
        req.body.licenseNumber
      );
      profile.address = undefinedValidator(profile.address, req.body.address);
      profile.address1 = undefinedValidator(
        profile.address1,
        req.body.address1
      );
      profile.address2 = undefinedValidator(
        profile.address2,
        req.body.address2
      );

      profile.bio = undefinedValidator(profile.bio, req.body.bio);
      profile.phoneNumber = undefinedValidator(
        profile.phoneNumber,
        req.body.phoneNumber
      );
      profile.avatar = profileImgResult.secure_url
        ? profileImgResult.secure_url
        : profileImgResult;
      profile.address = undefinedValidator(profile.address, req.body.address);
      profile.twitter = undefinedValidator(profile.twitter, req.body.twitter);
      profile.facebook = undefinedValidator(
        profile.facebook,
        req.body.facebook
      );
      profile.instagram = undefinedValidator(
        profile.instagram,
        req.body.instagram
      );
      profile.linkedIn = undefinedValidator(
        profile.linkedIn,
        req.body.linkedIn
      );
      profile.weChat = undefinedValidator(profile.weChat, req.body.weChat);
      profile.discordId = undefinedValidator(
        profile.discordId,
        req.body.discordId
      );
      profile.position = undefinedValidator(
        profile.position,
        req.body.position
      );
      profile.roles = undefinedValidator(profile.roles, req.body.roles);
      profile.specialties = undefinedValidator(
        profile.specialties,
        req.body.specialties
      );
      profile.languages = undefinedValidator(
        profile.languages,
        req.body.languages
      );
      profile.phoneNumber = undefinedValidator(
        profile.phoneNumber,
        req.body.phoneNumber
      );
      profile.address = undefinedValidator(profile.address, req.body.address);
      profile.twitter = undefinedValidator(profile.twitter, req.body.twitter);
      profile.facebook = undefinedValidator(
        profile.facebook,
        req.body.facebook
      );
      profile.instagram = undefinedValidator(
        profile.instagram,
        req.body.instagram
      );
      profile.linkedIn = undefinedValidator(
        profile.linkedIn,
        req.body.linkedIn
      );
      profile.weChat = undefinedValidator(profile.weChat, req.body.weChat);
      profile.discordId = undefinedValidator(
        profile.discordId,
        req.body.discordId
      );

      const updatedProfile = await profile.save();
      res.json(updatedProfile);
    } else {
      res.status(401).json({
        error: "EMAIL_CHECK",
        message: "Email is required.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured in updating profile.");
  }
});

/**
 * @desc: Register the pre profile
 * @route: POST /api/profile/pre-profile/register
 * @acess: Public
 */
const registerPreProfile = expressAsync(async (req, res) => {
  try {
    const preProfile = await PreProfile.findOne({
      emailAddress: req.body.emailAddress,
    });
    const profile = new Agents(preProfile);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured in registering profile.");
  }
});

/**
 * @desc: Update position & Roles
 * @route: POST /api/profile/position-roles/:userGuid
 * @acess: Private / Admin
 */
const updatePositionAndRole = expressAsync(async (req, res) => {
  try {
    const userGuid = req.params.userGuid;
    const { position, roles } = req.body;

    const profileModel = await Agents.find({ userGuid });
    const userModel = await User.find({ userGuid });
    const profile = profileModel[0];
    const user = userModel[0];

    const isAdminRole = position?.filter(
      (data) => data.value === PROFILE_POSITIONS.MASTER_ADMIN.value
    );

    if (profileModel.length) {
      profile.roles = roles;
      profile.position = position;

      if (userModel.length === 0) {
        const user = new User({
          userGuid: profile.userGuid,
          name: profile.firstName + " " + profile.lastName,
          email: profile.emailAddress,
          password: profile.password,
          roles: roles,
          position: position,
        });
        user.save();
        profile.save();
        res.status(200).json({ message: "ok" });
      } else {
        user.position = position;
        user.roles = roles;
        user.isAdmin = isAdminRole !== 0 ? true : false;
        profile.save();
        res.status(200).json({ message: "ok" });
      }
    } else {
      res.status(401);
      throw new Error("Error occured.");
    }
  } catch (err) {
    res.status(500).json(API_RES_FAIL(err));
  }
});

export {
  getProfile,
  editProfile,
  changePassword,
  updateProfileSettings,
  preCreateProfile,
  fetchPreProfile,
  registerPreProfile,
  savePreProfile,
  listProfile,
  updatePositionAndRole,
};
