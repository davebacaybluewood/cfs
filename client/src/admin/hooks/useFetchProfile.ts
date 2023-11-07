import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { useEffect, useState } from "react";

export type RolesAndPositionType = {
  label: string;
  value: string;
};
export type TestimonialType = {
  emailAddress: string;
  fullName: string;
  title: string;
  testimonial: string;
};
export type TestimonialData = {
  title: string;
  name: string;
  comment: string;
};

export type ProfileData = {
  firstName?: string;
  lastName?: string;
  licenseNumber?: string;
  state?: string;
  _id: string;
  name: string;
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
  discordId: string;
  weChat: string;
  password: string;
  languages?: string[];
  role: string;
  status: string;
  telNumber: string;
  webinars: string[];
  specialties?: string[];
  isDeclined: false;
  createdAt: string;
  updatedAt: string;
  testimonials?:
    | {
        title: string;
        name: string;
        comment: string;
        isDisplayed: boolean;
      }[]
    | undefined;
  calendlyLink: string;
  roles: RolesAndPositionType[];
  position: RolesAndPositionType[];
  displayCalendly?: boolean;
};

export const profileInitialValues = {
  firstName: "",
  lastName: "",
  licenseNumber: "",
  state: "",
  _id: "",
  name: "",
  userGuid: "",
  avatar: "",
  title: "",
  bio: "",
  phoneNumber: "",
  emailAddress: "",
  address: "",
  twitter: "",
  instagram: "",
  linkedIn: "",
  facebook: "",
  password: "",
  languages: [],
  role: "",
  status: "",
  telNumber: "",
  webinars: [],
  specialties: [],
  isDeclined: "",
  createdAt: "",
  updatedAt: "",
  testimonials: [],
  calendlyLink: "",
  roles: [],
  position: [],
};
const useFetchUserProfile = (userGuid: string) => {
  const [profile, setProfile] = useState<ProfileData | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINTS.PROFILE.replace(":userGuid", userGuid))
      .then((response) => {
        setProfile(response.data);
        // Add response.data.role to localStorage userRole
        if (!localStorage.getItem("userRole")) {
          localStorage.setItem("userRole", response.data.roles[0].value);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [userGuid]);

  return {
    profile: profile ? profile : undefined,
    loading,
  };
};

export default useFetchUserProfile;
