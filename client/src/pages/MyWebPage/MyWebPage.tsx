import React, { useState, useEffect } from "react"
import MyWebPageWrapper from "./Layout/MyWebPageWrapper"
import { Box, Container, Grid, Modal, Typography } from "@mui/material"
import Spinner from "library/Spinner/Spinner"
import { FaPhone, FaAddressCard } from "react-icons/fa"
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs"
import { MdEmail } from "react-icons/md"
import Button from "library/Button/Button"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { FiSend } from "react-icons/fi"
import { paths } from "constants/routes"
import { CiGift, CiTrophy, CiVault } from "react-icons/ci"
import { TiBusinessCard } from "react-icons/ti"
import Timeline from "pages/MyWebPage/Timeline"
import adminAgent from "admin/api/agent"
import { TimelinePostProps } from "library/TimelinePost/TimelinePost"
import Event from "admin/models/eventModel"
import agentLinks from "./helpers/agentLinks"
import useFetchBlogs from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs"
import useAgentData from "./useAgentData"
import FeedTabs, { ContentTypes } from "./FeedTabs"
import "./MyWebPage.scss"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import BusinessCard from "admin/pages/Profile/components/ProfileHeader/BusinessCard/BusinessCard"

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
  } = useAgentData(userGuid)

  /* Fetch Events */
  useEffect(() => {
    const getEvents = async () => {
      const eventData = await adminAgent.Events.getEvents(`${user}`)
      setEvents(eventData)
    }

    getEvents()
  }, [])

  /* Fetch Blogs */
  const { blogs } = useFetchBlogs()

  const navigate = useNavigate()

  const links = agentLinks(address, facebook, linkedIn, twitter)

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
                      {links.map((item, index) => (
                        <div className="social-content" key={index}>
                          <a href={item.link} target="_blank" rel="noreferrer">
                            {item.icon} <span>{item.title}</span>
                          </a>
                        </div>
                      ))}
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
                      <div className="contact">
                        <FaPhone /> <span>{phoneNumber}</span>
                      </div>
                      <div className="contact">
                        <MdEmail />{" "}
                        <span>
                          <a href={`mailto:${email}`} className="mailto">
                            {email}
                          </a>
                        </span>
                      </div>
                      <div className="contact">
                        <FaAddressCard /> <span>{licenseNumber}</span>
                      </div>
                    </div>
                    <div className="left-col-actions">
                      <Button variant="primary">
                        {" "}
                        <BsChatRightTextFill /> <span>Contact Me</span>{" "}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          window.open(
                            paths.testimonialForm.replace(":userGuid", userGuid)
                          )
                        }
                      >
                        {" "}
                        <FiSend /> <span>Testimonial</span>{" "}
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setModalOpen(true)}
                      >
                        {" "}
                        <TiBusinessCard />
                        <span>Business Card</span>{" "}
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
                      <Button
                        onClick={() =>
                          window.open(
                            "https://agent.comfortfinancialsolutions.com/signup"
                          )
                        }
                      >
                        <div className="icon-holder">
                          <CiTrophy />
                        </div>
                        Become an Agent
                      </Button>
                      <Button
                        onClick={() =>
                          window.open(paths.subscriberRegistration)
                        }
                      >
                        <div className="icon-holder">
                          <CiGift />
                        </div>
                        Subscribe to earn points
                      </Button>
                      <Button
                        onClick={() => window.open(paths.portalRegistration)}
                      >
                        <div className="icon-holder">
                          <CiVault />
                        </div>
                        Portal Free 30 days trial
                      </Button>
                    </div>
                    <div className="right-col-content">
                      <h3>Agent Calculator</h3>
                      <div className="icon-holder">
                        <BsCalculator />
                      </div>
                      <p>Lorem ipsum dolor sit.</p>
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
