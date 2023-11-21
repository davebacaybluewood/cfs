import React, { useState, useEffect } from "react";
import MyWebPageWrapper from "./Layout/MyWebPageWrapper";
import { Container, Grid } from "@mui/material";
import Spinner from "library/Spinner/Spinner";
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs";
import Button from "library/Button/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
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

const MyWebPage: React.FC = () => {
  const { user } = useParams();
  const [content, setContent] = useState<ContentTypes>("home");
  const [active, setActive] = useState(false);
  const [events, setEvents] = useState<Event[] | undefined>();


  /* General Agent Information */
  const userGuid = `${user}`;
  const { profile } = useFetchUserProfile(userGuid);
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
    languages
  } = useAgentData(userGuid);


  useEffect(() => {
    const getEvents = async () => {
      const eventData = await adminAgent.Events.getEvents(`${user}`);
      setEvents(eventData);
    };

    getEvents();
  }, []);

  const navigate = useNavigate();

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
                      {links.map((item, index) => (
                        <div className="social-content" key={index}>
                          <a href={item.link} target="_blank">
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
                      {contactLink.map((con) => (
                        <div className="contact">{con.icon} <span>{con.text}</span>  </div>
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
  );
};

export default MyWebPage;
