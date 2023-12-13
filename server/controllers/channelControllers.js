import { API_RES_FAIL, API_RES_OK } from "../constants/constants.js";
import channelServices from "../services/channelServices.js";

const getAllChannels = async (req, res, next) => {
  try {
    const channel = await channelServices.getAllChannels(req, res);
    if (channel) {
      res.json(channel);
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

const getAllChannelsByHierarchyCode = async (req, res, next) => {
  try {
    const channel = await channelServices.getAllChannelsByHierarchyCode(
      req.params.hierarchyCode
    );
    if (channel) {
      res.json(channel);
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

const updateChannelByChannelId = async (req, res, next) => {
  if (!req.params.channelId || !req.body.name) {
    res.status(400).json(API_RES_FAIL("[Channels] Fields are required"));
    return;
  }
  try {
    const channel = await channelServices.updateChannelByChannelId(
      req.params.channelId,
      req.body.name
    );

    if (channel?.error) {
      res.status(400).json(channel);
      return;
    }

    if (channel) {
      res.json(channel);
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

const getAllChannelsByUserGuid = async (req, res, next) => {
  try {
    const channel = await channelServices.getAllChannelsByUserGuid(
      req.params.userGuid
    );
    if (channel) {
      res.json(channel);
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

const createChannel = async (req, res, next) => {
  const { channels, userGuid, hierarchyCode } = req.body;

  const isChannelEmpty = channels?.length === 0;

  if (!userGuid || !channels || isChannelEmpty) {
    res.status(400).json(API_RES_FAIL("[Channels] Fields are required"));
    return;
  }

  const body = {
    channels,
    userGuid,
    hierarchyCode,
  };

  try {
    const channel = await channelServices.createChannel(body);

    if (channel?.error) {
      res.status(400).json(channel);
      return;
    }

    if (channel) {
      res.json(channel);
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

const deleteChannel = async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    res.status(400).json(API_RES_FAIL("[Channels] Fields are required"));
    return;
  }

  try {
    const channel = await channelServices.deleteChannel(channelId);
    if (channel) {
      res.json(API_RES_OK("[Channels] Channel has been deleted"));
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

const updateLeadChannelLead = async (req, res) => {
  const { userGuid, channels } = req.body;

  if (!userGuid || !channels?.length) {
    res.status(400).json(API_RES_FAIL("[Channels] Fields are required"));
    return;
  }

  try {
    const channel = await channelServices.updateLeadChannelLead(
      userGuid,
      channels
    );
    if (channel) {
      res.json(API_RES_OK("[Channels] Channel has been added to this lead"));
    } else {
      res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(API_RES_FAIL("[Channels] Error Occured"));
  }
};

export default {
  getAllChannelsByHierarchyCode,
  getAllChannelsByUserGuid,
  getAllChannels,
  createChannel,
  deleteChannel,
  updateChannelByChannelId,
  updateLeadChannelLead,
};
