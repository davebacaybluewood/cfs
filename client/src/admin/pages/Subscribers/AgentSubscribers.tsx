import React, { SetStateAction, useContext, useState } from "react";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Title from "admin/components/Title/Title";
import { Button as MUIButton, Drawer, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { UserContext } from "admin/context/UserProvider";
import { formatISODateOnly } from "helpers/date";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import useFetchSubscribers from "../RewardsHistory/useFetchSubscribers";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import useUserRole from "hooks/useUserRole";
import Pricing from "admin/components/Pricing/Pricing";
import { createSearchParams, useNavigate } from "react-router-dom";
import agent from "admin/api/agent";
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import "./AgentSubscribers.scss";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import capitalizeText from "../../../helpers/capitalizeText";


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
  const { loading, subscribers, setSubscribers, totalSubscribers } = useFetchSubscribers(userGuid);
  const { isFreeTrial, loading: roleLoading } = useUserRole();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [activeId, setActiveId] = useState("")
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "User Type",
      width: 150,
      renderCell: (params) => params.value,
    },
    {
      field: "isSubscribed",
      headerName: "Is Upgraded to Agent?",
      width: 200,
      renderCell: (params) => params.value,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 250,
    },
    { field: "firstName", headerName: "First Name", width: 250 },
    { field: "email", headerName: "Email Address", width: 250 },
    { field: "createdAt", headerName: "Date Created", width: 200 },
    { field: "actions", headerName: "Actions", renderCell: (params) => params.value, width: 300, headerAlign: 'center' },

  ];

  const downloadAsCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
  };


  const handlers = {
    sendEmail: (userGuid: string) => {
      navigate({
        pathname: paths.emailMarketing,
        search: createSearchParams({
          leadUserGuid: userGuid
        }).toString()
      })
    },
    downloadAsCSV: (userGuid: string) => {
      alert(userGuid)
      const leadData = subscribers?.map((data) => {
        return {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          userType: !data.isSubscribed && data.type === "SUBSCRIBER"
            ? "Subscriber"
            : !data.isSubscribed && data.type === "FREE 30DAYS TRIAL"
              ? "Free 30days Trial"
              : data.previousRole === "POSITION_FREE_30DAYS_TRIAL"
                ? "Free 30days Trial"
                : "Subscriber",
          createdAt: formatISODateOnly(data.createdAt ?? ""),
          id: data.userGuid,
          isUpgradeToAgent: data.isSubscribed ? "YES" : "NO",
        }
      })
      const filteredLeadData = leadData?.filter(data => data.id === userGuid).map(s => {
        return {
          ['First Name']: s.firstName,
          ['Last Name']: s.lastName,
          ['Date Created']: s.createdAt,
          ['User Type']: s.userType,
          ['Email Address']: s.email,
          ['Is Upgraded to Agent']: s.isUpgradeToAgent,
        }
      })
      if (userGuid) {
        downloadAsCSV(filteredLeadData as any, 'Leads.csv')
        toast.success('Lead Data sucessfully downloaded.')
      }
    },
    delete: async (userGuid: string) => {
      setOpen(false)
      setActiveId(userGuid)
      setIsLoading(true)
      await agent.AgentSubscribers.deleteAgentSubsriber(userGuid)
      setSubscribers({
        subscribers: subscribers?.filter((data) => data.userGuid !== userGuid),
        totalSubscribers: parseInt(totalSubscribers?.toString() ?? "") - 1
      })
      setIsLoading(false)
      toast.success('Lead Sucessfully Deleted.')

    }
  }

  const filteredRows = subscribers?.map((subscriber) => {
    if (isLoading) {
      <Spinner variant="relative" />
    }

    return {
      id: subscriber.userGuid,
      isSubscribed: subscriber.isSubscribed ? "YES" : "NO",
      firstName: capitalizeText(subscriber.firstName),
      lastName: capitalizeText(subscriber.firstName),
      email: subscriber.email,
      createdAt: formatISODateOnly(subscriber.createdAt ?? ""),
      type:
        !subscriber.isSubscribed && subscriber.type === "SUBSCRIBER"
          ? "Subscriber"
          : !subscriber.isSubscribed && subscriber.type === "FREE 30DAYS TRIAL"
            ? "Free 30days Trial"
            : subscriber.previousRole === "POSITION_FREE_30DAYS_TRIAL"
              ? "Free 30days Trial"
              : "Subscriber",
      actions: <div className="cta-btns">
        <HtmlTooltip
          title={
            <div
              style={{
                fontSize: "1.3rem",
              }}
            >
              Send Email to {subscriber.email}.
            </div>
          }
        >
          <button onClick={() => handlers.sendEmail(subscriber.userGuid)}>Send Email</button>
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div
              style={{
                fontSize: "1.3rem",
              }}
            >
              Download Lead Data as CSV file.
            </div>
          }
        >
          <button onClick={() => handlers.downloadAsCSV(subscriber.userGuid)}>Download</button>
        </HtmlTooltip>
        <button onClick={() => {
          setOpen(true)
          setActiveId(subscriber.userGuid)
        }}>Delete</button>

      </div >

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
          <MUIButton
            onClick={() => handleCopyToClipboard()}
            variant="contained"
            style={{ marginRight: 10 }}
          >
            Copy Subscriber Registration Link
          </MUIButton>
          <MUIButton
            onClick={() => handleCopyToClipboardTrial()}
            variant="contained"
          >
            Copy Free 30 days Trial Registration Link
          </MUIButton>
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
              <DataGrid
                rows={filteredRows || []}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                isRowSelectable={(params: GridRowParams) =>
                  params.row.quantity < 1
                }
              />
            </NoInformationToDisplay >
          </div >
        </div >
      </div >
      {loading || isLoading ? <Spinner variant="fixed" /> : null}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Pricing />
      </Drawer>
      <div className="dialog-container">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <h2>Delete Confirmation</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h2>Are you sure you want to delete this one?</h2>
              <i style={{ color: '#ed3e4b', fontSize: '11px' }}>Actions cannot be reverted once done.</i>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={() => handlers.delete(activeId)} style={{ border: '1px solid #000', width: '80px', background: '#1565d8', color: '#fff', padding: '.5rem ', borderRadius: '5px', margin: '1rem .5rem' }}>Yes</button>
            <button onClick={() => setOpen(false)} style={{ border: '1px solid #000', width: '80px', background: '#ed3e4b', color: '#fff', padding: '.5rem ', borderRadius: '5px', margin: '1rem .5rem' }}>No</button>
          </DialogActions>
        </Dialog>
      </div>
    </Wrapper >
  );
};

export default AgentSubscribers;
