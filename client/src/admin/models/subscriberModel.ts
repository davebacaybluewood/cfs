export interface SubscribersData {
  _id: string;
  userGuid: string;
  recruiterUserGuid: string;
  hierarchyId: string;
  hierarchyCode: string;
  parent: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SubscriberMainData {
  totalSubscribers: number;
  subscribers: SubscribersData[];
}