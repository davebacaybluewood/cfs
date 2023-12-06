import mongoose from "mongoose";
import Channels from "../models/channelModel.js";

const getAllChannels = async (req, res) => {
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

export default {
  createChannel,
  deleteChannel,
  getAllChannels,
  getAllChannelsByHierarchyCode,
  getAllChannelsByUserGuid,
  updateChannelByChannelId,
};
