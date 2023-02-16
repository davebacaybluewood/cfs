import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import React from "react";
import "./Webinars.scss";

type WebinarType = {
  title: string;
  description: string;
  image: string;
};
type WebinarsProps = {
  webinars: WebinarType[];
};
const Webinars: React.FC<WebinarsProps> = (props) => {
  return (
    <div className="webinar-container">
      <h2>Webinars</h2>
      <NoInformationToDisplay
        showNoInfo={props.webinars.length === 0 ? true : false}
        message="No webinars available in this agent."
        title="NO INFORMATION TO DISPLAY"
        icon={<React.Fragment />}
        variant="secondary"
      >
        <React.Fragment>
          {props.webinars?.map((webinar, index) => (
            <div className="item">
              <h2>{webinar.title}</h2>
              <p>{webinar.description}</p>
            </div>
          ))}
        </React.Fragment>
      </NoInformationToDisplay>
    </div>
  );
};

export default Webinars;
