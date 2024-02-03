import React, { useEffect, useState } from "react";
import "./SuccessPage.scss";
import { SOCIAL_MEDIA_LINKS, TWITTER_LOGO } from "constants/constants";
import { SiFacebook } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import {
  BOP_INFO,
  FREE_TRIAL_INFO,
  SUBSCRIBER_INFO,
} from "./constants/successpg";
import agent from "admin/api/agent";

const SuccessPage = () => {
  const pageInfoList = {
    free_trial: FREE_TRIAL_INFO,
    subscriber: SUBSCRIBER_INFO,
    bop_rsvp: BOP_INFO,
  };
  const location = useLocation().pathname;
  const locArr = location.split("/");
  const recruiterUserGuid = locArr[locArr.length - 1];
  console.log("recruiterUserGuid", recruiterUserGuid);
  const regSrc = locArr[locArr.length - 2];
  const [pageInfo, setPageInfo] = useState<any>();
  const [agentName, setAgentName] = useState("");
  const [agentInfo, setAgentInfo] = useState<any>();

  useEffect(() => {
    if (locArr.length) setPageInfo(pageInfoList[regSrc]);
  }, [regSrc]);

  useEffect(() => {
    const getAgentInfo = async (recruiterUserGuid: string) => {
      const res = await agent.Agents.agentInformation(recruiterUserGuid ?? "");
      console.log(res);

      setAgentInfo(res);
    };

    if (recruiterUserGuid) getAgentInfo(recruiterUserGuid);
  }, [recruiterUserGuid]);

  return (
    <div className={`success-page ${regSrc}`}>
      <div className="header">
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
        src={pageInfo?.bannerImg}
        alt="success-indicator"
        className="success-image"
      />

      <div className="success-msg-container">
        <h2 className="sucess-title">YOUR REGISTRATION IS CONFIRMED!</h2>
        <p className="sucess-message">{pageInfo?.mainMsg}</p>
        {agentInfo?.firstName && (
          <p className="sucess-message">
            Your designated contact person is <b>{agentInfo?.firstName}</b>. If
            you have any concerns or questions Click{" "}
            <a href="mailto:support@gocfs.pro">here</a>.
          </p>
        )}

        {pageInfo?.secondaryMsg && pageInfo?.secondaryMsg}
      </div>

      {pageInfo?.banner && (
        <Link
          className="linkToAgentReg"
          to={pageInfo?.banner?.link}
          target="_blank"
        >
          {pageInfo?.banner?.img}
          <div
            className="banner-actions"
            style={{
              backgroundImage: `url(${pageInfo?.banner?.img})`,
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "20%",
              minHeight: "25vh",
              backgroundSize: "cover",
            }}
          >
            <div className="banner-action-msg">
              <h3>{pageInfo?.banner?.header}</h3>
              <p>{pageInfo?.banner?.subheader}</p>
              <button className="cta-btn">Register Here</button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SuccessPage;
