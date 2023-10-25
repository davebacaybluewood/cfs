import { UserContext } from "admin/context/UserProvider";
import React, { useContext, useEffect, useState } from "react";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import SubscriptionTableLoading from "./SubscriptionTableLoading";
import { Alert, AlertTitle } from "@mui/material";

type AdminAgentWrapperProps = {
  children: React.ReactNode;
};

const AdminAgentWrapper: React.FC<AdminAgentWrapperProps> = (props) => {
  const userCtx = useContext(UserContext);
  const [isNotSubscriber, setIsNotSubscriber] = useState<boolean | undefined>(
    undefined
  ); 
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid || ""
  ); 

  const USER_POSITION = profile?.position;

  useEffect(() => {
    if (USER_POSITION) {
      setIsNotSubscriber(USER_POSITION[0].value !== "POSITION_SUBSCRIBER");
    }
  }, [USER_POSITION]);

  return (
    <main>
      {!loading ? (
        isNotSubscriber ? (
          props.children
        ) : (
          <Alert
            severity="warning"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              padding: "22px 30px",
              maxWidth: "600px",
            }}
          >
            <AlertTitle sx={{ fontSize: "18px", fontWeight: "600" }}>
              Warning
            </AlertTitle>
            You do not have access to view this page.
          </Alert>
        )
      ) : (
        <SubscriptionTableLoading />
      )}
    </main>
  );
};

export default AdminAgentWrapper;
