export interface PointsError {
  message: string;
  success: string;
}

export interface PointsUserData {
  _id: string;
  userGuid: string;
  expirationDate: string;
  points: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: 0;
}

export interface PointsData {
  totalPoints: number;
  totalRedeemedPoints: number;
  points: PointsUserData[];
}

export interface PointRows {
  id: string;
  transactionType: string;
  date: string;
  expirationDate: string;
  points: number;
}
