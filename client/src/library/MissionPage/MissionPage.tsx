import React from "react";
import { MAIN_IMAGES } from "constants/constants";
import "./MissionPage.scss";
import { Container } from "@mui/material";

interface MissionPageProps {
  title?: string;
  showLogo?: boolean;
  children: React.ReactNode | JSX.Element;
  contentTitle: string;
}

const MissionPage: React.FC<MissionPageProps> = (props) => {
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
        {props.showLogo ? (
          <div className="cfs-logo-holder">
            <img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

MissionPage.defaultProps = {
  title: "AGENT OF AGENTS",
  showLogo: true,
};

export default MissionPage;
