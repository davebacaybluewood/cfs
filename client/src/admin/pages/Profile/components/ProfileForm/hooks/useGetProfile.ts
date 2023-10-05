import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { useEffect, useState } from "react";
import { User, UserInfo } from "../models/userModel";

const useGetProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    position: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
    facebook: "",
    telNumber: "",
    languages: [],
    specialties: [],
    state: "",
    licenseNumber: "",
  });

  const agentStorage = sessionStorage.getItem("userInfo");

  const { userGuid } = JSON.parse(agentStorage ?? "");

  useEffect(() => {
    setLoading(true);
    const getProfileData = async () => {
      try {
        const res = await axios.get<User>(
          ENDPOINTS.PROFILE_BY_ID.replace(":id", userGuid ?? "")
        );
        const data = res.data;
        setProfile({
          userGuid: data.userGuid,
          firstName: data.firstName,
          lastName: data.lastName,
          position: data.title,
          bio: data.bio,
          avatar: data.avatar,
          phoneNumber: data.phoneNumber,
          address: data.address,
          twitter: data.twitter,
          instagram: data.instagram,
          linkedIn: data.instagram,
          facebook: data.facebook,
          telNumber: data.telNumber,
          languages: data.languages,
          specialties: data.specialties,
          state: data.state,
          licenseNumber: data.licenseNumber,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (userGuid) {
      getProfileData();
    }
  }, [userGuid]);

  return {
    profile,
    loading,
  };
};

export default useGetProfile;
