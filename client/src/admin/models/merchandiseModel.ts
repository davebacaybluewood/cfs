export interface MerchandiseError {
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
