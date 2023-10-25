import { UserContext } from "admin/context/UserProvider";
import React, { useContext, useEffect, useState } from "react";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { Alert, AlertTitle } from "@mui/material";
import Spinner from "admin/components/Spinner/Spinner";

type AdminAgentWrapperProps = {
  children: React.ReactNode;
};

const AdminAgentWrapper: React.FC<AdminAgentWrapperProps> = (props) => {
  const userCtx = useContext(UserContext);
  const [hasAccess, setHasAccess] = useState<boolean | undefined>(undefined);
  const { profile, loading } = useFetchUserProfile(
    userCtx?.user?.userGuid || ""
  );

  const USER_POSITION = profile?.position;

  useEffect(() => {
    if (USER_POSITION) {
      setHasAccess(USER_POSITION[0].value !== "POSITION_SUBSCRIBER");
    }
  }, [USER_POSITION]);

  return (
    <main>
      {!loading ? (
        hasAccess ? (
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
              Restricted Page Warning
            </AlertTitle>
            You do not have access to view this page.
            <div>
              <a
                href="https://agent.comfortfinancialsolutions.com/signup"
                target="_blank"
                rel="noreferrer"
              >
                Register
              </a>{" "}
              to subscribe.
            </div>
          </Alert>
        )
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default AdminAgentWrapper;
