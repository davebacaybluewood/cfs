import React, { useContext, useEffect, useState } from "react";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import {
  DataGrid,
  GridColDef,
  GridFilterPanel,
  GridRowsProp,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { BsPlusCircle } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import agent from "admin/api/agent";
import { UserContext } from "admin/context/UserProvider";
import "./AgentSubscribers.scss";
import { formatISODateOnly } from "helpers/date";
import { toast } from "react-toastify";
import classNames from "classnames";
import Spinner from "library/Spinner/Spinner";
import { BiFilterAlt } from "react-icons/bi";
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fixedLoading, setFixedLoading] = useState(false);
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;
  const [templates, setTemplates] = useState<any>([]);
  const [originalTemplates, setOriginalTemplates] = useState<any>([]);
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
  
  const activationHandler = async (
    templateName: string,
    templateBody: string,
    templateStatus: string,
    isAddedByMarketing: boolean,
    templateId: string,
    subject: string
  ) => {
    setFixedLoading(true);
    const body = {
      templateName,
      templateBody,
      templateStatus,
      isAddedByMarketing,
      subject,
    };
    const res = await agent.EmailMarketing.updateEmailTemplate(
      userGuid,
      templateId,
      body
    );
    if (res) {
      toast.info(`Template Updated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFixedLoading(false);

      setTemplates((prevRows) => {
        return prevRows.map((row, index) => {
          const newData =
            row._id === templateId
              ? {
                  ...row,
                  status: templateStatus,
                }
              : row;

          console.log(newData);
          return newData;
        });
      });
    }
  };

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
    console.log(subscribers);

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
  
  const FilteredGridToolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const filterHandler = (status: string) => {
      setTemplates((prevState) => {
        const filteredData = originalTemplates?.filter(
          (data) => data.status === status
        );
        return status === "ALL" ? originalTemplates : filteredData;
      });
      setAnchorEl(null);
    };

    

    return (
      <GridToolbarContainer className="custom-toolbar">
        <GridToolbar />
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => filterHandler("ALL")}>All Status</MenuItem>
          <MenuItem onClick={() => filterHandler("ACTIVATED")}>
            Activated
          </MenuItem>
          <MenuItem onClick={() => filterHandler("DRAFT")}>Draft</MenuItem>
          <MenuItem onClick={() => filterHandler("DEACTIVATED")}>
            Deactivated
          </MenuItem>
        </Menu>
      </GridToolbarContainer>
    );
  };

  function handleCopyToClipboard() {
    setClipboardValue("http://localhost:3000" + paths.subscribeSubscriber + userGuid);
    //setClipboardValue("https://www.gocfs.pro" + paths.subscribeSubscriber + userGuid);
    toast("Link copied to Clipboard");
  };

  return (
    <Wrapper breadcrumb={crumbs} error={false} loading={loading}>
      <div className="agent-subscribers-container">
        <Title title="Agent Subscribers" subtitle="List of Agent's Subscribers.">
          <Button
            onClick={() => handleCopyToClipboard() }
            variant="contained"
          >
            Subscribe Link
          </Button>
        </Title>
        <div className="agent-subscribers-table">
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              slots={{ toolbar: FilteredGridToolbar }}
            />
          </div>
        </div>
      </div>
      {fixedLoading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default AgentSubscribers;