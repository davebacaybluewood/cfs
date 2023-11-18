import React, { useState, useEffect } from "react"
import MyWebPageWrapper from "./Layout/MyWebPageWrapper"
import { Container, Grid } from "@mui/material"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import Spinner from "library/Spinner/Spinner"
import { FaHome, FaPhone, FaCalendar, FaAddressCard } from "react-icons/fa"
import { BsCalculator, BsChatRightTextFill } from "react-icons/bs"
import { MdEmail, MdOutlineLibraryBooks } from "react-icons/md"
import Button from "library/Button/Button"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { FiSend } from "react-icons/fi"
import { GrSend } from "react-icons/gr"
import { paths } from "constants/routes"
import { CiGift, CiTrophy, CiVault } from "react-icons/ci"
import Timeline from "pages/MyWebPage/Timeline"
import adminAgent from "admin/api/agent"
// import { TimelinePostProps } from "library/TimelinePost/TimelinePost"
import Event from "admin/models/eventModel"
import agentLinks from "./helpers/agentLinks"
import useFetchBlogs from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchBlogs"
import "./MyWebPage.scss"
// import Timeline from "./Timeline"

const MyWebPage: React.FC = () => {
  const { user } = useParams()
  const [content, setContent] = useState("home")
  const [active, setActive] = useState(false)
  const [events, setEvents] = useState<Event[] | undefined>()

  /* Content Headers */
  const HOME = "home"
  const EVENTS = "events"
  const TESTIMONIAL = "testimonial"
  const ARTICLES = "articles"

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

  const links = agentLinks(address, facebook, linkedIn, twitter)

  const navLinks = [
    {
      icon: <FaHome />,
      onClick: () => {
        setContent(HOME)
        setActive(true)
      },
      className: active === true && content === HOME ? "active-nav" : "",
      link: "Home",
    },
    {
      icon: <FaCalendar />,
      onClick: () => {
        setContent(EVENTS)
        setActive(true)
      },
      className: active === true && content === EVENTS ? "active-nav" : "",
      link: "Events",
    },
    {
      icon: <GrSend />,
      onClick: () => {
        setContent(TESTIMONIAL)
        setActive(true)
      },
      className: active === true && content === TESTIMONIAL ? "active-nav" : "",
      link: "Testimonial",
    },
    {
      icon: <MdOutlineLibraryBooks />,
      onClick: () => {
        setContent(ARTICLES)
        setActive(true)
      },
      className: active === true && content === ARTICLES ? "active-nav" : "",
      link: "Articles",
    },
  ]

  /*Events */
  // const filteredEvents: TimelinePostProps[] | undefined = events?.map((ev) => {
  //   return {
  //     tag: "Event",
  //     content: ev.shortDescription ?? "",
  //     userName: `${ev.authorFirstName} ${ev.authorLastName}` ?? "",
  //     datePosted: ev.createdAt ?? "",
  //     imgContent: ev.thumbnail ?? "",
  //     title: ev.title ?? "",
  //     eventDate: ev.eventDate ?? "",
  //   }
  // })

  /* Blogs */
  // const filteredBlogs: TimelinePostProps[] | undefined = blogs?.map((blog) => {
  //   return {
  //     tag: "Article",
  //     content: (blog.content ?? "")
  //       .replace(/<[^>]*>/g, "")
  //       .replace("&quot;", " "),
  //     title: blog.title ?? "",
  //     datePosted: blog.createdAt?.toString() ?? "",
  //     imgContent: blog.thumbnail ?? "",
  //   }
  // })

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
                        {navLinks.map((nav, index) => (
                          <div
                            key={index}
                            className={`nav-tab ${nav.className}`}
                            onClick={nav.onClick}
                          >
                            <h2 className="navlink-title">{nav.link}</h2>
                          </div>
                        ))}
                      </div>
                      <div className="tabs-content">
                        <Timeline content={content} userGuid={userGuid} />
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
