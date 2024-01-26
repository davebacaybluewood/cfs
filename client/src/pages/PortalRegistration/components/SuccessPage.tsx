import React, { useEffect, useState } from "react";
import "./SuccessPage.scss";
import {
  MAIN_IMAGES,
  SOCIAL_MEDIA_LINKS,
  TWITTER_LOGO,
} from "constants/constants";
import { SiFacebook } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

type SuccessPageProps = {
  agentInfo: any;
  bannerImg: string;
  mainMsg: JSX.Element | React.ReactNode | undefined;
  secondaryMsg?: JSX.Element | React.ReactNode | undefined;
};

const SuccessPage: React.FC<SuccessPageProps> = (props) => {
  useEffect(() => {
    const { firstName, lastName } = props?.agentInfo;

    if (props?.agentInfo.firstName)
      setAgentName(`${firstName} ${lastName}`.trim());
  }, [props?.agentInfo]);

  const [agentName, setAgentName] = useState("");

  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="success-page">
      <div className="header">
        <img
          src={MAIN_IMAGES.MAIN_LOGO}
          alt={MAIN_IMAGES.MAIN_LOGO}
          className="admin-logo"
        />
        <div className="socials">
          <p>
            <b>Follow us on Social Media</b>
          </p>
          <div className="social-icons">
            <Link to={SOCIAL_MEDIA_LINKS.FACEBOOK}>
              <SiFacebook />
            </Link>
            <Link to={SOCIAL_MEDIA_LINKS.TWITTER}>
              <TWITTER_LOGO
                width="18"
                height="18"
                viewBox="0 0 24 24"
                reactX={0}
                reactY={0}
                reactWidth={24}
                reactHeight={24}
                reactFill={"#23a6f0"}
                pathFill={"#0e1f51"}
              />
            </Link>
            <Link to={SOCIAL_MEDIA_LINKS.INSTAGRAM}>
              <RiInstagramFill />
            </Link>
          </div>
        </div>
      </div>
      <img
        src={props.bannerImg}
        alt="success-indicator"
        className="success-image"
      />
      <h2 className="sucess-title">YOUR REGISTRATION IS CONFIRMED!</h2>
      <p className="sucess-message">{props.mainMsg}</p>
      {agentName && (
        <p>
          Your designated contact person is <b>{agentName}</b>. If you have any
          concerns or questions Click <a href="#">here</a>.
        </p>
      )}

      {/* <div className="faq-accordions">
        {USER_FAQ.map((data) => {
          return (
            <Accordion
              expanded={expanded === data.id}
              onChange={handleChange(data.id)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{data.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div> */}

      {props?.secondaryMsg && props?.secondaryMsg}
    </div>
  );
};

export default SuccessPage;
