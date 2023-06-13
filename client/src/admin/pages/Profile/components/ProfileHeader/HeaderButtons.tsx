import { AgentStatuses } from "admin/pages/Agents/types";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Grid,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import FormikTextInput from "library/Formik/FormikInput";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import BusinessCard from "./BusinessCard/BusinessCard";
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import { UserContext } from "admin/context/UserProvider";
import useFetchUserProfile from "admin/hooks/useFetchProfile";

export type HeaderButtonConfigs = {
  isProfileView?: boolean;
};

type UserInfo = {
  name: string;
  email: string;
  licenseNumber: string;
  phoneNumber: string;
  state: string;
};
type HeaderButtonsProps = {
  status: AgentStatuses;
  id: string;
  userGuid: string;
  setOpen: Dispatch<SetStateAction<any>>;
  setDialogStatus: Dispatch<SetStateAction<any>>;
  setFormDialogStatus: Dispatch<SetStateAction<any>>;
  headerConfigs?: HeaderButtonConfigs;
  userInfo?: UserInfo;
};

type CalendlyInputTypes = {
  personalWebPage: string;
  displayCalendly: boolean;
};

const ActionButtons: React.FC<HeaderButtonsProps> = (props) => {
  const navigate = useNavigate();
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
    return (
      <React.Fragment>
        <button onClick={deactivateHandler}>Deactivate This Profile</button>
        <button
          onClick={() =>
            navigate(paths.profileSettings.replace(":userGuid", props.userGuid))
          }
        >
          Settings
        </button>
      </React.Fragment>
    );
  } else if (props.status === AgentStatuses.DEACTIVATED) {
    return <button onClick={activateHandler}>Activate This Profile</button>;
  } else if (props.status === AgentStatuses.DECLINED) {
    return <button onClick={activateHandler}>Activate This Profile</button>;
  } else if (props.status === AgentStatuses.PENDING) {
    return (
      <React.Fragment>
        <button onClick={declineHandler}>Decline This Profile</button>
        <button onClick={activateWithFormHandler}>Activate This Profile</button>
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
        toast.info(`Profile ${status}`, {
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
    displayCalendly: false,
  };

  const [displayCalendlyToggle, setDisplayCalendlyToggle] = useState(false);
  const [showBusinessCard, setShowBusinessCard] = useState(false);

  const userCtx = useContext(UserContext) as any;
  const { profile, loading: profileLoading } = useFetchUserProfile(
    userCtx?.user?.userGuid ?? ""
  );
  const USER_ROLES = profile?.roles;
  const isAdmin = USER_ROLES?.some((f) => {
    return f.value === PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN.value;
  });
  return (
    <div className="profile-actions">
      {loading ? <Spinner variant="fixed" /> : null}
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

      {props.headerConfigs?.isProfileView ? (
        <button onClick={() => navigate(paths.profileForm)}>
          Edit Profile
        </button>
      ) : null}

      {isAdmin && !props.headerConfigs?.isProfileView ? (
        <button
          onClick={() =>
            navigate(
              paths.profileFormWithProfileId.replace(
                ":userGuid",
                props.userGuid ?? ""
              )
            )
          }
        >
          Edit Profile
        </button>
      ) : null}

      {/* <button onClick={() => setShowBusinessCard(true)}>Business Card</button> */}

      <ToastContainer />
      <Dialog
        open={showBusinessCard}
        onClose={() => setShowBusinessCard(false)}
      >
        <DialogContent>
          <DialogContentText fontSize={15}>
            <BusinessCard
              email={props.userInfo?.email ?? ""}
              name={props.userInfo?.name ?? ""}
              licenseNumber={props.userInfo?.licenseNumber ?? ""}
              phoneNumber={props.userInfo?.phoneNumber ?? ""}
              state={props.userInfo?.state ?? ""}
              userGuid={props.userGuid}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
            Yes, I want to {dialogMessageStatus} this Profile
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openFormDialog} onClose={handleClose}>
        <Formik
          initialValues={initialValues}
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
                displayCalendly: values.displayCalendly,
              }),
            })
              .then((response) => {
                toast.info(`Profile Activated`, {
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
          {({ values, handleSubmit, setFieldValue }) => {
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
                        label="Personal Calendar (Optional)"
                        value={values.personalWebPage}
                        className="text-input"
                        variant="standard"
                        error={!!values.personalWebPage}
                      />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            className="switch-font"
                            onChange={
                              (e) => {
                                setDisplayCalendlyToggle(
                                  !displayCalendlyToggle
                                );

                                setFieldValue(
                                  "displayCalendly",
                                  !displayCalendlyToggle
                                );
                              }
                              // setFieldValue("displayCalendly", e.target.value)
                            }
                            value={displayCalendlyToggle}
                            name="displayCalendly"
                            // checked={values.displayCalendly}
                          />
                        }
                        label="Display Calendly Section"
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
                    Activate This Profile
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
