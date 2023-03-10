import Spinner from "AdminNew/components/Spinner/Spinner";
import { SCHEDULE_TYPES } from "AdminNew/constants/constants";
import adminPathsNew from "AdminNew/constants/routes";
import useGetWebinarsWithCounts from "AdminNew/pages/Appointments/hooks/useGetWebinarsWithCounts";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchAgentWebinars from "./hooks/useFetchAgentWebinars";
import "./Webinars.scss";

type WebinarsProps = {
  agentGuid: string;
};
const Webinars: React.FC<WebinarsProps> = (props) => {
  const { loading, webinars } = useGetWebinarsWithCounts(props.agentGuid);
  const navigate = useNavigate();

  return (
    <div className="webinar-container">
      <h2>Webinars</h2>
      {loading ? (
        <Spinner />
      ) : (
        <NoInformationToDisplay
          showNoInfo={webinars?.length === 0 && !loading ? true : false}
          message="No webinars available in this agent."
          title="NO INFORMATION TO DISPLAY"
          icon={<React.Fragment />}
          variant="secondary"
        >
          <React.Fragment>
            {webinars?.map((webinar) => (
              <div
                className="item"
                key={webinar?._id}
                onClick={() =>
                  navigate(
                    adminPathsNew.scheduledAppointments
                      .replace(":agentGuid", props.agentGuid)
                      .replace(":typeId", SCHEDULE_TYPES.WEBINAR.toLowerCase())
                      .replace(":webinarGuid", webinar.webinarGuid ?? "")
                  )
                }
              >
                <h2>{webinar.title}</h2>
                <p>Number of appointments: {webinar?.noOfAppointments}</p>
              </div>
            ))}
          </React.Fragment>
        </NoInformationToDisplay>
      )}
    </div>
  );
};

export default Webinars;
