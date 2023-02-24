import { Button, Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import paths from "constants/routes";
import CardContent from "library/CardContent/CardContent";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchWebinars, { WebinarValuesType } from "./hooks/useFetchWebinars";
import "./Webinars.scss";

const Webinars: React.FC = (props) => {
  const navigate = useNavigate();
  const learnMoreHandler = (id: string) => {
    navigate(paths.webinarSingle.replace(":webinarId", id));
  };
  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "Webinars",
      url: paths.webinar,
      isActive: true,
    },
  ];

  const { loading, webinars } = useFetchWebinars();

  return (
    <Wrapper
      className="webinar-admin-container"
      loading={loading}
      error={false}
      breadcrumb={breadcrumb}
    >
      <Title
        title="Webinar"
        subtitle="Manage all webinar available for the agents."
      >
        <Button
          variant="contained"
          onClick={() => navigate(paths.webinarAdminForm.replace(":id", "add"))}
        >
          Add Webinar
        </Button>
      </Title>
      <NoInformationToDisplay
        showNoInfo={webinars.length === 0}
        message="No webinars available."
        title="No Information to display."
      >
        <Grid container spacing={2}>
          {webinars?.map((webinar: WebinarValuesType) => {
            return (
              <Grid item sm={12} md={12} lg={4} key={webinar._id}>
                <CardContent
                  title={webinar.title}
                  description={webinar.introVideoContent}
                  thumbnail={webinar.thumbnail}
                  subtitle="Lorem Ipsum"
                  onClick={() => learnMoreHandler(webinar._id ?? "")}
                ></CardContent>
              </Grid>
            );
          })}
        </Grid>
      </NoInformationToDisplay>
    </Wrapper>
  );
};

Webinars.defaultProps = {
  title: "Webinars",
  subtitle: "Lorem Ipsum is simply dummy text of the printing",
  showHeaderButtons: true,
};
export default Webinars;
