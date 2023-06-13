import { Grid } from "@mui/material";
import Indicator from "admin/components/Indicator/Indicator";
import Title from "admin/components/Title/Title";
import Wrapper from "admin/components/Wrapper/Wrapper";
import adminPathsNew from "admin/constants/routes";
import { WebinarValuesType } from "admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars";
import { paths } from "constants/routes";
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
  isUpToDate?: boolean;
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
      {props.isUpToDate ? (
        <Indicator
          description="You must update your license number, first name, last name, and state to view your profile."
          header="Your profile is up to date"
          buttonConfigs={{
            onClick: () => navigate(paths.profileForm),
            text: "Edit Profile",
          }}
        />
      ) : (
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
                    subtitle="Webinar Detail"
                    onClick={() => learnMoreHandler(webinar._id ?? "")}
                  ></CardContent>
                </Grid>
              );
            })}
          </Grid>
        </NoInformationToDisplay>
      )}
    </Wrapper>
  );
};

export default WebinarList;
