import Button from "library/Button/Button";
import Headline from "library/Headline/Headline";
import Offer from "library/Offer/Offer";
import React from "react";
import Blogs from "library/Blogs/Blogs";
import { Container, Grid } from "@mui/material";
import Coin from "library/Coin/Coin";
import { MdHealthAndSafety } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import Timelines from "library/Timeline/Timelines";
import Benefits from "./Benefits";
import StandardCard from "library/StandardCard/StandardCard";
import useScroll from "hooks/useScroll";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import "./AgentSupport.scss";
import { OUTSOURCE_LINKS } from "admin/constants/constants";

const timelineData = [
  {
    title: "Submit Your Application",
    description:
      "Complete our simple online application form to express your interest in becoming a CFS Agent.",
  },
  {
    title: "Attend an Interview",
    description:
      " This is an opportunity for us to get to know you better and for you to ask any questions you may have.",
  },
  {
    title: "Complete Training and Onboarding",
    description:
      " Receive in-depth product training, sales techniques, and access to our cutting-edge technology platforms.",
  },
];

const AgentSupport: React.FC = () => {
  useScroll();
  const navigate = useNavigate();
  return (
    <div className="agent-support-wrapper">
      <Headline
        title="Where Agents Thrive
        and Dreams Take Flight"
        description="Get the edge you need to be a successful life insurance agent. CFS provides competitive compensation, proven financial solutions, and career advancement opportunities."
        backgroundImage="/assets/images/headline-images/agent-support-image.png"
        children={
          <div className="headline__btn">
            <Button
              variant="danger"
              onClick={() =>
                window.open(OUTSOURCE_LINKS.BACK_OFFICE, "_blank")!.focus()
              }
            >
              Become an Agent
            </Button>
          </div>
        }
      />

      <div className="plan-container-agent">
        <div className="cfs-application">
          <Container className="cfs-application-container">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={12} lg={4}>
                <StandardCard
                  icon={<MdHealthAndSafety />}
                  title="Agent Portal"
                  description="Explore the CFS agent's dashboard and other sales and marketing tools"
                  button={{
                    text: "Portal Login",
                    onClick: () => navigate(paths.login),
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Offer
          title={
            <React.Fragment>
              Unleash Your Potential: <br /> Join CFS and Elevate Your <br />
              Insurance Career
            </React.Fragment>
          }
          image="/assets/others/unleash-agents.jpg"
          list={[
            "Great commision structure and career growth.",
            "Extensive Training and Support.",
            "Access to the newest tools and technology.",
          ]}
          description={
            <React.Fragment>
              Don't miss out on this exceptional opportunity to take <br /> your
              insurance career to new heights. Join CFS and be <br /> part of a
              company that values your expertise, rewards <br /> your hard work,
              and provides you with the tools and <br /> support you need to
              thrive in today's competitive <br /> insurance landscape. With
              CFS, you'll get:
            </React.Fragment>
          }
          button={{
            onClick: () =>
              navigate(paths.cfsPages.replace(":pageId", "cfs-edge")),
            text: "Learn More",
          }}
        />
      </div>

      <div className="success-container">
        <Container>
          <h2>Our System For Success</h2>
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                title="Lead Generation Strategies"
                description="You'll have access to cutting-edge marketing tools, digital platforms, and targeted campaigns to attract and engage potential clients, giving you a steady stream of high-quality leads."
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                title="Training and Mentorship"
                description="Our industry experts will guide you through our robust training curriculum, covering everything from product knowledge and sales techniques to advanced marketing strategies."
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                title="Technology and Tools"
                description="Our digital platform streamlines your operations, making it easier than ever to manage clients, track policies, and access real-time data."
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                title="Marketing and Branding Support"
                description="As a CFS agent, you'll benefit from our marketing and branding support, including professionally designed marketing materials, personalized websites, and social media campaigns"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                title="Competitive Compensation and Incentive Programs"
                description="Our compensation packages are designed to be highly competitive, ensuring that you are fairly rewarded for your efforts."
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                title="Exclusive Product Portfolio"
                description="As a CFS agent, you'll have access to an exclusive product portfolio that is designed to meet the diverse needs of your clients."
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="benefits-container">
        <Benefits />
      </div>
      <div className="easy-steps-container">
        <Container>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item sm={12} md={6} lg={6} className="no-padding-top">
              <div className="easy-steps-image">
                <img src="/assets/others/Agent_2.png" alt="happy photo" />
              </div>
            </Grid>
            <Grid item sm={12} md={6} lg={6} className="no-padding-top">
              <div className="steps-content-container">
                <div className="title">
                  <h2>
                    Become A CFS Agent <br /> In 3 Easy Steps
                  </h2>
                </div>
                <div className="description">
                  <p>
                    Are you ready to embark on an exciting and rewarding career
                    in the insurance industry? Becoming a CFS Agent is your
                    pathway to success, offering you the opportunity to join a
                    reputable organization, work with top-rated insurance
                    providers, and make a positive impact in the lives of
                    individuals and businesses.
                  </p>
                </div>
              </div>
              <div className="timeline-content">
                <Timelines data={timelineData} />
              </div>
              <Button variant="default" onClick={() => navigate(paths.login)}>
                Agent Portal
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* <div className="agent-container">
        <Container>
          <h2>Our top Agents</h2>
          <p>
            At CFS, we take pride in our exceptional team of top-performing
            agents who have achieved remarkable success in the insurance
            industry. These agents represent the pinnacle of excellence,
            consistently delivering outstanding results, and setting the bar
            high for professionalism, expertise, and client satisfaction.
          </p>
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={3}>
              <Card
                image="/assets/images/agents/agents.png"
                cardTitle="Agent 1"
                subtitle="New York Office"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={3}>
              <Card
                image="/assets/images/agents/agents.png"
                cardTitle="Agent 2"
                subtitle="Las Vegas Office"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={3}>
              <Card
                image="/assets/images/agents/agents.png"
                cardTitle="Agent 3"
                subtitle="California Office"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={3}>
              <Card
                image="/assets/images/agents/agents.png"
                cardTitle="Agent 4"
                subtitle="Texas Office"
              />
            </Grid>
          </Grid>
        </Container>
      </div> */}
      <Blogs
        title="Get Our FREE Resources"
        blogsConfig={{
          limit: 3,
          skip: 0,
        }}
      />
    </div>
  );
};

export default AgentSupport;
