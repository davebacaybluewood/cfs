import React, { useState } from "react";
import MyWebPageWrapper from "./Layout/MyWebPageWrapper";
import { Container, Grid } from "@mui/material";
import "./MyWebPage.scss";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import Spinner from "library/Spinner/Spinner";
import {
  FaFacebook,
  FaHome,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaCalendar,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs";
import { MdEmail, MdOutlineLibraryBooks } from "react-icons/md";
import Button from "library/Button/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { paths } from "constants/routes";

const MyWebPage: React.FC = () => {
  const { user } = useParams();

  const [content, setContent] = useState("home");
  const userGuid = `${user}`;
  const { profile, loading } = useFetchUserProfile(userGuid);
  const navigate = useNavigate();

  /* Agent Information */
  const defaultAvatar =
    "https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps";
  const avatar =
    profile?.avatar.toString() === "" || loading
      ? defaultAvatar
      : profile?.avatar.toString();
  const fullName = `${profile?.firstName} ${profile?.lastName}`;
  const address =
    profile?.state?.toString() === ""
      ? /* "Profile Address" not final*/ "Paul and Mary Moore, 1313 E Main St, Portage MI 49024-2001" //Not Final, for testing purposes
      : profile?.state?.toString();
  const facebook =
    profile?.facebook.toString() === ""
      ? "Facebook"
      : profile?.facebook.toString();
  const linkedIn =
    profile?.linkedIn.toString() === ""
      ? "LinkedIn"
      : profile?.linkedIn.toString();
  const twitter =
    profile?.twitter.toString() === ""
      ? "Twitter"
      : profile?.twitter.toString();
  const phoneNumber = profile?.phoneNumber.toString();
  const email = profile?.emailAddress;

  const links = [
    {
      icon: <HiLocationMarker />,
      title: address,
    },
    {
      icon: <FaFacebook />,
      title: facebook,
    },
    {
      icon: <FaLinkedin />,
      title: linkedIn,
    },
    {
      icon: <FaTwitter />,
      title: twitter,
    },
  ];

  const navLinks = [
    {
      icon: <FaHome />,
      onClick: () => setContent("home"),
      link: "Home",
    },
    {
      icon: <FaCalendar />,
      onClick: () => setContent("events"),
      link: "Events",
    },
    {
      icon: <MdOutlineLibraryBooks />,
      onClick: () => setContent("blogs"),
      link: "Blogs",
    },
  ];

  if (loading) {
    <Spinner variant="relative" />;
  }

  return (
    <MyWebPageWrapper showNavBar showFooter>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Comfort Financial Solutions |{" "}
          {`${profile?.firstName} ${profile?.lastName}`}
        </title>
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
                    <h2>{fullName}</h2>
                    <p className="agent-description">{profile?.bio}</p>
                    <div className="social-container">
                      {links.map((item) => (
                        <div className="social-content">
                          {item.icon} <span>{item.title}</span>
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
                    <Button variant="primary">
                      {" "}
                      <BsChatRightTextFill /> <span>Chat</span>{" "}
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="middle-col">
                    <div className="middle-col-content">
                      <div className="navbar-main-feed">
                        {navLinks.map((nav) => (
                          <div className="nav-tab" onClick={nav.onClick}>
                            {nav.icon}
                            <div className="navlink-title">{nav.link}</div>
                          </div>
                        ))}
                      </div>
                      <div className="tabs-content">
                        {content === "home" ? (
                          /* These are all dummy, this must render the rightful component for each page. */
                          <h2
                            style={{ textAlign: "center", padding: "1rem 0" }}
                          >
                            Home
                          </h2>
                        ) : content === "events" ? (
                          <h2
                            style={{ textAlign: "center", padding: "1rem 0" }}
                          >
                            Events
                          </h2>
                        ) : (
                          <h2
                            style={{ textAlign: "center", padding: "1rem 0" }}
                          >
                            Blogs
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <div className="right-col">
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
  );
};

export default MyWebPage;
