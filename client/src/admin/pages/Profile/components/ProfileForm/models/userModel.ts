export interface UserInfo {
  firstName: string;
  lastName: string;
  position: string;
  bio: string;
  avatar: string;
  phoneNumber: string;
  address: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  facebook: string;
  telNumber: string;
  languages: string[];
  specialties: string[];
  state: string;
  licenseNumber: string;
  userGuid?: string;
}

export interface User {
  roles: string[];
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  state: string;
  userGuid: string;
  avatar: string;
  title: string;
  bio: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  facebook: string;
  password: string;
  languages: string[];
  role: string;
  status: string;
  telNumber: string;
  specialties: string[];
  isDeclined: false;
  testimonials: string[];
  webinars: string[];
  createdAt: string;
  updatedAt: string;
  __v: 0;
  calendlyLink: string;
}
