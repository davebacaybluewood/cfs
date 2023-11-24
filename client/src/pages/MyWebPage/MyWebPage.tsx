import React, { useEffect, useState } from "react"
import MyWebPageWrapper from "./Layout/MyWebPageWrapper"
import { Container, Grid } from "@mui/material"
import Spinner from "library/Spinner/Spinner"
import { BsChatRightTextFill } from "react-icons/bs"
import Button from "library/Button/Button"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { FiSend } from "react-icons/fi"
import { paths } from "constants/routes"
import Timeline from "pages/MyWebPage/Timeline"
import agentLinks from "./helpers/agentLinks"
import useAgentData from "./useAgentData"
import FeedTabs, { ContentTypes } from "./FeedTabs"
import useFetchUserProfile from "admin/hooks/useFetchProfile"
import contactLinks from "./helpers/contactLinks"
import RouteLinks from "./helpers/routeLinks"
import { useCopyToClipboard } from "admin/hooks/useCopyToClipboard"
import { toast } from "react-toastify"
import { FaShareSquare } from "react-icons/fa"
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip"
import { MdOutlineQrCode2 } from "react-icons/md"
import { QRCode } from "react-qrcode-logo"
import "./MyWebPage.scss"
import useFetchBlogResource from "pages/BlogPage/hooks/useFetchBlogResource"
import useFetchEvents from "admin/pages/Events/hooks/useFetchEvents"
import { TimelinePostProps } from "library/TimelinePost/TimelinePost"
import { formatISODateOnly } from "helpers/date"

const MyWebPage: React.FC = () => {
  const [content, setContent] = useState<ContentTypes>("home")
  const [timelineData, setTimelineData] = useState<
    TimelinePostProps[] | undefined
  >()
  const [openQr, setOpenQr] = useState(false)
  const [clipboardValue, setClipboardValue] = useCopyToClipboard()
  const [isSticky, setSticky] = useState(false)

  const { user: userGuid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    Agent,
    address,
    avatar,
    email,
    facebook,
    licenseNumber,
    linkedIn,
    phoneNumber,
    twitter,
    bio,
    loading,
    languages,
    testimonials,
  } = useAgentData(userGuid ?? "")

  const links = agentLinks(address, facebook, linkedIn, twitter)
  const contactLink = contactLinks(
    address ?? "",
    phoneNumber ?? "",
    email ?? "",
    licenseNumber ?? "",
    languages ?? []
  )
  const agentURL = window.location.host + location.pathname

  const { blogs, loading: blogLoading } = useFetchBlogResource(0, 5)
  const { eventRows, loading: eventLoading } = useFetchEvents(userGuid ?? "")

  function handleCopyToClipboard() {
    setClipboardValue(agentURL)
    toast("Link copied to Clipboard")
  }

  const filteredEvents: TimelinePostProps[] | undefined = eventRows?.map(
    (data) => {
      const eventClickedHandler = (eventId: string) => {
        navigate(paths.rsvpForm.replace(":eventId", eventId))
      }
      return {
        content: data.shortDescription,
        date: data.eventDate,
        title: data.title,
        eventDate: data.eventDate,
        id: data._id,
        imgContent: data.thumbnail,
        onClick: () => eventClickedHandler(data._id),
        tag: "event",
        userGuid: userGuid,
      }
    }
  )

  const filteredBlogs: TimelinePostProps[] | undefined = blogs?.map((data) => {
    const blogClickedHandler = (blogId: string) => {
      navigate(paths.single_blog.replace(":blogTitle", blogId))
    }
    return {
      content: data.content,
      date: formatISODateOnly(data.createdAt ?? ""),
      title: data.title,
      eventDate: data.createdAt,
      id: data._id,
      imgContent: data.thumbnail,
      onClick: () => blogClickedHandler(data.title),
      tag: "blog",
      userGuid: userGuid,
    }
  })

  const filteredTestimonials: TimelinePostProps[] | undefined =
    testimonials?.map((data) => {
      return {
        content: data.comment,
        title: data.title,
        date: data.name,
        id: data.title,
        tag: "reccomendation",
        userGuid: userGuid,
      }
    })

  useEffect(() => {
    if (content === "events") {
      setTimelineData(filteredEvents)
    } else if (content === "articles") {
      setTimelineData(filteredBlogs)
    } else if (content === "reccomendation") {
      setTimelineData(filteredTestimonials)
    } else {
      const mergedData = [...(filteredEvents ?? []), ...(filteredBlogs ?? [])]
      setTimelineData(mergedData)
    }
  }, [content, eventRows, blogs])

  // Make left and right sidebar sticky when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const timeline = document.querySelector(".left-col")
      const sidebar = document.querySelector(".right-col")

      if (timeline && sidebar) {
        const timelineRect = timeline.getBoundingClientRect()
        const sidebarRect = sidebar.getBoundingClientRect()

        // Adjust this value based on when you want the sidebar to become sticky
        const threshold = timelineRect.top + 50

        setSticky(window.scrollY >= threshold)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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
                            <span>
                              {" "}
                              <FaShareSquare />{" "}
                            </span>
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
                  <div className={`left-col ${isSticky ? "sticky" : ""}`}>
                    <div className="contact-container">
                      {contactLink.map((con) => (
                        <div className="contact">
                          {con.icon} <span>{con.text}</span>{" "}
                        </div>
                      ))}
                    </div>
                    <div className="qr-code">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          !openQr ? setOpenQr(true) : setOpenQr(false)
                        }
                      >
                        <div className="button-content">
                          <MdOutlineQrCode2 />{" "}
                          <span>{!openQr ? "Scan QR Code" : "Close"}</span>{" "}
                        </div>
                      </Button>
                      {openQr ? (
                        <HtmlTooltip
                          title={
                            <div
                              style={{
                                fontSize: "1.3rem",
                              }}
                            >
                              {`Scan: ${agentURL}`}
                            </div>
                          }
                        >
                          <div className="qr-code-content">
                            <QRCode
                              value={`https://gocfs.pro/${userGuid}`}
                              size={99}
                              bgColor="transparent"
                              fgColor="#000000"
                            />
                          </div>
                        </HtmlTooltip>
                      ) : null}
                    </div>
                    <div className="left-col-actions">
                      <Button
                        variant="primary"
                        onClick={() =>
                          window.open(
                            paths.contactEmailForm.replace(
                              ":userGuid",
                              userGuid ?? ""
                            )
                          )
                        }
                      >
                        <div className="button-content">
                          <BsChatRightTextFill /> <span>Contact Me</span>
                        </div>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          window.open(
                            paths.testimonialForm.replace(
                              ":userGuid",
                              userGuid ?? ""
                            )
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
                  <div className={`middle-col`}>
                    <React.Fragment>
                      <div className="navbar-main-feed">
                        <FeedTabs {...{ content, setContent }} />
                      </div>
                      <div className="tabs-content">
                        <Timeline
                          data={timelineData}
                          loading={eventLoading || blogLoading}
                        />
                      </div>
                    </React.Fragment>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <div className={`right-col ${isSticky ? "sticky" : ""}`}>
                    <div className="right-col-actions">
                      <RouteLinks />
                    </div>
                    {/* <div className="right-col-content">
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
                    </div> */}
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
