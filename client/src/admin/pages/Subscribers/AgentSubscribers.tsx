import React, { useContext, useEffect, useState } from "react";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import "./AgentSubscribers.scss";
import { formatISODateOnly } from "helpers/date";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import useFetchSubscribers from "../RewardsHistory/useFetchSubscribers";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";

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

  const columns: GridColDef[] = [
    {
      field: "lastName",
      headerName: "Last Name",
      width: 250,
    },
    { field: "firstName", headerName: "First Name", width: 250 },
    { field: "email", headerName: "Email Address", width: 450 },
    { field: "createdAt", headerName: "Date Created", width: 250 },
    { field: "type", headerName: "User Type", width: 250 },
  ];

  const filteredRows = subscribers?.map((subscriber) => {
    return {
      id: subscriber.userGuid,
      firstName: subscriber.firstName,
      lastName: subscriber.lastName,
      email: subscriber.email,
      createdAt: formatISODateOnly(subscriber.createdAt ?? ""),
      type:
        subscriber.type === "SUBSCRIBER" ? "Subscriber" : "Free 30 days Trial",
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

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <DocumentTitleSetter title="Subscribers | CFS Portal" />
      <div className="agent-subscribers-container">
        <Title title="Leads" subtitle="List of your leads">
          <Button onClick={() => handleCopyToClipboard()} variant="contained">
            Copy Subscriber Registration Link
          </Button>
        </Title>
        <div className="agent-subscribers-table">
          <div style={{ width: "100%" }}>
            <NoInformationToDisplay
              showNoInfo={!filteredRows?.length}
              title="No Subscribers"
              message="No information to display"
            >
              <DataGrid rows={filteredRows || []} columns={columns} />
            </NoInformationToDisplay>
          </div>
        </div>
      </div>
      {loading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default AgentSubscribers;
