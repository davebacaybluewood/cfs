import { requests } from "../agent";
import {
  ChannelData,
  ChannelDefaultResponse,
  ChannelPayload,
  LeadChannelData,
} from "./channelModels";

const Channels = {
  getAllChannelsByUserGuid: (userGuid: string) => {
    try {
      const res = requests.get<ChannelData[] | undefined>(
        `/api/channels/${userGuid}/user-channels`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  createChannel: async (
    channels: ChannelPayload[],
    userGuid: string,
    hierarchyCode?: string | undefined
  ) => {
    try {
      const res = requests.post<ChannelData[]>(`/api/channels`, {
        channels,
        hierarchyCode,
        userGuid,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  deleteChannel: async (channelId: string) => {
    try {
      await requests.del<ChannelDefaultResponse>(`/api/channels/${channelId}`);
    } catch (error) {
      console.log(error);
    }
  },
  updateChannel: async (channelId: string, channelName: string) => {
    try {
      return await requests.put<ChannelData>(`/api/channels/${channelId}`, {
        name: channelName,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateLeadChannelLead: async (
    userGuid: string,
    channels: LeadChannelData[]
  ) => {
    try {
      return await requests.put<ChannelData>(`/api/channels/`, {
        channels,
        userGuid,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  Channels,
};
