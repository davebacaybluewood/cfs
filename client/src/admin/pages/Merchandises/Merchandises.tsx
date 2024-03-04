import Wrapper from "admin/components/Wrapper/Wrapper";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import React, { useContext } from "react";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import MerchandiseAdmin from "./components/MerchandiseAdmin";
import MerchandiseAgent from "./components/MerchandiseAgent";
import MerchandiseSubscriber from "./components/MerchandiseSubscriber";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "MyRewards",
    url: paths.myRewards,
    isActive: true,
  },
];

const Merchandises = () => {
  const userCtx = useContext(UserContext) as any;
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );

  const isAdmin = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });

  const isSubscriber = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.SUBSCRIBER.ROLE_SUBSRIBER.value;
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
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.FREE_30DAYS_TRIAL.ROLE_FREE_30DAYS_TRIAL.value
    );
  });

  return (
    <Wrapper loading={false} breadcrumb={crumbs}>
      <DocumentTitleSetter title="Merchandises | CFS Portal" />
      {isAdmin ? (
        <MerchandiseAdmin />
      ) : isAgent ? (
        <MerchandiseAgent />
      ) : isSubscriber ? (
        <MerchandiseSubscriber />
      ) : null}
    </Wrapper>
  );
};

export default Merchandises;
