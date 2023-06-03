import Button from "library/Button/Button";
import Headline from "library/Headline/Headline";
import Offer from "library/Offer/Offer";
import React from "react";
import "./AgentSupport.scss";
import Blogs from "library/Blogs/Blogs";
import { blogsDummy } from "constants/dummyDatas";
import Card from "library/Card/Card";
import { Container, Grid } from "@mui/material";
import Coin from "library/Coin/Coin";
import { MdModelTraining } from "react-icons/md";
import {
  FaAccessibleIcon,
  FaAlipay,
  FaCanadianMapleLeaf,
  FaCentercode,
  FaCodiepie,
} from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";
import Timelines from "library/Timeline/Timelines";
import Benefits from "./Benefits";
import StandardCard from "library/StandardCard/StandardCard";

const timelineData = [
  {
    title: "Lorem ipsum dolor sit amet, consectetuer?",
    description:
      " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetuer?",
    description:
      " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetuer?",
    description:
      " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  },
];

const AgentSupport: React.FC = () => {
  return (
    <div className="agent-support-wrapper">
      <Headline
        title="Sample hook and headline"
        description="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
        backgroundImage="/assets/images/headline-images/agent-support-image.png"
        children={
          <div className="headline__btn">
            <Button variant="danger">Become an Agent</Button>
            <Button variant="default">Agent Log In</Button>
          </div>
        }
      />

      <div className="plan-container-agent">
        <div className="cfs-application">
          <Container className="cfs-application-container">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={12} lg={4}>
                <StandardCard
                  icon={<RiShieldUserLine />}
                  title="Become a CFS Agent"
                  description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
                  button={{
                    text: "Sign up",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <StandardCard
                  icon={<RiShieldUserLine />}
                  title="Become a CFS Agent"
                  description="veritatis et quasi architecto beatae vitae dicta sunt explicabo"
                  button={{
                    text: "Sign up",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Offer
          title="Insert heading or engaging hook about the solution"
          image="\assets\images\home\rectangle-image3.png"
          list={[
            "Track and control spending",
            "Simple to use mobile app for drivers",
            "24/7 US-based customer support",
          ]}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          button={{
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
                icon={<MdModelTraining />}
                title="Regular Trainings"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                icon={<FaAccessibleIcon />}
                title="Free Access to CRMs"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                icon={<FaAlipay />}
                title="Unlimited Support"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                icon={<FaCanadianMapleLeaf />}
                title="Agent Benefits "
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                icon={<FaCentercode />}
                title="Agent Benefits "
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
              />
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Coin
                icon={<FaCodiepie />}
                title="Agent Benefits "
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
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
                <img src="/assets/images/home/overview.png" alt="" />
              </div>
            </Grid>
            <Grid item sm={12} md={6} lg={6} className="no-padding-top">
              <div className="steps-content-container">
                <div className="title">
                  <h2>
                    Become A CFS Agent <br /> In 5 Easy Steps
                  </h2>
                </div>
                <div className="description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus.
                  </p>
                </div>
              </div>
              <div className="timeline-content">
                <Timelines data={timelineData} />
              </div>
              <Button variant="primary">Agent Portal</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="agent-container">
        <Container>
          <h2>Our top Agents</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adi <br /> piscing elit.
            Aenean commodo ligula eget dolor.
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
      </div>
      <Blogs title="Get Our FREE Resources" blogs={blogsDummy} />
    </div>
  );
};

export default AgentSupport;
