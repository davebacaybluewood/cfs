import React from "react";
import "./Banner.scss";

interface BannerProps extends React.HTMLProps<HTMLDivElement> {
  isVisible?: boolean;
  title: string;
  bigTitle: string;
  hasBorder?: boolean;
  backgroundImage?: string;
}
const Banner: React.FC<BannerProps> = (props) => {
  if (!props.isVisible) {
    return <React.Fragment />;
  }
  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${props.backgroundImage})` }}
    >
      <h5>{props.title}</h5>
      <h1>{props.bigTitle}</h1>
      {props.hasBorder && <div className="divider" />}
    </div>
  );
};

Banner.defaultProps = {
  isVisible: true,
};

export default Banner;
