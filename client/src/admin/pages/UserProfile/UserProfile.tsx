import { paths } from "constants/routes";
import React from "react";
import { CrumbTypes } from "../Dashboard/types";
import Profile from "../Profile/Profile";
import useFetchUserProfile from "admin/hooks/useFetchProfile";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Profile",
    url: paths.profile,
    isActive: true,
  },
];

const UserProfile: React.FC = () => {
  const localData = sessionStorage.getItem("userInfo") as any;
  const parsedLocalData = JSON.parse(localData as any);
  const userGuid = parsedLocalData.userGuid;

  const { profile, loading } = useFetchUserProfile(userGuid ?? "");

  return (
    <Profile
      crumbs={crumbs}
      error={false}
      loading={loading}
      profile={profile}
      headerConfigs={{ isProfileView: true }}
    />
  );
};

export default UserProfile;
