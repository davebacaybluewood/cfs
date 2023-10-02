import React, { useEffect, useState } from "react";
import "./Users.scss";
import { CrumbTypes } from "../Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import Title from "admin/components/Title/Title";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Grid,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import Table from "admin/components/Table/Table";
import {
  AGENT_ROLES,
  CONTENT_CREATOR_ROLES,
  EDITOR_ROLES,
  POSITIONS,
} from "pages/PortalRegistration/constants";
import Badge from "library/Badge/Badge";
import { formatISODateOnly } from "helpers/dateFormatter";
import { ProfileData } from "admin/hooks/useFetchProfile";
import ENDPOINTS from "constants/endpoints";
import axios from "axios";
import getUserToken from "helpers/getUserToken";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { AgentStatuses } from "../Agents/types";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import FormikTextInput from "library/Formik/FormikInput";
import { Formik } from "formik";
import agent from "admin/api/agent";

interface ActionButtonsProps {
  userGuid: string;
  status: string;
  isAgent: boolean;
  id: string;
  setProfiles: React.Dispatch<React.SetStateAction<ProfileData[] | undefined>>;
}
const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Financial Solutions",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Users",
    url: paths.users,
    isActive: true,
  },
];

const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const initialValues = {
    personalWebPage: "",
    displayCalendly: true,
  };
  const [dialogStatus, setDialogStatus] = useState<AgentStatuses>(
    AgentStatuses.ACTIVATED
  );
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [displayCalendlyToggle, setDisplayCalendlyToggle] = useState(true);

  const dialogMessageStatus =
    dialogStatus === AgentStatuses.ACTIVATED
      ? "Activate"
      : dialogStatus === AgentStatuses.DEACTIVATED
      ? "Deactivate"
      : dialogStatus === AgentStatuses.DECLINED
      ? "Decline"
      : dialogStatus === AgentStatuses.DELETE
      ? "Delete"
      : "";

  const handleDelete = async (id: string) => {
    setLoading(true);
    setConfirmationDialog(true);
    setDialogStatus(AgentStatuses.DELETE);
    const res = await agent.Agents.deleteAgent(id);

    if (res) {
      setConfirmationDialog(false);
      setLoading(false);
      setDialogStatus(AgentStatuses.ACTIVATED);
      props.setProfiles((prevState) =>
        prevState?.filter((data) => data.userGuid !== activeId)
      );
    }
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

    setLoading(true);
    fetch(ENDPOINTS.AGENT_UPDATE_STATUS.replace(":agentId", props.id), {
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
        setLoading(false);
        setConfirmationDialog(false);
        window.location.reload();
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
      });
  };

  const dialogHandler = () => {
    if (props.isAgent) {
      setOpenFormDialog(true);
    } else {
      setConfirmationDialog(true);
    }
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog(false);
    setAnchorEl(null);
  };

  return (
    <div className="action-buttons">
      {loading ? <Spinner variant="fixed" /> : null}
      <button
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="ellipsis-btn"
      >
        <FaEllipsisV />
      </button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() =>
            navigate(paths.adminAgentProfile.replace(":id", props.userGuid))
          }
        >
          View Profile
        </MenuItem>
        <MenuItem
          onClick={() => dialogHandler()}
          disabled={props.status === "ACTIVATED"}
        >
          Activate
        </MenuItem>
        <MenuItem onClick={handleClose} disabled={props.status === "ACTIVATED"}>
          Decline
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDialogStatus(AgentStatuses.DELETE);
            setConfirmationDialog(true);
            setActiveId(props.userGuid);
          }}
          // disabled={props.status === "ACTIVATED"}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={confirmationDialog}
        onClose={() => closeConfirmationDialog()}
      >
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to {dialogMessageStatus.toLowerCase()}{" "}
            {dialogStatus === AgentStatuses.DELETE ? "" : `the status of `}
            this profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => closeConfirmationDialog()}
            style={{ fontSize: "13px" }}
          >
            No
          </Button>
          <Button
            onClick={() =>
              dialogStatus === AgentStatuses.DELETE
                ? handleDelete(activeId)
                : statusHandler(props.userGuid)
            }
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to {dialogMessageStatus} this profile.
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
                window.location.reload();
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
                    By approving this profile, you need to add additional
                    details.
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
                  <Button
                    onClick={() => {
                      setOpenFormDialog(false);
                      setAnchorEl(null);
                    }}
                    style={{ fontSize: "13px" }}
                  >
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

const Users: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[] | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios(ENDPOINTS.PROFILE_ROOT, {
        headers: {
          Authorization: "Bearer " + getUserToken(),
        },
      });

      setProfiles(await response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const tableDefs = {
    columns: [
      {
        id: "userGuid",
        label: "ID",
        minWidth: 80,
        align: "left",
      },
      {
        id: "name",
        label: "Name",
        minWidth: 80,
        align: "left",
      },
      {
        id: "emailAddress",
        label: "Email Address",
        minWidth: 80,
        align: "left",
      },
      {
        id: "position",
        label: "Positions",
        minWidth: 80,
        align: "left",
      },
      {
        id: "roles",
        label: "Roles",
        minWidth: 80,
        align: "left",
      },
      {
        id: "status",
        label: "Status",
        minWidth: 80,
        align: "left",
      },
      {
        id: "createdAt",
        label: "Date Registered",
        minWidth: 80,
        align: "left",
      },
      {
        id: "actions",
        label: "",
        minWidth: 80,
        align: "left",
      },
    ],

    rows: profiles?.map((data) => {
      const isAgent = data.position?.some((e) => e.value === "POSITION_AGENT");
      const tableData = {
        userGuid: data?.userGuid,
        name: !data?.name ? data?.firstName + " " + data?.lastName : data?.name,
        position: data?.position.map((data) => {
          const isAgent = POSITIONS[0].value === data.value;
          const isEditor = POSITIONS[1].value === data.value;
          const isContentCreator = POSITIONS[2].value === data.value;

          const badgeVariant = isAgent
            ? "secondary"
            : isEditor || isContentCreator
            ? "danger"
            : "primary";
          return (
            <React.Fragment>
              <Badge variant={badgeVariant}>{data.label}</Badge>
            </React.Fragment>
          );
        }),
        roles: data?.roles.map((data) => {
          const isAgent = AGENT_ROLES?.some((e) => e.value === data.value);
          const isEditor = EDITOR_ROLES?.some((e) => e.value === data.value);
          const isContentCreator = CONTENT_CREATOR_ROLES?.some(
            (e) => e.value === data.value
          );

          const badgeVariant = isAgent
            ? "secondary"
            : isEditor || isContentCreator
            ? "danger"
            : "primary";
          return (
            <React.Fragment>
              <Badge variant={badgeVariant} isBordered>
                {data.label}
              </Badge>
            </React.Fragment>
          );
        }),
        status:
          data?.status.charAt(0).toUpperCase() +
          data?.status.slice(1).toLowerCase(),
        createdAt: formatISODateOnly(data.createdAt),
        emailAddress: data.emailAddress,
        actions: (
          <ActionButtons
            userGuid={data?.userGuid}
            status={data?.status}
            isAgent={isAgent}
            id={data?._id}
            setProfiles={setProfiles}
          />
        ),
      };
      return tableData;
    }),
  };

  const navigate = useNavigate();

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={loading}
      className="users-container"
    >
      <Title title="Users" subtitle="List of all users.">
        <Button
          variant="contained"
          onClick={() => navigate(paths.profileFormAdd)}
        >
          Add Users
        </Button>
      </Title>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={12}>
          <Table
            columns={tableDefs.columns}
            rows={tableDefs.rows}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Users;
