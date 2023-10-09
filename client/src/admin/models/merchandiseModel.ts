export interface MerchandiseResData {
  message: string;
  success: string;
}

export interface MerchandiseData {
  _id: string;
  name: string;
  image: string;
  status: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface MerchandiseBody {
  name: string;
  image: any;
  points: number;
}

export interface MerchandiseRedeemBody {
  name: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  remarks: string;
  userGuid: string;
}
