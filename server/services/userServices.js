import PreProfile from "../models/preProfileModel.js";
import Agent from "../models/agentModel.js";
import User from "../models/userModel.js";
import { AGENT_STATUSES, ROLES } from "../constants/constants.js";

const registerPaidUser = async (req, res) => {
  try {
    const preProfile = await PreProfile.findOne({
      emailAddress: req.body.emailAddress,
    });
    await Agent.create({
      userGuid: preProfile.userGuid,
      firstName: preProfile.firstName?.toString(),
      lastName: preProfile.lastName?.toString(),
      state: preProfile.state?.toString(),
      licenseNumber: preProfile.licenseNumber?.toString(),
      title: preProfile.title?.toString(),
      bio: preProfile.bio?.toString(),
      phoneNumber: preProfile.phoneNumber?.toString(),
      emailAddress: preProfile.emailAddress?.toString(),
      address: preProfile.address?.toString(),
      instagram: preProfile.instagram?.toString(),
      facebook: preProfile.facebook?.toString(),
      linkedIn: preProfile.linkedIn?.toString(),
      twitter: preProfile.twitter?.toString(),
      weChat: preProfile.weChat?.toString(),
      discordId: preProfile.discordId?.toString(),
      languages: preProfile?.languages,
      specialties: preProfile?.specialties,
      roles: preProfile?.roles,
      firstName: preProfile?.firstName,
      lastName: preProfile?.lastName,
      role: ROLES.ROLE_AGENT,
      status: AGENT_STATUSES.ACTIVATED,
      telNumber: preProfile?.telNumber,
      password: preProfile?.password,
      avatar: preProfile?.avatar,
      position: preProfile?.position,
    });
    await User.create({
      name: preProfile.firstName + " " + preProfile.lastName,
      firstName: preProfile.firstName,
      lastName: preProfile.lastName,
      userGuid: preProfile.userGuid,
      email: preProfile.emailAddress,
      password: preProfile.password,
      isAdmin: false,
      role: "AGENT",
      roles: preProfile.roles,
      position: preProfile.position,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    throw new Error("Error occured in registering profile.");
  }
};

export { registerPaidUser };
