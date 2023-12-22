export interface ChannelData {
  _id: string;
  userGuid: string;
  name: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChannelDefaultResponse {
  message: string;
  status: string;
}

export type LeadChannelData = {
  channelId: string;
  channelName?: string;
};

export interface LeadChannelPayloadData {
  channels: LeadChannelData[];
}

export interface ChannelPayload {
  name: string;
  displayOrder?: number;
}
