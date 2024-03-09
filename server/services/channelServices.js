import mongoose from "mongoose";
import Channels from "../models/channelModel.js";
import Hierarchy from "../models/hierarchyModel.js";

const getAllChannels = async () => {
  try {
    const data = await Channels.find({});
    data.sort(function (a, b) {
      return parseFloat(a.displayOrder) - parseFloat(b.displayOrder);
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllChannelsByHierarchyCode = async (hierarchyCode) => {
  try {
    const data = await Channels.find({
      hierarchyCode,
    });
    data.sort(function (a, b) {
      return parseFloat(a.displayOrder) - parseFloat(b.displayOrder);
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllChannelsByUserGuid = async (userGuid) => {
  try {
    const data = await Channels.find({
      userGuid,
    });
    data.sort(function (a, b) {
      return parseFloat(a.displayOrder) - parseFloat(b.displayOrder);
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createChannel = async (body) => {
  const { channels, hierarchyCode, userGuid } = body;

  const channelNames = channels.map((data) => data.name);

  const isChannelExists = await Channels.find({
    userGuid,
    name: { $in: channelNames },
  });

  if (isChannelExists.length > 0) {
    return {
      error: "channel_validation",
      description: "[Channel] Channel name exists",
    };
  }

  const mappedChannels = channels.map((channel) => {
    return {
      name: channel.name,
      hierarchyCode,
      userGuid,
      displayOrder: channel.displayOrder,
    };
  });

  try {
    const data = await Channels.insertMany(mappedChannels);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateChannelByChannelId = async (channelId, channelName) => {
  try {
    const isChannelExists = await Channels.find({
      name: { $in: [channelName] },
      _id: { $in: [mongoose.Types.ObjectId(channelId)] },
    });

    if (isChannelExists.length) {
      return {
        error: "channel_validation",
        description: "[Channel] Channel name exists",
      };
    }

    const data = await Channels.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(channelId) },
      { $set: { name: channelName } },
      { returnOriginal: false }
    );
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteChannel = async (channelId) => {
  try {
    const data = await Channels.deleteOne({
      _id: mongoose.Types.ObjectId(channelId),
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateLeadChannelLead = async (userGuid, channels) => {
  try {
    const hierarchy = await Hierarchy.findOne({
      userGuid,
    });

    hierarchy.channels = channels;
    await hierarchy.save();

    return hierarchy;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  createChannel,
  deleteChannel,
  getAllChannels,
  getAllChannelsByHierarchyCode,
  getAllChannelsByUserGuid,
  updateChannelByChannelId,
  updateLeadChannelLead,
};
