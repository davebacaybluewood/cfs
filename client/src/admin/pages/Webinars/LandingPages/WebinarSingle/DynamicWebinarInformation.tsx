import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { paths } from "constants/routes";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DynamicWebinarInformation.scss";
import ReactHtmlParser from "html-react-parser";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaPhotoVideo,
  FaRegCalendarCheck,
  FaUsers,
} from "react-icons/fa";
import DashboardCard from "admin/pages/Dashboard/components/DashboardCard/DashboardCard";
import useFetchWebinars from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import { toast } from "react-toastify";
import Spinner from "library/Spinner/Spinner";
import { NOTIFICATION_ENUMS } from "constants/constants";
import useFetchAgent from "admin/pages/Agents/hooks/useFetchAgent";

const DynamicWebinarInformation: React.FC = (props) => {
  const { webinarId } = useParams();
  const { webinars, loading } = useFetchWebinars(webinarId);
  const [video, setVideo] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const agentStorage = localStorage.getItem("userInfo");
  const { userGuid } = JSON.parse(agentStorage ?? "");
  const agentInfo = useFetchAgent(userGuid?.toString());
  const agentWebinars = agentInfo.agent?.webinars?.filter(
    (data: any) => data.webinarGuid === webinars?.webinarGuid
  )[0];

  const handleClose = () => {
    setActionDialog(false);
  };

  const requestHandler = (id: string) => {
    setActionLoading(true);
    fetch(
      ENDPOINTS.AGENT_WEBINAR_UPDATE.replace(":webinarGuid", id).replace(
        ":agentId",
        userGuid ?? ""
      ),
      {
        method: "PUT",
        body: JSON.stringify({
          status: NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST,
          mode: true,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getUserToken(),
        },
      }
    )
      .then((response) => {
        toast.info(`Request Submitted`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(paths.cfsWebinars);
      })
      .then((result) => {
        console.log(result);
        setActionLoading(false);
      });
  };

  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Activated Webinars",
      url: paths.cfsWebinars,
      isActive: false,
    },
    {
      title: webinars.title || "",
      url: paths.viewSingleDynamicWebinar,
      isActive: true,
    },
  ];
  const statistics = [
    {
      countText: "Short Video View",
      count: 2,
      url: paths.login,
      icon: <FaPhotoVideo />,
    },
    {
      countText: "Long Video View",
      count: 2,
      url: paths.login,
      icon: <FaPhotoVideo />,
    },
    {
      countText: "Webinar Visits",
      count: 2,
      url: paths.login,
      icon: <FaUsers />,
    },
    {
      countText: "Scheduled Appointment",
      count: 2,
      url: paths.login,
      icon: <FaRegCalendarCheck />,
    },
  ];

  const pageConfigs = {
    calendlyLink: !!agentWebinars?.calendlyUrl,
    isPublished:
      agentWebinars?.status === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED,
    isRequested:
      agentWebinars?.status === NOTIFICATION_ENUMS.WEBINARS.WEBINAR_REQUEST,
  };

  useEffect(() => {
    return () => {
      setActionLoading(false);
    };
  }, []);

  return (
    <Wrapper
      className="webinar-dynamic-container"
      loading={loading}
      error={false}
      breadcrumb={breadcrumb}
    >
      {actionLoading ? <Spinner variant="fixed" /> : null}
      <Grid container spacing={2} marginBottom={2}>
        {statistics.map((statistic: any, index: number) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
            <DashboardCard {...statistic} />
          </Grid>
        ))}
      </Grid>
      <div className="webinar-content">
        <div className="webinar-content-header">
          <div>
            <h2>
              {webinars?.title}{" "}
              <ComponentValidator
                showNull={!pageConfigs.isPublished && !pageConfigs.isRequested}
              >
                <span>
                  {pageConfigs.isPublished ? (
                    <FaCheckCircle className="success" />
                  ) : (
                    <FaInfoCircle className="info" />
                  )}
                </span>
              </ComponentValidator>
            </h2>
            {pageConfigs.calendlyLink ? (
              <div className="view-calendly-link">
                <a target="_blank">
                  View Calendly Calendar <FaExternalLinkAlt />
                </a>
              </div>
            ) : null}
          </div>
          <ComponentValidator
            showNull={
              (pageConfigs.isPublished && !actionLoading) ||
              (pageConfigs.isRequested && !actionLoading)
            }
          >
            <div className="webinar-actions">
              <Button
                variant="contained"
                onClick={() => requestHandler(webinars.webinarGuid)}
              >
                Request Permission
              </Button>
            </div>
          </ComponentValidator>
        </div>
        <div className="webinar-html">
          <h3 className="webinar-label">
            Short Video{" "}
            <Button
              variant="contained"
              onClick={() => {
                setVideo(webinars.introVideo);
                setOpenModal(true);
              }}
            >
              Play Video
            </Button>
          </h3>
          {ReactHtmlParser(webinars?.introVideoContent ?? "")}
        </div>
        <div className="webinar-html">
          <h3 className="webinar-label">
            Long Video{" "}
            <Button
              variant="contained"
              onClick={() => {
                setVideo(webinars.fullVideo);
                setOpenModal(true);
              }}
            >
              Play Video
            </Button>
          </h3>
          {ReactHtmlParser(webinars?.fullVideoContent ?? "")}
        </div>
      </div>

      <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <iframe
          className="embed-responsive-item-admin"
          src={video}
          allow="autoplay; fullscreen"
          allowFullScreen
          data-ready="true"
        ></iframe>
      </Dialog>

      <Dialog open={actionDialog} onClose={handleClose}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to request {webinars.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontSize: "13px" }}>
            No
          </Button>
          <Button
            onClick={() => requestHandler(webinars.webinarGuid)}
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to request this webinar.
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};
export default DynamicWebinarInformation;
