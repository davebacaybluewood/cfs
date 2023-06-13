import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React, { useContext, useEffect, useState } from "react";
import Title from "admin/components/Title/Title";
import { CrumbTypes } from "../Dashboard/types";
import { LandingPageData } from "admin/models/landingPageModels";
import agent from "admin/api/agent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import LandingPageCard from "./components/LandingPageCard";
import ConditionalSpinner from "admin/components/Spinner/ConditionalSpinner";
import "./style.scss";
import { UserContext } from "admin/context/UserProvider";
import { ROLES } from "admin/constants/constants";
import { RegisteredUserData } from "./LandingPageInfo";
import Spinner from "library/Spinner/Spinner";
import { toast } from "react-toastify";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Landing Pages",
    url: paths.landingPage,
    isActive: true,
  },
];

const LandingPage: React.FC = () => {
  const [landingPage, setLandingPage] = useState<LandingPageData[]>();
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState<
    RegisteredUserData[] | undefined
  >();
  const [registeredUsersLoading, setRegisteredUsersLoading] = useState(true);
  const [actionDialog, setActionDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    status: "",
    title: "",
    userGuid: "",
    pageId: "",
  });
  const [actionSpinner, setActionSpinner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await agent.LandingPage.list();

      const filteredLandingPageData = data?.map((lpData) => {
        const isActivated = registeredUsers?.some(
          (e) => e.userGuid === userGuid && e.pageId === lpData.pageCustomId
        );
        return {
          ...lpData,
          isActivated,
        };
      });

      console.log(filteredLandingPageData);
      setLandingPage(filteredLandingPageData);
      setLoading(false);
    };

    fetchData();
  }, [registeredUsers]);

  const userCtx = useContext(UserContext);
  const LOGGED_IN_ROLE = userCtx.user?.role;
  const userGuid = userCtx.user?.userGuid;

  useEffect(() => {
    const fetchData = async () => {
      const data =
        await agent.LandingPageRegisteredUsers.listAllRegisteredUsers();
      setRegisteredUsers(data);
      setRegisteredUsersLoading(false);
    };

    fetchData();
  }, []);

  const activateHandler = async () => {
    setActionSpinner(true);
    setTimeout(() => {
      agent.LandingPageRegisteredUsers.activate(
        dialogData.pageId,
        userGuid ?? ""
      );

      setLandingPage(
        landingPage?.map((item) => {
          if (item.pageCustomId === dialogData.pageId) {
            return { ...item, isActivated: true };
          } else {
            return item;
          }
        })
      );
      toast.info(`Landing Page Activated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setActionSpinner(false);
      setActionDialog(false);
    }, 1000);
  };

  const deactivateHandler = async () => {
    setActionSpinner(true);
    setTimeout(() => {
      agent.LandingPageRegisteredUsers.deactivate(
        dialogData.pageId,
        userGuid ?? ""
      );
      setLandingPage(
        landingPage?.map((item) => {
          if (item.pageCustomId === dialogData.pageId) {
            return { ...item, isActivated: false };
          } else {
            return item;
          }
        })
      );

      setActionSpinner(false);
      setActionDialog(false);
      toast.info(`Landing Page Deactivated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 1000);
  };

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="landing-pages-wrapper"
    >
      <Title title="Landing Pages" subtitle="Track the landing page data." />
      {actionSpinner ? <Spinner variant="fixed" /> : null}
      <ConditionalSpinner isLoading={registeredUsersLoading || loading}>
        <Grid container spacing={2}>
          {landingPage?.map((data) => {
            const subTitle =
              LOGGED_IN_ROLE === ROLES.ROLE_MASTER_ADMIN
                ? `Registered Agents: ${data?.noOfRegisteredUsers}`
                : `Number of visits: 0`;

            const activate = () => {
              setDialogData({
                status: "activate",
                pageId: data.pageCustomId,
                title: data.name,
                userGuid: userGuid ?? "",
              });

              setActionDialog(true);
            };

            const deactivate = () => {
              setDialogData({
                status: "deactivate",
                pageId: data.pageCustomId,
                title: data.name,
                userGuid: userGuid ?? "",
              });

              setActionDialog(true);
            };

            return (
              <Grid item sm={12} md={12} lg={12} key={data.pageCustomId}>
                <LandingPageCard
                  isLoading={registeredUsersLoading || loading}
                  isActivated={data.isActivated ? true : false}
                  id={data.pageCustomId}
                  subTitle={subTitle}
                  name={data.name}
                  createdAt={data.createdAt}
                  role={LOGGED_IN_ROLE ?? ""}
                  userGuid={userCtx.user?.userGuid}
                  activateHandler={activate}
                  deactivateHandler={deactivate}
                />
              </Grid>
            );
          })}
        </Grid>
      </ConditionalSpinner>
      <Dialog open={actionDialog} onClose={() => setActionDialog(false)}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to {dialogData.status} this landing page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setActionDialog(false)}
            style={{ fontSize: "13px" }}
          >
            No
          </Button>
          <Button
            onClick={() =>
              dialogData.status === "activate"
                ? activateHandler()
                : deactivateHandler()
            }
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to {dialogData.status} this landing page.
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default LandingPage;
