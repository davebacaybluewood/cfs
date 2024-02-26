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
import { PROFILE_ROLES } from "pages/PortalRegistration/constants";
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter";
import useGetAppointments from "../Appointments/hooks/useGetAppointments";
import useFetchContacts from "admin/hooks/useFetchContacts";
import useFetchLeads from "admin/hooks/useFetchLeads";

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
  const { appointments } = useGetAppointments(profile?.userGuid ?? "", "");
  const { contacts } = useFetchContacts(profile?.userGuid ?? "");
  const { totalSubscribers } = useFetchLeads(profile?.userGuid ?? "");

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

  const isAgent = profile?.roles.some((f) => {
    return (
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value
    );
  });

  const userPosition = profile?.roles?.find((f) => {
    return (
      f.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
      f.value === PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value
    );
  });

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={error}
      loading={loading || pageLoading}
      className="profile-wrapper"
    >
      <DocumentTitleSetter title="Profile | CFS Portal" />
      {isUpToDate && props.headerConfigs.isProfileView ? (
        <Indicator
          description="You must update your license number, first name, last name, and state to view your profile."
          header="Update your Profile"
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
              testimonials={profile?.testimonials}
              title={profile?.title ?? ""}
              twitter={profile?.twitter ?? ""}
              status={profile?.status ?? ""}
              headerConfigs={props.headerConfigs}
              firstName={profile?.firstName}
              lastName={profile?.lastName}
              state={profile?.state}
              licenseNumber={profile?.licenseNumber}
              position={userPosition?.label ?? ""}
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
              {isAgent ? (
                <Overview
                  numberOfAppointments={
                    appointments[0]?.numberOfAppointments ?? 0
                  }
                  numberOfContacts={contacts.length ?? 0}
                  numberOfLeads={totalSubscribers ?? 0}
                  numberOfTestimonials={profile?.testimonials?.length ?? 0}
                  numberOfVisits={0}
                />
              ) : null}
            </Paper>
          </Grid>
          <Grid item sm={12} md={12} lg={8} marginBottom={5}>
            <Paper elevation={3} sx={{ p: 0, height: "100%" }}>
              {isAgent ? (
                <ComponentValidator showNull={!profile?.userGuid}>
                  <Webinars agentGuid={profile?.userGuid ?? ""} />
                </ComponentValidator>
              ) : (
                <Indicator />
              )}
            </Paper>
          </Grid>
          {isAgent ? (
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
          ) : null}
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
