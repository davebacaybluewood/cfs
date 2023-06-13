import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import React, { useContext } from "react";
import { CrumbTypes } from "./types";
import "./Dashboard.scss";
import ConditionalBox from "./components/ConditionalBox/ConditionalBox";
import "./Dashboard.scss";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Dashboard",
    url: paths.dashboard,
    isActive: true,
  },
];

const Dashboard: React.FC = () => {
  const userCtx = useContext(UserContext) as any;
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );

  const USER_POSITION = profile?.position;
  const USER_ROLE = profile?.roles;

  return (
    <Wrapper breadcrumb={crumbs} className="dashboard-content">
      <ConditionalBox position={USER_POSITION} roles={USER_ROLE} />
    </Wrapper>
  );
};

export default Dashboard;
