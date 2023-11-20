import React, { useContext, useState } from "react";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Drawer } from "@mui/material";
import { UserContext } from "admin/context/UserProvider";
import { formatISODateOnly } from "helpers/date";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import useFetchSubscribers from "../RewardsHistory/useFetchSubscribers";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import "./AgentSubscribers.scss";
import useUserRole from "hooks/useUserRole";
import Pricing from "admin/components/Pricing/Pricing";
import { FaCheckCircle } from "react-icons/fa";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Leads",
    url: paths.myLeads,
    isActive: true,
  },
];

const AgentSubscribers: React.FC = () => {
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [clipboardValue, setClipboardValue] = useCopyToClipboard();
  const { loading, subscribers } = useFetchSubscribers(userGuid);
  const { isFreeTrial, loading: roleLoading } = useUserRole();
  const [openDrawer, setOpenDrawer] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "User Type",
      width: 250,
      renderCell: (params) => params.value,
    },
    {
      field: "isSubscribed",
      headerName: "Is Upgraded to Agent?",
      width: 250,
      renderCell: (params) => params.value,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 250,
    },
    { field: "firstName", headerName: "First Name", width: 250 },
    { field: "email", headerName: "Email Address", width: 250 },
    { field: "createdAt", headerName: "Date Created", width: 250 },
  ];

  const filteredRows = subscribers?.map((subscriber) => {
    return {
      id: subscriber.userGuid,
      isSubscribed: subscriber.isSubscribed ? "YES" : "NO",
      firstName: subscriber.firstName,
      lastName: subscriber.lastName,
      email: subscriber.email,
      createdAt: formatISODateOnly(subscriber.createdAt ?? ""),
      type:
        subscriber.type === "SUBSCRIBER" ? (
          <div>
            <span>Subscriber</span> <FaCheckCircle />
          </div>
        ) : (
          <HtmlTooltip
            title={
              <div
                style={{
                  fontSize: "1.3rem",
                }}
              >
                This user is already <br /> upgraded to an Agent
              </div>
            }
          >
            <div>
              <span>Free 30 days Trial</span>
              <FaCheckCircle
                style={{
                  color: "#00a152",
                  fontSize: 15,
                  position: "relative",
                  top: 3,
                  left: 5,
                }}
              />
            </div>
          </HtmlTooltip>
        ),
    };
  });

  function handleCopyToClipboard() {
    setClipboardValue(
      window.location.host +
        paths.subscriberRegistration +
        `?userGuid=${userGuid}`
    );
    toast("Link copied to Clipboard");
  }

  function handleCopyToClipboardTrial() {
    setClipboardValue(
      window.location.host + paths.portalRegistration + `?userGuid=${userGuid}`
    );
    toast("Link copied to Clipboard");
  }

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <DocumentTitleSetter title="Leads | CFS Portal" />
      <div className="agent-subscribers-container">
        <Title title="Leads" subtitle="List of your leads">
          <Button
            onClick={() => handleCopyToClipboard()}
            variant="contained"
            style={{ marginRight: 10 }}
          >
            Copy Subscriber Registration Link
          </Button>
          <Button
            onClick={() => handleCopyToClipboardTrial()}
            variant="contained"
          >
            Copy Free 30 days Trial Registration Link
          </Button>
        </Title>
        <div className="agent-subscribers-table">
          <div style={{ width: "100%" }}>
            <NoInformationToDisplay
              showNoInfo={!filteredRows?.length}
              title={
                isFreeTrial
                  ? "You don't have access in this page"
                  : "You don't have any leads yet"
              }
              message={
                <button onClick={() => setOpenDrawer(true)}>
                  Click here to upgrade to agent pro
                </button>
              }
            >
              <DataGrid rows={filteredRows || []} columns={columns} />
            </NoInformationToDisplay>
          </div>
        </div>
      </div>
      {loading ? <Spinner variant="fixed" /> : null}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Pricing />
      </Drawer>
    </Wrapper>
  );
};

export default AgentSubscribers;
