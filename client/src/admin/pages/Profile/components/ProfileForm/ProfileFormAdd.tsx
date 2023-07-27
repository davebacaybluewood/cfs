import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import React, { useContext, useState } from "react";
import "./ProfileForm.scss";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { UserContext } from "admin/context/UserProvider";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import PortalRegistration from "pages/PortalRegistration/PortalRegistration";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Users",
    url: paths.users,
    isActive: false,
  },
  {
    title: "Add User",
    url: paths.profileFormAdd,
    isActive: true,
  },
];

const ProfileFormAdd: React.FC = () => {
  const userCtx = useContext(UserContext) as any;

  const { userGuid } = useParams();
  const { profile, loading } = useFetchUserProfile(
    userGuid ? userGuid : userCtx?.user?.userGuid ?? ""
  );

  const { profile: adminProfile, loading: adminLoading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );

  const isAdmin = adminProfile?.position?.some(
    (e) => e.value === "POSITION_MASTER_ADMIN"
  );

  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState({
    main: true,
    password: false,
    email: false,
    roles: false,
  });

  const formClassnames = classNames("profile-form-content", {
    "password-form": activeForm.password,
    "roles-form": activeForm.roles,
  });

  const isAgent = profile?.roles.some((f) => {
    return (
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value
    );
  });

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={loading}
      className="profile-form-wrapper"
    >
      <PortalRegistration isAdmin={true} />
    </Wrapper>
  );
};

export default ProfileFormAdd;
