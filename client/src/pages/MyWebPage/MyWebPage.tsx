import React, { useState } from "react"
import MyWebPageWrapper from "./Layout/MyWebPageWrapper"
import { Container, Grid } from "@mui/material"
import "./MyWebPage.scss"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import Spinner from "library/Spinner/Spinner"
import {
  FaFacebook,
  FaHome,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaCalendar,
  FaAddressCard,
} from "react-icons/fa"
import { HiLocationMarker } from "react-icons/hi"
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs"
import { MdEmail, MdOutlineLibraryBooks } from "react-icons/md"
import Button from "library/Button/Button"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { FiSend } from "react-icons/fi"
import { GrSend } from "react-icons/gr"
import { paths } from "constants/routes"
import Timeline from "library/TimelinePost/Timeline"

const MyWebPage: React.FC = () => {
  const { user } = useParams()
  const [content, setContent] = useState("home")
  const [active, setActive] = useState(false)

  const navigate = useNavigate()

  /* General Agent Information */
  const userGuid = `${user}`
  const { profile, loading } = useFetchUserProfile(userGuid)

  /*Personal information */
  const defaultAvatar =
    "https://res.cloudinary.com/dfm2vczpy/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688418199/cfs-image_rkkknx.jpg?_s=public-apps"
  const avatar =
    profile?.avatar.toString() === "" || loading
      ? defaultAvatar
      : profile?.avatar.toString()
  const Agent = loading
    ? "CFS Agent"
    : `${profile?.firstName} ${profile?.lastName}`
  const address =
    profile?.state?.toString() === "" ? "-" : profile?.state?.toString()
  const phoneNumber = profile?.phoneNumber.toString()
  const email = profile?.emailAddress

  /* Professional Information */
  const licenseNumber = profile?.licenseNumber?.toString()

  /* Socials */
  const facebook = profile?.facebook.toString()
  const linkedIn = profile?.linkedIn.toString()
  const twitter = profile?.twitter.toString()

  const links = [
    {
      icon: <HiLocationMarker />,
      title: "Address",
      link: address,
    },
    {
      icon: <FaFacebook />,
      title: "Facebook",
      link: facebook,
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      link: linkedIn,
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      link: twitter,
    },
  ]

  const navLinks = [
    {
      icon: <FaHome />,
      onClick: () => {
        setContent("home")
        setActive(true)
      },
      className: active === true && content === "home" ? "active-nav" : "",
      link: "Home",
    },
    {
      icon: <FaCalendar />,
      onClick: () => {
        setContent("events")
        setActive(true)
      },
      className: active === true && content === "events" ? "active-nav" : "",
      link: "Events",
    },
    {
      icon: <GrSend />,
      onClick: () => {
        setContent("testimonial")
        setActive(true)
      },
      className:
        active === true && content === "testimonial" ? "active-nav" : "",
      link: "Testimonial",
    },
    {
      icon: <MdOutlineLibraryBooks />,
      onClick: () => {
        setContent("articles")
        setActive(true)
      },
      className: active === true && content === "articles" ? "active-nav" : "",
      link: "Articles",
    },
  ]

  if (loading) {
    ;<Spinner variant="relative" />
  }

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
                    <p className="agent-description">{profile?.bio}</p>
                    <div className="social-container">
                      {links.map((item) => (
                        <div className="social-content">
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
                    <div className="left-col-actions">
                      <Button variant="primary">
                        {" "}
                        <BsChatRightTextFill /> <span>Contact Me</span>{" "}
                      </Button>
                      <Button variant="danger">
                        {" "}
                        <FiSend />{" "}
                        <span
                          onClick={() =>
                            window.open(
                              paths.testimonialForm.replace(
                                ":userGuid",
                                userGuid
                              )
                            )
                          }
                        >
                          Testimonial
                        </span>{" "}
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="middle-col">
                    <React.Fragment>
                      <div className="navbar-main-feed">
                        {navLinks.map((nav) => (
                          <div
                            className={`nav-tab ${nav.className}`}
                            onClick={nav.onClick}
                          >
                            <h2 className="navlink-title">{nav.link}</h2>
                          </div>
                        ))}
                      </div>
                      <div className="tabs-content">
                        <Timeline content={content} />
                        {/* /* These are all dummy, this must render the rightful component for each page. */}
                        {/* {content === "home" ? (
                          <Timeline content={content} />
                        ) : content === "events" ? (
                          <Timeline content={content} />
                        ) : content === "articles" ? (
                          <Timeline content={content} />
                        ) : content === "testimonial" ? (
                          <Timeline content={content} />
                        ) : null} */}
                      </div>
                    </React.Fragment>
                    <div className="middle-col-content"></div>
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
  )
}

export default MyWebPage
