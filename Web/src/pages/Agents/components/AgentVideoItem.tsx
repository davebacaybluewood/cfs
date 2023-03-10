import React from "react";
import { FaPlayCircle } from "react-icons/fa";

type AgentVideoItemProps = {
  thumbnail: string;
  onClick: () => void;
  title: string;
};
const AgentVideoItem: React.FC<AgentVideoItemProps> = (props) => {
  return (
    <div className="video-wrapper">
      <div
        className="video-item"
        style={{
          backgroundImage: `url(${props.thumbnail})`,
        }}
      >
        <div className="bg-overlay"></div>
        <div className="play-button" onClick={() => props.onClick()}>
          <FaPlayCircle />
        </div>
      </div>
      <h2>{props.title}</h2>
      <button onClick={props.onClick}>Learn More</button>
    </div>
  );
};

export default AgentVideoItem;
