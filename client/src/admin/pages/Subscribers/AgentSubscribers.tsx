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

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Agent's Subscribers",
    url: paths.agentsubscribers,
    isActive: true,
  },
];

const AgentSubscribers: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fixedLoading, setFixedLoading] = useState(false);
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [subscribers, setSubscribers] = useState<any>([]);
  const [clipboardValue, setClipboardValue] = useCopyToClipboard();

  const columns: GridColDef[] = [
    {
      field: "lastName",
      headerName: "Last Name",
      width: 250,
    },
    { field: "firstName", headerName: "First Name", width: 250 },
    { field: "email", headerName: "Email Address", width: 450 },
    { field: "createdAt", headerName: "Date Created", width: 250 },
  ];

  useEffect(() => {
    console.log(userGuid);

    const fetchAgentSubscription = async () => {
      setLoading(true);
      const data = await agent.AgentSubscribers.getAgentSubscriber();

      setSubscribers(data);
    };

    if (userGuid) {
      fetchAgentSubscription();
      setLoading(false);
    }
  }, [userGuid]);

  const filteredRows = subscribers?.map((subscriber) => {
    return {
      id: subscriber.userGuid,
      firstName: subscriber.firstName,
      lastName: subscriber.lastName,
      email: subscriber.email,
      createdAt: formatISODateOnly(subscriber.createdAt ?? ""),
    };
  });

  function handleCopyToClipboard() {
    setClipboardValue(
      window.location.hostname + paths.subscriberRegistration + userGuid
    );
    toast("Link copied to Clipboard");
  }

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <div className="agent-subscribers-container">
        <Title
          title="Agent Subscribers"
          subtitle="List of Agent's Subscribers."
        >
          <Button onClick={() => handleCopyToClipboard()} variant="contained">
            Subscribe Link
          </Button>
        </Title>
        <div className="agent-subscribers-table">
          <div style={{ width: "100%" }}>
            <DataGrid rows={filteredRows} columns={columns} />
          </div>
        </div>
      </div>
      {fixedLoading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default AgentSubscribers;
