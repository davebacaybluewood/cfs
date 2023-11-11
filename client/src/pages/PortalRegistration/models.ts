export type SelectType = {
  value: string | null | undefined;
  label: string | null | undefined;
};
export interface ValuesType {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  position: SelectType[];
  roles: SelectType[];
  bio: string;
  languages: string[];
  specialties: string[];
  avatar: string;
  licenseNumber: string;
  phoneNumber: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  instagram: string;
  weChat: string;
  discordId: string;
  state: string;
  zipCode: string;
  address1: string;
  address2: string;
  nationality: string;
  birthDate: string;
}

export type PersonalInfoType = Omit<
  ValuesType,
  | "emailAddress"
  | "password"
  | "confirmPassword"
  | "phoneNumber"
  | "address"
  | "facebook"
  | "twitter"
  | "linkedIn"
  | "instagram"
  | "weChat"
  | "discordId"
>;
