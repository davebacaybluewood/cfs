export interface CategoryData {
  userGuid: string;
  name: string;
  isPublic: boolean;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}

export interface CategoryDefaultMessage {
  message: string;
  status: string;
}

export interface CategoryPayload {
  userGuid?: string;
  name: string;
  isPublic?: boolean;
  _id?: string;
}
