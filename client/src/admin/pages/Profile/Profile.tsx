import { Box, Grid, Paper } from "@mui/material";
import Wrapper from "admin/components/Wrapper/Wrapper";
import ComponentValidator from "library/ComponentValidator/ComponentValidator";
import React, { useEffect, useState } from "react";
import { CrumbTypes } from "../Dashboard/types";
import AboutProfile from "./components/AboutProfile/AboutProfile";
import Overview from "./components/Overview/Overview";
import { HeaderButtonConfigs } from "./components/ProfileHeader/HeaderButtons";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import Testimonials from "./components/Testimonials/Testimonials";
import Webinars from "./components/Webinars/Webinars";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { paths } from "constants/routes";
import Roles from "./components/Roles/Roles";
import { ProfileData } from "admin/hooks/useFetchProfile";
import Indicator from "admin/components/Indicator/Indicator";

type ProfileProps = {
  crumbs: CrumbTypes[];
  profile?: ProfileData | undefined;
  loading: boolean;
  error: boolean;
  headerConfigs: HeaderButtonConfigs;
};

const Profile: React.FC<ProfileProps> = (props) => {
  const { crumbs, profile, loading, error } = props;
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  const isUpToDate =
    !profile?.firstName ||
    !profile?.lastName ||
    !profile?.licenseNumber ||
    !profile?.state;

  useEffect(() => {
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 3000);
  }, []);

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={error}
      loading={loading || pageLoading}
      className="profile-wrapper"
    >
      {isUpToDate && props.headerConfigs.isProfileView ? (
        <Indicator
          description="You must update your license number, first name, last name, and state to view your profile."
          header="Your profile is up to date"
          buttonConfigs={{
            onClick: () => navigate(paths.profileForm),
            text: "Edit Profile",
          }}
        />
      ) : (
        <Grid spacing={2} container>
          <Grid item sm={12} md={12} lg={12}>
            <ProfileHeader
              userGuid={profile?.userGuid ?? ""}
              _id={profile?._id ?? ""}
              address={profile?.address ?? ""}
              avatar={profile?.avatar ?? ""}
              bio={profile?.bio ?? ""}
              calendlyLink={profile?.calendlyLink ?? ""}
              emailAddress={profile?.emailAddress ?? ""}
              facebook={profile?.facebook ?? ""}
              instagram={profile?.instagram ?? ""}
              linkedIn={profile?.linkedIn ?? ""}
              name={
                !profile?.name
                  ? profile?.firstName ?? "" + profile?.lastName ?? ""
                  : profile?.name
              }
              phoneNumber={profile?.phoneNumber ?? ""}
              testimonials={profile?.testimonials ?? []}
              title={profile?.title ?? ""}
              twitter={profile?.twitter ?? ""}
              status={profile?.status ?? ""}
              headerConfigs={props.headerConfigs}
              firstName={profile?.firstName}
              lastName={profile?.lastName}
              state={profile?.state}
              licenseNumber={profile?.licenseNumber}
            />
          </Grid>
          <Grid item sm={12} md={12} lg={4} marginBottom={5}>
            <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
              <AboutProfile
                languages={profile?.languages ?? []}
                specialties={profile?.specialties ?? []}
                contactNumber={profile?.phoneNumber ?? ""}
                fulllName={profile?.firstName + " " + profile?.lastName}
                emailAdress={profile?.emailAddress ?? ""}
                position={profile?.position}
                roles={profile?.roles}
                address={profile?.address ?? ""}
                linkedIn={profile?.linkedIn ?? ""}
                facebook={profile?.facebook ?? ""}
                instagram={profile?.instagram ?? ""}
                twitter={profile?.twitter ?? ""}
                agentGuid={profile?.userGuid ?? ""}
                status={profile?.status ?? ""}
                licenseNumber={profile?.licenseNumber ?? ""}
                state={profile?.state ?? ""}
                discordId={profile?.discordId ?? ""}
                weChat={profile?.weChat ?? ""}
              />
              <Roles roles={profile?.roles} position={profile?.position} />
              <Overview
                numberOfAppointments={0}
                numberOfContacts={0}
                numberOfLeads={0}
                numberOfTestimonials={0}
                numberOfVisits={0}
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={12} lg={8} marginBottom={5}>
            <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
              <ComponentValidator showNull={!profile?.userGuid}>
                <Webinars agentGuid={profile?.userGuid ?? ""} />
              </ComponentValidator>
            </Paper>
          </Grid>
          <Grid item sm={12} md={12} lg={12} marginBottom={5}>
            <Box>
              <Paper>
                <Testimonials
                  testimonials={profile?.testimonials as any}
                  setPageLoading={setPageLoading}
                  agentId={profile?.userGuid ?? ""}
                />
              </Paper>
            </Box>
          </Grid>
          {/* <Grid item sm={12} md={12} lg={12}>
        <Box>
          <Paper>
            <Calendar />
          </Paper>
        </Box>
      </Grid> */}
        </Grid>
      )}
    </Wrapper>
  );
};

export default Profile;
