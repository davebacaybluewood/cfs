import { Grid } from "@mui/material";
import Spinner from "admin/components/Spinner/Spinner";
import adminPathsNew from "admin/constants/routes";
import useGetWebinarsWithCounts from "admin/pages/Appointments/hooks/useGetWebinarsWithCounts";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppointmentCard from "../AppointmentCard";

type WebinarAppointmentsProps = {
  webinarGuids: string[];
  agentGuid: string;
};
const WebinarAppointments: React.FC<WebinarAppointmentsProps> = (props) => {
  // const { webinars, loading } = useFetchAgentWebinars(props.webinarGuids);
  const navigate = useNavigate();
  const cardClickHandler = (webinarGuid: string | undefined) => {
    navigate(
      adminPathsNew.scheduledAppointments
        .replace(":agentGuid", props.agentGuid ?? "")
        .replace(":typeId", "webinar")
        .replace(":webinarGuid", webinarGuid ?? "")
    );
  };

  const { webinars, loading } = useGetWebinarsWithCounts(props.agentGuid ?? "");

  return (
    <NoInformationToDisplay
      showNoInfo={webinars?.length === 0 && !loading}
      title="No information to display."
      message="No webinars appointment in this agent."
    >
      <Grid container spacing={2}>
        {loading ? (
          <Spinner />
        ) : (
          webinars?.map((webinar) => {
            return (
              <Grid
                item
                sm={6}
                md={6}
                lg={4}
                onClick={() => cardClickHandler(webinar?.webinarGuid ?? "")}
              >
                <AppointmentCard
                  description={`Number of appointments: ${
                    webinar?.noOfAppointments ?? 0
                  }`}
                  title={webinar?.title ?? ""}
                  id={webinar?.webinarGuid ?? ""}
                  key={webinar?.webinarGuid}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </NoInformationToDisplay>
  );
};

export default WebinarAppointments;
