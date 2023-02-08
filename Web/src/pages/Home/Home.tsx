import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "./Home.scss";
import { Grid } from "@mui/material";
import Card from "library/Card/Card";
import { Container } from "@mui/system";
import servicesData from "data/services";
import { useEffect, useState } from "react";
import ContentCard, { ContentCardProps } from "library/ContentCard/ContentCard";
import Video from "./components/Video/Video";
import HeaderTitle from "./components/HeaderTitle/HeaderTitle";
import Button from "library/Button/Button";
import {
  InlineWidget,
  PopupModal,
  useCalendlyEventListener,
} from "react-calendly";
import useResponsive from "hooks/useResponsive";
import Wrapper from "./components/Wrapper/Wrapper";
import React from "react";
import classNames from "classnames";
import Title from "pages/Admin/components/Title/Title";
import CardNumbers from "library/CardNumbers/CardNumbers";
import { formatDate } from "helpers/dateFormatter";
import { useNavigate } from "react-router-dom";
import paths from "constants/routes";
import CommonHeaderTitle from "library/HeaderTitle/HeaderTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import PageTitle from "library/PageTitle/PageTitle";
import Helmet from "react-helmet";

const Home: React.FC = () => {
  const [services] = useState(servicesData);
  const [calendlyModal, setCalendlyModal] = useState(false);
  const isMobileMode = useResponsive("mobile");
  const navigate = useNavigate();

  const cardContainerClassnames = classNames("card-container", {
    "card-container-mobile": isMobileMode,
  });

  const servicesProps = {
    isMobileMode,
    header: "30 YEARS OF EXPERIENCE",
    firstTitle: "Preparing For Your Success",
    secondTitle: "Provide Best Finance Solutions.",
    description:
      "We are privileged to work with hundred future-thinking awesome businesses including many of the world’s top hardware and get IT service for your technology.",
    icons: [
      {
        icon: (
          <img src="/assets/icons/thinking-icon.png" alt="description-icon" />
        ),
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: (
          <img src="/assets/icons/thinking-icon.png" alt="description-icon" />
        ),
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: (
          <img src="/assets/icons/thinking-icon.png" alt="description-icon" />
        ),
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: (
          <img src="/assets/icons/thinking-icon.png" alt="description-icon" />
        ),
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: (
          <img src="/assets/icons/thinking-icon.png" alt="description-icon" />
        ),
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
    ],
  };

  const appointmentProps: ContentCardProps = {
    header: "SCHEDULE AN APPOINTMENT",
    firstTitle: "Lorem ipsum dolor sit amet",
    secondTitle: "Consectetur adipiscing elit",
    isMobileMode: isMobileMode,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    icons: [
      {
        icon: <img src="/assets/icons/clock.png" alt="description-icon" />,
        description: "Morem Ipsum",
        title: "",
      },
      {
        icon: <img src="/assets/icons/clock.png" alt="description-icon" />,
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: <img src="/assets/icons/clock.png" alt="description-icon" />,
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: <img src="/assets/icons/clock.png" alt="description-icon" />,
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
      {
        icon: <img src="/assets/icons/clock.png" alt="description-icon" />,
        title: "Warranty Management",
        description:
          "Morem Ipsum is simply dummy text of the printing and presetting found it agency business.",
      },
    ],
  };

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: () => console.log("test"),
  });

  const [showPopup, setShowPopup] = useState(true);

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="google-site-verification"
          content="-8SXobMJclzxTwefhzJ8i5kaM7zpKD-I3VqkfnJtWwc"
        />
      </Helmet>
      <div className="home-container">
        {/* <PageTitle title="Home" /> */}
        <div className="welcome-section">
          <Container className="welcome-section-container">
            <div className="welcome-section-image">
              <img src="/assets/others/happy-fam.png" alt="happy family" />
            </div>
            <div className="welcome-section-captions">
              <h2>We are CFS</h2>
              <p>
                CFS helps individuals and families build a comfortable future by
                advocating Financial Awareness and providing Risk Management
                Solutions.
              </p>
              <p>CFS offers Life Insurance and Annuities.</p>
            </div>
          </Container>
        </div>
        {/* <Wrapper className={cardContainerClassnames}>
        <Container>
          <Grid container spacing={2}>
            {services.slice(0, 4).map((service) => (
              <Grid item xs={6} sm={6} md={3} lg={3} key={service.id}>
                <Card
                  isMobileMode={isMobileMode}
                  content={{
                    front: { title: service.title, icon: service.icon },
                    back: {
                      title: service.title,
                      description: service.description,
                      icon: service.icon,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Wrapper> */}
        {/* <Wrapper className="endorsement">
        <Container>
          <Grid container spacing={2} className="endorsement-container">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img
                src="https://techno.dreamitsolution.net/wp-content/uploads/2020/10/about-img.png"
                alt="test"
                className="endorsement-image"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ContentCard {...servicesProps} />
            </Grid>
          </Grid>
        </Container>
      </Wrapper> */}
        {/* <Wrapper className="services">
        <React.Fragment>
          <Video />
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <HeaderTitle
                  title="Services"
                  bigTitle="Provide Exclusive Services"
                />
              </Grid>
              {services.slice(0, 8).map((service) => (
                <Grid item xs={6} sm={6} md={3} lg={3} key={service.id}>
                  <Card
                    isMobileMode={isMobileMode}
                    content={{
                      front: {
                        title: service.title,
                        icon: (
                          <img
                            src="/assets/icons/money-plant-white.png"
                            width={70}
                            alt="services-plant"
                          />
                        ),
                      },
                      back: {
                        title: service.title,
                        description: service.description,
                        icon: service.icon,
                      },
                    }}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </React.Fragment>
      </Wrapper> */}
        {/* <Wrapper className="stragies">
        <Container>
          <Grid container spacing={2} className="endorsement-container">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ContentCard
                header="STRATEGIES"
                firstTitle="Wealth Building Strategy"
                secondTitle="Be your own banker to build wealth."
                description="A long-term asset accumulation strategy should have the potential to outpace inflation and take into consideration how different products and account types are taxed. When determining the best strategy for you, it's important to determine how long you may live in retirement and how much it will cost to live comfortably during those years."
                isMobileMode={isMobileMode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img
                src="/assets/others/strategies.png"
                alt="test"
                className="endorsement-image"
              />
            </Grid>
          </Grid>
        </Container>
      </Wrapper> */}
        <Wrapper
          className="solutions"
          style={{
            backgroundImage: `url("https://techno.dreamitsolution.net/wp-content/uploads/2020/12/slider05-1.jpg")`,
          }}
        >
          <Container>
            <HeaderTitle
              title="Solutions"
              bigTitle="Let's get started"
              hasBorder={true}
            />
            <p className="description">
              There's a lot to know, and we have the information to help you
              make informed decision about your financial future. Let's take a
              closer look at what it means to have an annuity or life insurance,
              and why both are important.
            </p>
            <Grid
              container
              spacing={isMobileMode ? 1 : 2}
              className="solution-grid"
            >
              <Grid item xs={12} lg={6}>
                <div
                  className="solution-item"
                  onClick={() =>
                    navigate(
                      `${paths.solutions_with_id.replace(
                        ":id",
                        "life-insurance"
                      )}#life-insurance`
                    )
                  }
                >
                  <h2>What is Life Insurance?</h2>
                  {/* <img src="https://picsum.photos/536/354" /> */}
                </div>
              </Grid>
              <Grid item xs={12} lg={6}></Grid>
              <Grid item xs={12} lg={6}>
                <div
                  className="solution-item"
                  onClick={() =>
                    navigate(
                      `${paths.solutions_with_id.replace(
                        ":id",
                        "annuity"
                      )}#annuity`
                    )
                  }
                >
                  <h2>What is an Annuity?</h2>
                  {/* <img src="https://picsum.photos/536/354" /> */}
                </div>
              </Grid>
              <Grid item xs={12} lg={6}></Grid>
            </Grid>
          </Container>
        </Wrapper>
        <Wrapper
          style={{
            backgroundImage: `url("https://techno.dreamitsolution.net/wp-content/uploads/2020/10/team-bg2.jpg")`,
          }}
          className="appoinment-content"
        >
          <React.Fragment>
            <Container>
              <Grid container spacing={2} className="appointment-container">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <CommonHeaderTitle
                    title="SCHEDULE AN APPOINTMENT"
                    bigTitle="To Make Requests For The Further Information"
                    description="Or direct call to +1 (702) 900-5666"
                  />
                  <InlineWidget
                    url="https://calendly.com/gocfs/30min?primary_color=0057b7"
                    styles={{
                      height: "850px",
                      width: "100%",
                      marginBottom: "-6rem",
                      marginTop: "-6rem",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </React.Fragment>
        </Wrapper>
        {/* {showPopup ? (
        <div className="dialog-home" onClick={() => setShowPopup(false)}>
          <button className="exit-button" onClick={() => setShowPopup(false)}>
            <CancelIcon />
          </button>
          <img
            src="https://res.cloudinary.com/dkjjkr88j/image/upload/v1670970055/Optimized-Happy_Holidays_CFS_l3vpef.jpg"
            alt="Merry Christmas"
          />
        </div>
      ) : null} */}
      </div>
    </React.Fragment>
  );
};
export default Home;
