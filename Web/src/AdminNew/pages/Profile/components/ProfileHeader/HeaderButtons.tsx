import { AgentStatuses } from "AdminNew/pages/Agents/types";
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
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "library/Spinner/Spinner";
import FormikTextInput from "library/Formik/FormikInput";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";

export type HeaderButtonConfigs = {
  isProfileView?: boolean;
};
type HeaderButtonsProps = {
  status: AgentStatuses;
  id: string;
  setOpen: Dispatch<SetStateAction<any>>;
  setDialogStatus: Dispatch<SetStateAction<any>>;
  setFormDialogStatus: Dispatch<SetStateAction<any>>;
  headerConfigs?: HeaderButtonConfigs;
};

type CalendlyInputTypes = {
  personalWebPage: string;
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

  const activateWithFormHandler = () => {
    props.setFormDialogStatus(true);
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
        <button onClick={activateWithFormHandler}>Activate This Agent</button>
      </React.Fragment>
    );
  }
  return <React.Fragment />;
};
const HeaderButtons: React.FC<
  Omit<
    HeaderButtonsProps,
    "setOpen" | "setDialogStatus" | "setFormDialogStatus"
  >
> = (props) => {
  const [agentStatus, setAgentStatus] = useState(props.status);
  const [dialogStatus, setDialogStatus] = useState<AgentStatuses>(
    AgentStatuses.ACTIVATED
  );
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenFormDialog(false);
  };
  const [loading, setLoading] = useState(false);

  const statusHandler = (agentId: string) => {
    const status =
      dialogStatus === AgentStatuses.ACTIVATED
        ? AgentStatuses.ACTIVATED
        : dialogStatus === AgentStatuses.DEACTIVATED
        ? AgentStatuses.DEACTIVATED
        : dialogStatus === AgentStatuses.DECLINED
        ? AgentStatuses.DECLINED
        : AgentStatuses.ACTIVATED;

    setLoading(true);
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
        setLoading(false);
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

  const initialValues: CalendlyInputTypes = {
    personalWebPage: "",
  };

  const validationSchema = Yup.object({
    personalWebPage: Yup.string().required(
      "Personal Calendar field is required."
    ),
  });

  return (
    <div className="profile-actions">
      <Spinner isVisible={loading} />
      <ComponentValidator
        showNull={props.headerConfigs?.isProfileView === true}
      >
        <ActionButtons
          {...props}
          setOpen={setOpen}
          setDialogStatus={setDialogStatus}
          setFormDialogStatus={setOpenFormDialog}
        />
      </ComponentValidator>
      <ToastContainer />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText fontSize={15}>
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
      <Dialog open={openFormDialog} onClose={handleClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            setLoading(true);
            fetch(ENDPOINTS.AGENT_UPDATE_STATUS.replace(":agentId", props.id), {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getUserToken(),
              },
              body: JSON.stringify({
                status: AgentStatuses.ACTIVATED,
                calendlyLink: values.personalWebPage,
              }),
            })
              .then((response) => {
                toast.info(`Agent Activated`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                navigate(paths.agents);
              })
              .then((result) => {
                console.log(result);
                setLoading(false);
              });
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <React.Fragment>
                <DialogContent className="form-dialog">
                  <DialogContentText fontSize={18}>
                    By Approving this agent, you need to add additional details.
                  </DialogContentText>
                  <Grid container spacing={1} marginTop={1}>
                    <Grid item xs={12} lg={12}>
                      <FormikTextInput
                        name="personalWebPage"
                        label="Personal Calendar *"
                        value={values.personalWebPage}
                        className="text-input"
                        variant="standard"
                        error={!!values.personalWebPage}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} style={{ fontSize: "13px" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    autoFocus
                    style={{ fontSize: "13px" }}
                  >
                    Activate This Agent
                  </Button>
                </DialogActions>
              </React.Fragment>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};

export default HeaderButtons;
