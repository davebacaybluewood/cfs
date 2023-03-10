import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Webinars.scss";
import ReactHtmlParser from "html-react-parser";
import useFetchWebinars from "./hooks/useFetchWebinars";
import {
  FaEdit,
  FaEnvelopeOpenText,
  FaFly,
  FaSnowman,
  FaTrashAlt,
  FaUserShield,
} from "react-icons/fa";
import DashboardCard from "AdminNew/pages/Dashboard/components/DashboardCard/DashboardCard";
import ENDPOINTS from "constants/endpoints";
import axios from "axios";
import getUserToken from "helpers/getUserToken";

const WebinarSingle: React.FC = (props) => {
  const { webinarId } = useParams();
  const { webinars, loading } = useFetchWebinars(webinarId);
  const [video, setVideo] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Webinars",
      url: paths.webinar,
      isActive: false,
    },
    {
      title: webinars.title || "",
      url: paths.webinar,
      isActive: true,
    },
  ];
  const statistics = [
    {
      countText: "Short Video View",
      count: 2,
      url: paths.login,
      icon: <FaEnvelopeOpenText />,
    },
    {
      countText: "Long Video View",
      count: 2,
      url: paths.login,
      icon: <FaFly />,
    },
    {
      countText: "Webinar Visits",
      count: 2,
      url: paths.login,
      icon: <FaUserShield />,
    },
    {
      countText: "Scheduled Appointment",
      count: 2,
      url: paths.login,
      icon: <FaSnowman />,
    },
  ];

  const deleteWebinar = () => {
    const config = {
      Authorization: "Bearer " + getUserToken(),
    };
    const endpoint = ENDPOINTS.WEBINAR_SINGLE.replace(
      ":webinarId",
      webinarId ?? ""
    );
    setActionLoading(true);
    axios
      .delete(endpoint, { headers: config })
      .then((response) => {
        setActionLoading(false);
        navigate(paths.webinar);
      })
      .catch((error) => {
        console.log(error);
        setActionLoading(false);
      });
  };

  return (
    <Wrapper
      className="webinar-admin-container"
      loading={loading || actionLoading}
      error={false}
      breadcrumb={breadcrumb}
    >
      <Grid container spacing={2} marginBottom={2}>
        {statistics.map((statistic: any, index: number) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
            <DashboardCard {...statistic} />
          </Grid>
        ))}
      </Grid>
      <div className="webinar-content">
        <div className="webinar-content-header">
          <h2>{webinars?.title}</h2>
          <div className="webinar-actions">
            <button
              onClick={() =>
                navigate(paths.webinarAdminForm.replace(":id", webinarId ?? ""))
              }
            >
              <FaEdit />
            </button>
            <button onClick={() => setActionDialog(true)}>
              <FaTrashAlt />
            </button>
          </div>
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
      <Dialog open={actionDialog} onClose={() => setActionDialog(false)}>
        <DialogContent>
          <DialogContentText fontSize={15}>
            Are you sure you want to delete {webinars.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setActionDialog(false)}
            style={{ fontSize: "13px" }}
          >
            No
          </Button>
          <Button
            onClick={() => deleteWebinar()}
            autoFocus
            style={{ fontSize: "13px" }}
          >
            Yes, I want to delete this webinar.
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

WebinarSingle.defaultProps = {
  title: "Webinars",
  subtitle: "Lorem Ipsum is simply dummy text of the printing",
  showHeaderButtons: true,
};
export default WebinarSingle;
