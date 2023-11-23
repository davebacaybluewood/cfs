import React, { useState, useEffect } from "react";
import MyWebPageWrapper from "./Layout/MyWebPageWrapper";
import { Box, Container, Grid, Button as MUIButton, Modal, Typography } from "@mui/material";
import Spinner from "library/Spinner/Spinner";
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs";
import Button from "library/Button/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti" 
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiSend } from "react-icons/fi";
import { paths } from "constants/routes";
import Timeline from "pages/MyWebPage/Timeline";
import adminAgent from "admin/api/agent";
import Event from "admin/models/eventModel";
import agentLinks from "./helpers/agentLinks";
import useAgentData from "./useAgentData";
import FeedTabs, { ContentTypes } from "./FeedTabs";
import "./MyWebPage.scss";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import contactLinks from "./helpers/contactLinks";
import RouteLinks from "./helpers/routeLinks";
import { useCopyToClipboard } from "admin/hooks/useCopyToClipboard";
import { toast } from "react-toastify";
import { FaShareSquare } from "react-icons/fa";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import BusinessCard from "admin/pages/Profile/components/ProfileHeader/BusinessCard/BusinessCard";

const MyWebPage: React.FC = () => {
  const { user } = useParams()
  const [content, setContent] = useState<ContentTypes>("home")
  const [active, setActive] = useState(false)
  const [events, setEvents] = useState<Event[] | undefined>()
  const [modalOpen, setModalOpen] = useState(true)

  /* General Agent Information */
  const userGuid = `${user}`
  const { profile } = useFetchUserProfile(userGuid)
  const {
    Agent,
    address,
    avatar,
    defaultAvatar,
    email,
    facebook,
    licenseNumber,
    linkedIn,
    phoneNumber,
    twitter,
    bio,
    loading,
    languages,
  } = useAgentData(userGuid)

  useEffect(() => {
    const getEvents = async () => {
      const eventData = await adminAgent.Events.getEvents(`${user}`)
      setEvents(eventData)
    }

    getEvents();
  }, []);

  const navigate = useNavigate();
  const [clipboardValue, setClipboardValue] = useCopyToClipboard();

  const location = useLocation()

  function handleCopyToClipboard() {
    setClipboardValue(
      window.location.host + location.pathname
    );
    toast("Link copied to Clipboard");
  }

  const links = agentLinks(address, facebook, linkedIn, twitter);
  const contactLink = contactLinks(address ?? '', phoneNumber ?? '', email ?? '', licenseNumber ?? '', languages ?? [])

  return (
    <MyWebPageWrapper showNavBar showFooter>
      <Helmet>
        <title>Profile | {Agent}</title>
      </Helmet>
      {loading ? (
        <Spinner variant="fixed" />
      ) : (
        <div className="my-webpage-container">
          <div className="half-bg" />
          <Container>
            <div className="profile-section-container">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  <img src={avatar} alt={avatar} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                  <div className="profile-captions">
                    <h2>{Agent}</h2>
                    <p className="agent-description">{bio}</p>
                    <div className="social-container">
                      <div className="social-links">
                        {links.map((item, index) => (
                          <div className="social-content" key={index}>
                            <a href={item.link} target="_blank">
                              {item.icon} <span>{item.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="copy">
                        <HtmlTooltip
                          title={
                            <div
                              style={{
                                fontSize: "1.3rem",
                              }}
                            >
                              Copy Link to Clipboard
                            </div>
                          }
                        >
                          <div onClick={() => handleCopyToClipboard()}>
                            <span> <FaShareSquare /> </span>
                          </div>
                        </HtmlTooltip>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
          <div className="tri-col">
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <div className="left-col">
                    <div className="contact-container">
                      {contactLink.map((con) => (
                        <div className="contact">
                          {con.icon} <span>{con.text}</span>{" "}
                        </div>
                      ))}
                    </div>
                    <div className="left-col-actions">
                      <Button variant="primary">
                        <div className="button-content">
                          <BsChatRightTextFill /> <span>Contact Me</span>
                        </div>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          window.open(
                            paths.testimonialForm.replace(":userGuid", userGuid)
                          )
                        }
                      >
                        <div className="button-content">
                          <FiSend /> <span>Recommendation</span>
                        </div>
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setModalOpen(true)}
                      >
                        {" "}
                        <div className="button-content">
                          <TiBusinessCard />
                          <span>Business Card</span>{" "}
                        </div>
                      </Button>
                      <Modal
                        sx={{ background: "rgba(0, 0, 0, 0.7)" }}
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute" as "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "336px",
                            bgcolor: "background.paper",
                            border: "2px solid #00004d",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <BusinessCard
                              email={profile?.emailAddress ?? ""}
                              name={
                                `${profile?.firstName} ${profile?.lastName}` ??
                                ""
                              }
                              position={
                                profile?.role === "ROLE_MASTER_ADMIN"
                                  ? "ROLE: MASTER ADMIN"
                                  : profile?.role ?? ""
                              }
                              licenseNumber={profile?.licenseNumber ?? ""}
                              phoneNumber={profile?.phoneNumber ?? ""}
                              state={profile?.state ?? ""}
                              userGuid={profile?.userGuid ?? ""}
                            />
                          </div>
                          <hr
                            style={{
                              borderTop: "1px solid lightgray",
                              margin: "1rem auto",
                            }}
                          />
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Download Business Card
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 0.2, mb: 2 }}
                          >
                            Expand your professional network by downloading the
                            business card from this profile. Click the
                            'Download' button to collect valuable contacts
                            effortlessly.
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="middle-col">
                    <React.Fragment>
                      <div className="navbar-main-feed">
                        <FeedTabs
                          {...{ active, content, setActive, setContent }}
                        />
                      </div>
                      <div className="tabs-content">
                        <Timeline
                          content={content}
                          userGuid={userGuid}
                          testimonials={profile?.testimonials}
                        />
                      </div>
                    </React.Fragment>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <div className="right-col">
                    <div className="right-col-actions">
                      <RouteLinks />
                    </div>
                    <div className="right-col-content">
                      <h3>Agent Calculator</h3>
                      <div className="icon-holder">
                        <BsCalculator />
                      </div>
                      <Button onClick={() => navigate("/calculator")}>
                        Calculate{" "}
                        <span>
                          <AiOutlineArrowRight />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </MyWebPageWrapper>
  )
}

export default MyWebPage
