import { Box, Grid, Paper } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import UserProvider from "AdminNew/context/UserProvider";
import paths from "constants/routes";
import React, { useContext } from "react";
import { boolean } from "yup";
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

const agentTestimonails: TestiMonialTypes[] = [];

type ProfileTypes = {
  _id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  calendlyLink: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  facebook: string;
  testimonials: string[];
  status: string;
};
type ProfileProps = {
  crumbs: CrumbTypes[];
  profile: ProfileTypes;
  loading: boolean;
  error: boolean;
};

const Profile: React.FC<ProfileProps> = (props) => {
  const { crumbs, profile, loading, error } = props;

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={error}
      loading={loading}
      className="profile-wrapper"
    >
      <Grid spacing={2} container>
        <Grid item sm={12} md={12} lg={12}>
          <ProfileHeader
            _id={profile._id}
            address={profile.address}
            avatar={profile.avatar}
            bio={profile.bio}
            calendlyLink={profile.calendlyLink}
            emailAddress={profile.emailAddress}
            facebook={profile.facebook}
            instagram={profile.instagram}
            linkedIn={profile.linkedIn}
            name={profile.name}
            phoneNumber={profile.phoneNumber}
            testimonials={profile.testimonials}
            title={profile.title}
            twitter={profile.twitter}
            status={profile.status}
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
            <AboutProfile />
            <Overview
              numberOfAppointments={0}
              numberOfContacts={0}
              numberOfLeads={0}
              numberOfTestimonials={0}
              numberOfVisits={0}
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
