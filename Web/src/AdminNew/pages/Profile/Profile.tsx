import { Box, Grid, Paper } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import React from "react";
import Calendar from "../Dashboard/components/Calendar/Calendar";
import { CrumbTypes } from "../Dashboard/types";
import AboutProfile from "./components/AboutProfile/AboutProfile";
import Overview from "./components/Overview/Overview";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import Testimonials, {
  TestiMonialTypes,
} from "./components/Testimonials/Testimonials";
import "./Profile.scss";
import agent from "./test-data";

const crumbs: CrumbTypes[] = [
  {
    title: "Comfort Life Finance Admin",
    url: paths.dashboard,
    isActive: false,
  },
  {
    title: "Profile",
    url: paths.profile,
    isActive: true,
  },
];

const agentTestimonails: TestiMonialTypes[] = [
  {
    name: "Dave Spencer Bacay",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Client Title",
  },
  {
    name: "Dave Spencer Bacay",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Client Title",
  },
  {
    name: "Dave Spencer Bacay",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Client Title",
  },
];

const Profile: React.FC = () => {
  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="profile-wrapper"
    >
      <Grid spacing={2} container>
        <Grid item sm={12} md={12} lg={12}>
          <ProfileHeader
            address={agent.address}
            avatar={agent.avatar}
            bio={agent.bio}
            calendlyLink={agent.calendlyLink}
            emailAddress={agent.emailAddress}
            facebook={agent.facebook}
            instagram={agent.instagram}
            linkedIn={agent.linkedIn}
            name={agent.name}
            phoneNumber={agent.phoneNumber}
            testimonials={agent.testimonials}
            title={agent.title}
            twitter={agent.twitter}
            status={agent.status}
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
            <AboutProfile />
            <Overview
              numberOfAppointments={2}
              numberOfContacts={3}
              numberOfLeads={12}
              numberOfTestimonials={55}
              numberOfVisits={222}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
            <Testimonials testimonials={agentTestimonails} />
          </Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <Box>
            <Paper>
              <Calendar />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Profile;
