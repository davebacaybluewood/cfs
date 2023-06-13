import React, { useEffect, useState } from "react";
import "./style.scss";
import Wrapper from "admin/components/Wrapper/Wrapper";
import Title from "admin/components/Title/Title";
import ConditionalSpinner from "admin/components/Spinner/ConditionalSpinner";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import DataTable, { DataTableProps } from "admin/components/Table/Table";
import agent from "admin/api/agent";
import { formatISODateOnly } from "helpers/dateFormatter";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import { LandingPageData } from "admin/models/landingPageModels";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";

export interface RegisteredUserData {
  createdAt?: string;
  updatedAt?: string;
  agentName?: string;
  userGuid?: string;
  _id: string;
  pageId: string;
  isActivated?: boolean;
}
const LandingPageInfo: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [landingPageInfo, setLandingPageInfo] = useState<
    LandingPageData | undefined
  >();
  const [registeredUsers, setRegisteredUsers] = useState<
    RegisteredUserData[] | undefined
  >();
  const [actionDialog, setActionDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    status: "",
    title: "",
    userGuid: "",
    pageId: "",
  });
  const [actionSpinner, setActionSpinner] = useState(false);

  const { pageId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await agent.LandingPageRegisteredUsers.list(pageId ?? "");

      const filteredLandingPageData = data?.map((lpData) => {
        const isActivated = true;
        return {
          ...lpData,
          isActivated,
        };
      });
      setRegisteredUsers(filteredLandingPageData);
      setLoading(false);
    };

    fetchData();

    return () => {
      setLoading(true);
    };
  }, [pageId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await agent.LandingPage.listDetail(pageId ?? "");
      setLandingPageInfo(data);
      setLoading(false);
    };

    fetchData();

    return () => {
      setLoading(true);
    };
  }, []);

  const actionButtons = (
    userGuid: string,
    pageId: string,
    isActivated: boolean,
    handlers: { activateHandler: () => void; deactivateHandler: () => void }
  ) => {
    return (
      <div className="action-buttons">
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            isActivated
              ? window.open(
                  window.location.origin +
                    paths.cfsPagesWithAgent
                      .replace(":pageId", pageId)
                      .replace(":agentGuid", userGuid)
                )
              : window.location.origin +
                paths.cfsPages.replace(":pageId", pageId)
          }
        >
          View Landing Page
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            navigate(paths.adminAgentProfile.replace(":id", userGuid))
          }
        >
          View Agent Profile
        </Button>
        {isActivated ? (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handlers.deactivateHandler()}
          >
            Deactivate
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handlers.activateHandler()}
          >
            Activate
          </Button>
        )}
      </div>
    );
  };

  const activateHandler = async () => {
    setActionSpinner(true);
    setTimeout(() => {
      agent.LandingPageRegisteredUsers.activate(
        dialogData.pageId,
        dialogData.userGuid ?? ""
      );

      // setLandingPage(
      //   landingPage?.map((item) => {
      //     if (item.pageCustomId === dialogData.pageId) {
      //       return { ...item, isActivated: true };
      //     } else {
      //       return item;
      //     }
      //   })
      // );
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
        dialogData.userGuid
      );
      setRegisteredUsers(
        registeredUsers?.filter((item) => item.userGuid !== dialogData.userGuid)
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

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Landing Pages",
      url: paths.landingPage,
      isActive: false,
    },
    {
      title: landingPageInfo?.name ?? "",
      url: paths.landingPage,
      isActive: true,
    },
  ];

  const tableDefs: DataTableProps = {
    columns: [
      {
        id: "userGuid",
        label: "User ID",
        minWidth: 20,
        align: "left",
      },
      {
        id: "name",
        label: "Name",
        minWidth: 120,
        align: "left",
      },
      {
        id: "createdAt",
        label: "Created At",
        minWidth: 20,
        align: "left",
      },
      {
        id: "updatedAt",
        label: "Updated At",
        minWidth: 20,
        align: "left",
      },
      {
        id: "numberOfVisits",
        label: "Number of Visits",
        minWidth: 20,
        align: "left",
      },
      {
        id: "actions",
        label: "Actions",
        minWidth: 20,
        maxWidth: 20,
        align: "center",
      },
    ],

    rows: registeredUsers?.map((data) => {
      const activate = () => {
        setDialogData({
          status: "activate",
          pageId: data.pageId,
          title: "",
          userGuid: data.userGuid ?? "",
        });

        setActionDialog(true);
      };

      const deactivate = async () => {
        setDialogData({
          status: "deactivate",
          pageId: data.pageId,
          title: "",
          userGuid: data.userGuid ?? "",
        });

        setActionDialog(true);
      };

      return {
        userGuid: data.userGuid,
        numberOfVisits: 0,
        updatedAt: formatISODateOnly(data.updatedAt ?? ""),
        createdAt: formatISODateOnly(data.createdAt ?? ""),
        name: data.agentName,
        actions: actionButtons(
          data.userGuid ?? "",
          data.pageId ?? "",
          data.isActivated ? true : false,
          { activateHandler: activate, deactivateHandler: deactivate }
        ),
      };
    }),
  };

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="landing-pages-wrapper"
    >
      {actionSpinner ? <Spinner variant="fixed" /> : null}
      <ConditionalSpinner isLoading={loading}>
        <Title
          title={landingPageInfo?.name ?? ""}
          subtitle={`Track the ${
            landingPageInfo?.name ?? ""
          } landing page data.`}
        />
        <NoInformationToDisplay
          message="No user registed in this landing page."
          title="No information to display."
          showNoInfo={!tableDefs.rows?.length}
        >
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={12}>
              <DataTable columns={tableDefs.columns} rows={tableDefs.rows} />
            </Grid>
          </Grid>
        </NoInformationToDisplay>
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

export default LandingPageInfo;
