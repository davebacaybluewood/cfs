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
  type: string;
  isSubscribed: string;
  previousRole?: string;
}

export interface SubscriberMainData {
  totalSubscribers: number;
  subscribers: SubscribersData[];
}
