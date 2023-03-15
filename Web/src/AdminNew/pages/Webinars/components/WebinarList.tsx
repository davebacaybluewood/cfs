import { Grid } from "@mui/material";
import Title from "AdminNew/components/Title/Title";
import Wrapper from "AdminNew/components/Wrapper/Wrapper";
import adminPathsNew from "AdminNew/constants/routes";
import { WebinarValuesType } from "AdminNew/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import CardContent from "library/CardContent/CardContent";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React from "react";
import { useNavigate } from "react-router-dom";

type WebinarListProps = {
  loading: boolean;
  breadcrumb: {
    title: string;
    link?: string;
  }[];
  webinars: WebinarValuesType[];
  title: string;
  subtitle: string;
};
const WebinarList: React.FC<WebinarListProps> = (props) => {
  const { loading, breadcrumb, webinars } = props;
  const navigate = useNavigate();

  const learnMoreHandler = (id: string) => {
    navigate(adminPathsNew.viewSingleDynamicWebinar.replace(":webinarId", id));
  };

  return (
    <Wrapper
      className="webinar-dynamic-container"
      loading={loading}
      error={false}
      breadcrumb={breadcrumb}
    >
      <Title title={props.title} subtitle={props.subtitle} />
      <NoInformationToDisplay
        showNoInfo={webinars.length === 0 && loading === false}
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

export default WebinarList;
