import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Webinars.scss";
import ReactHtmlParser from "html-react-parser";
import useFetchWebinars from "./hooks/useFetchWebinars";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ENDPOINTS from "constants/endpoints";
import axios from "axios";
import getUserToken from "helpers/getUserToken";
import WebinarStatistics from "./components/WebinarStatistics";

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
      <WebinarStatistics webinarGuid={webinars?.webinarGuid ?? ""} />
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
