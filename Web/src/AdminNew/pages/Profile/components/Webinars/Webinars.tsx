import Spinner from "AdminNew/components/Spinner/Spinner";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React, { useEffect, useState } from "react";
import useFetchAgentWebinars from "./hooks/useFetchAgentWebinars";
import "./Webinars.scss";

type WebinarsProps = {
  webinarGuids: string[];
};
const Webinars: React.FC<WebinarsProps> = (props) => {
  const { webinars, loading } = useFetchAgentWebinars(props.webinarGuids);

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
            {webinars?.map((webinar, index) => (
              <div className="item" key={webinar?._id}>
                <h2>{webinar.title}</h2>
                <p>Test</p>
              </div>
            ))}
          </React.Fragment>
        </NoInformationToDisplay>
      )}
    </div>
  );
};

export default Webinars;
