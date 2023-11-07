import React from "react";
import { MAIN_IMAGES } from "constants/constants";
import "./MissionWrapper.scss";

interface MissionWrapperProps {
  title?: string;
  children: React.ReactNode | JSX.Element;
  contentTitle: string;
}

const MissionWrapper: React.FC<MissionWrapperProps> = (props) => {
  return (
    <React.Fragment>
      <div className="mission-page-wrapper">
        <div className="mission-page-content-container">
          <h2 className="title-holder">{props.title}</h2>
          <div className="mission-page-content">
            <h2>{props.contentTitle}</h2>
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

MissionWrapper.defaultProps = {
  title: "AGENT OF AGENTS",
};

export default MissionWrapper;
