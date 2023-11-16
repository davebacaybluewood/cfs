import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import { useContext, useEffect, useState } from "react";

const useUserRole = () => {
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const { profile, loading } = useFetchUserProfile(userGuid ?? "");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [isAgent, setIsAgent] = useState(false);

  const _isAdmin = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });

  const _isSubscriber = profile?.roles?.some((f) => {
    return f.value === PROFILE_ROLES.SUBSCRIBER.ROLE_SUBSRIBER.value;
  });

  const _isFreeTrial = profile?.roles?.some((f) => {
    return (
      f.value === PROFILE_ROLES.FREE_30DAYS_TRIAL.ROLE_FREE_30DAYS_TRIAL.value
    );
  });

  const _isAgent = profile?.roles?.some((f) => {
    return (
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value
    );
  });

  useEffect(() => {
    setIsAdmin(!!_isAdmin);
    setIsSubscriber(!!_isSubscriber);
    setIsAgent(!!_isAgent);
    setIsFreeTrial(!!_isFreeTrial);
  }, [userGuid, profile]);

  return {
    isAdmin,
    isSubscriber,
    isFreeTrial,
    isAgent,
    loading,
  };
};

export default useUserRole;
