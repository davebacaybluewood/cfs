import { AgentStatuses } from "AdminNew/pages/Agents/types";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";

type HeaderButtonsProps = {
  status: AgentStatuses;
  id: string;
  setOpen: Dispatch<SetStateAction<any>>;
  setDialogStatus: Dispatch<SetStateAction<any>>;
};

const ActionButtons: React.FC<HeaderButtonsProps> = (props) => {
  const declineHandler = () => {
    props.setDialogStatus(AgentStatuses.DECLINED);
    props.setOpen(true);
  };
  const activateHandler = () => {
    props.setDialogStatus(AgentStatuses.ACTIVATED);
    props.setOpen(true);
  };
  const deactivateHandler = () => {
    props.setDialogStatus(AgentStatuses.DEACTIVATED);
    props.setOpen(true);
  };
  if (props.status === AgentStatuses.ACTIVATED) {
    return <button onClick={deactivateHandler}>Deactivate This Agent</button>;
  } else if (props.status === AgentStatuses.DEACTIVATED) {
    return <button onClick={activateHandler}>Activate This Agent</button>;
  } else if (props.status === AgentStatuses.DECLINED) {
    return <button onClick={activateHandler}>Activate This Agent</button>;
  } else if (props.status === AgentStatuses.PENDING) {
    return (
      <React.Fragment>
        <button onClick={declineHandler}>Decline This Agent</button>
        <button onClick={activateHandler}>Activate This Agent</button>
      </React.Fragment>
    );
  }
  return <React.Fragment />;
};
const HeaderButtons: React.FC<
  Omit<HeaderButtonsProps, "setOpen" | "setDialogStatus">
> = (props) => {
  const [agentStatus, setAgentStatus] = useState(props.status);
  const [dialogStatus, setDialogStatus] = useState<AgentStatuses>(
    AgentStatuses.ACTIVATED
  );
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const statusHandler = (agentId: string) => {
    const status =
      dialogStatus === AgentStatuses.ACTIVATED
        ? AgentStatuses.ACTIVATED
        : dialogStatus === AgentStatuses.DEACTIVATED
        ? AgentStatuses.DEACTIVATED
        : dialogStatus === AgentStatuses.DECLINED
        ? AgentStatuses.DECLINED
        : AgentStatuses.ACTIVATED;

    fetch(ENDPOINTS.AGENT_UPDATE_STATUS.replace(":agentId", agentId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getUserToken(),
      },
      body: JSON.stringify({
        status: dialogStatus,
      }),
    })
      .then((response) => {
        toast.info(`Agent ${status}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (status === AgentStatuses.ACTIVATED) {
          navigate(paths.agents);
        } else if (status === AgentStatuses.DEACTIVATED) {
          navigate(paths.deactivatedAgents);
        } else if (status === AgentStatuses.DECLINED) {
          navigate(paths.declinedAgents);
        } else {
          navigate(paths.agentRequests);
        }
      })
      .then((result) => {
        console.log(result);
      });
  };

  const dialogMessageStatus =
    dialogStatus === AgentStatuses.ACTIVATED
      ? "Activate"
      : dialogStatus === AgentStatuses.DEACTIVATED
      ? "Deactivate"
      : dialogStatus === AgentStatuses.DECLINED
      ? "Decline"
      : "";

  return (
    <div className="profile-actions">
      <ActionButtons
        {...props}
        setOpen={setOpen}
        setDialogStatus={setDialogStatus}
      />
      <ToastContainer />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText fontSize={18}>
            Are you sure you want to {dialogMessageStatus.toLowerCase()} the
            status of this agent?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontSize: "13px" }}>
            No
          </Button>
          <Button
            onClick={() => statusHandler(props.id)}
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to {dialogMessageStatus} this Agent
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeaderButtons;
