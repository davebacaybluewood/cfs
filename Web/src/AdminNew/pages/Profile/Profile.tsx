import { Box, Grid, Paper } from "@mui/material";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import React, { useState } from "react";
import Calendar from "../Dashboard/components/Calendar/Calendar";
import { CrumbTypes } from "../Dashboard/types";
import AboutProfile from "./components/AboutProfile/AboutProfile";
import Overview from "./components/Overview/Overview";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import Testimonials from "./components/Testimonials/Testimonials";
import Webinars from "./components/Webinars/Webinars";
import "./Profile.scss";

type ProfileTypes = {
  _id: string;
  userGuid: string;
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
  languages: string[];
  specialties: string[];
  webinars: string[];
};
type ProfileProps = {
  crumbs: CrumbTypes[];
  profile: ProfileTypes;
  loading: boolean;
  error: boolean;
};

const Profile: React.FC<ProfileProps> = (props) => {
  const { crumbs, profile, loading, error } = props;
  const [pageLoading, setPageLoading] = useState(false);

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={error}
      loading={loading || pageLoading}
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
        <Grid item sm={12} md={12} lg={4}>
          <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
            <AboutProfile
              languages={profile.languages}
              specialties={profile.specialties}
              contactNumber={profile.phoneNumber}
              fulllName={profile.name}
              emailAdress={profile.emailAddress}
              position={profile.title}
              address={profile.address}
              linkedIn={profile.linkedIn}
              facebook={profile.facebook}
              instagram={profile.instagram}
              twitter={profile.twitter}
              agentGuid={profile.userGuid}
            />
            <Overview
              numberOfAppointments={0}
              numberOfContacts={0}
              numberOfLeads={0}
              numberOfTestimonials={0}
              numberOfVisits={0}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={8}>
          <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
            <Webinars agentGuid={props.profile.userGuid} />
          </Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <Box>
            <Paper>
              <Testimonials
                testimonials={profile.testimonials as any}
                setPageLoading={setPageLoading}
                agentId={profile.userGuid}
              />
            </Paper>
          </Box>
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
